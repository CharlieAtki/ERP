import Client from '../models/clientSchema.js';
import bcrypt from 'bcrypt';
import {sendEmail} from "../utils/sendEmail.js";

// Controls how many rounds of hashing are applied to the password before the final hash is produced.
// This value also determines how complex the hashing process will be,
// which directly impacts the security and performance of the hashing algorithm
const saltRounds = 10;

export const deleteAllClients = (req, res) => {
    // Client.deleteMany - This deletes all documents within the Client collection, which match the filter
    // In this scenario, I have identified all documents with the email, "test@gmail.com"
    Client.deleteMany()
        // Once the accounts have being deleted, the total number removed is send to the front end (UI or Postman)
        .then((result) => res.send(result))
        // If an error occurs, the error will be output into the console and the server status code is sent
        // 500 = internal server error
        .catch((err) => {
            console.log('Error deleting client', err);
            res.status(500).send('Error deleting clients')
        })
}

export const getAllClients = (req, res) => {
    Client.find()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log('Error fetching clients:', err);
            res.status(500).send('Error fetching clients');
        });
}

export const addClient = async (req, res) => {
    try {
        console.log("AddClient Received data:", req.body); // debug log

        // Checking if the input email is already in use
        // The email must be a unique value as it's being used to fetch user specific content.
        const existingEmail = await Client.findOne({email: req.body.email});
        // if the input email can be found within the database, don't create a new client account
        // return the !OK server status code to inform the frontend which logic to use.
        // The response payload is used to identify which input field is incorrect.
        // This information is used to adjust the input field colour - user-feedback
        if (existingEmail) {
            return res.status(404).send({
                success: false,
                error: true,
                message: "Email already exists",
                field: "email"
            });
        }
        // Changes the data type of password before being hashed
        // Bcrypt does not allow the value being hashed to be an integer, but must be a string
        const passwordString = String(req.body.password);
        // Hashing the passwordString the value of saltRounds times (10 rounds of hashing)
        // The iterations of hashing can be increased. The more times, the more secure, but also more computationally demanding
        const hashedPassword = await bcrypt.hash(passwordString, saltRounds);

        // Creating a new client in the document
        const client = new Client({
            // both email and password are the attributes, which have had data input
            email: req.body.email,
            hashedPassword: hashedPassword, // This is the hashed password
            businessCode: 'TEST CODE', // Links the user to the business - use null once I have a way on inputting the value
            authenticationCode: '' // the code will be set on request
        });

        // Saving the input data into the client document (the input email and password)
        // Once saved, the 201 server status code is send back & the client information (may not be needed)
        const result = await client.save();
        res.status(201).send(result);

    } catch (err) {
        console.log('Error saving client', err);
        res.status(500).send('Error saving client')
    }
}

export const clientLogin = async (req, res) => {
    try {
        // Defining the variables with the payloads attributes (the input email and password from the frontend)
        const clientEmail = req.body.email;

        // Integers cannot be hashed and therefore the value is converted into a string
        const clientPasswordString = String(req.body.password);
        // Searching through the Client collection
        // Looking for a client document, which has the matching attribute values as the input values
        const client = await Client.findOne({email: clientEmail}); // The email will be unique due to the account creation process

        if (client) {
            const match = await bcrypt.compare(clientPasswordString, client.hashedPassword);
            if (match) {
                // Adding the users ID, email and business code to the session
                // This allows the values to be accessed across the express backend
                req.session.user = {
                    id: client._id,
                    email: client.email,
                    businessCode: client.businessCode,
                    accessType: "ERP"
                    // More elements could be added about the user. Eg, "Student" (roles)
                };

                await req.session.save();

                return res.status(200).json({
                    success: true,
                    message: 'Client login successful'
                });
            } else {
                return res.status(401).json({
                    success: false, // Don't log the user in
                    field: "password", // Specifying the field would allow for user feedback
                    message: "Incorrect password",
                });
            }
        } else {
            return res.status(401).send({
                field: "email",
                message: "Incorrect email or password",
            });
        }
    } catch (error) {
        console.error('Error saving client', error);
        return res.status(500).send({message: 'Error logging in'})
    }
};

export const clientLogout = (req, res) => {
    // Checks to see if there has been a session created
    if (req.session) {
        // destroy/remove the session
        req.session.destroy((error) => {
            // if an error occurs, output the error message
            if (error) {
                res.status(500).json({message: 'Error deleting client', error});
            } else {
                // if successful, send the success message
                res.status(200).json({message: 'Client logout successful'});
            }
        })
        // If no session can be found
    } else {
        res.status(200).json({message: 'Not logged in'});
    }
}

export const generateTwoFactor = async (req, res) => {
    const MAX_ATTEMPTS = 1; // Maximum number of code generations allowed
    const COOLDOWN_MINUTES = 1; // Cooldown period in minutes

    try {
        // Check if user has exceeded code generation attempts
        const client = await Client.findById(req.session.user.id);
        const currentTime = new Date();

        if (client.twoFactorAttempts && client.twoFactorAttempts.count >= MAX_ATTEMPTS) {
            // Check if cooldown period has passed
            const timeSinceLastAttempt = (currentTime - client.twoFactorAttempts.lastAttempt) / (1000 * 60);
            if (timeSinceLastAttempt < COOLDOWN_MINUTES) {
                return res.status(429).json({
                    success: false,
                    message: `Too many attempts. Please try again in ${Math.ceil(COOLDOWN_MINUTES - timeSinceLastAttempt)} minutes.`
                });
            }
        }

        const generateRandomCode = () => {
            return Math.floor(1000 + Math.random() * 9000); // generating a 4 digit code
        };

        const newCode = generateRandomCode();

        const updatedClient = await Client.findOneAndUpdate(
            // need to switch to using the email rather than the id to allow the email to be sent to other users email accounts
            // _id is used to identify the Client document
            // req.session.user.id is the saved Client document id from the session created during login.
            // By using this value, I can update the clients document
            {_id: req.session.user.id},
            {
                $set: {
                    authenticationCode: newCode,
                    createdAt: new Date(),
                    twoFactorAttempts: {
                        count: (client.twoFactorAttempts?.count || 0) + 1,
                        lastAttempt: currentTime
                    }
                }
            },
            {new: true}
        );

        // Reset attempts if cooldown has passed
        if (client.twoFactorAttempts?.count >= MAX_ATTEMPTS) {
            await Client.findByIdAndUpdate(req.session.user.id, {
                $set: {
                    'twoFactorAttempts.count': 1,
                    'twoFactorAttempts.lastAttempt': currentTime
                }
            });
        }

        await sendEmail(
            req.session.user.email,
            "Two Factor Authentication Code",
            `Your authentication code is: ${newCode}`
        );

        res.json({
            success: true,
            message: '2FA code generated and sent'
        });
    } catch (err) {
        console.error('Error generating 2FA code:', err);
        res.status(500).json({
            success: false,
            message: 'Error generating 2FA code'
        });
    }
};

export const verify2FACode = async (req, res) => {
    try {
        const {authenticationCode} = req.body;

        if (!authenticationCode) {
            return res.status(400).json({
                success: false,
                message: 'Authentication Code is required'
            });
        }
        // finding the client document after validating their account.
        // This is to delete the 2FA code from their account after use
        const client = await Client.findOne({
            _id: req.session.user.id,
            authenticationCode: authenticationCode
        });

        if (!client) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Authentication Code'
            });
        }

        // Removing the code
        await Client.findOneAndUpdate(
            {_id: req.session.user.id},
            {$set: {authenticationCode: null}}
        );

        // adding the twoFactorAuthenticationCode attribute to identify if the user has been authenticated
        req.session.twoFactorAuthenticationCode = true;

        res.json({
            success: true,
            message: '2FA code verified',
        });
    } catch (err) {
        console.error('Error verifying 2FA code:', err);
        res.status(500).json({
            success: false,
            message: 'Error verifying 2FA code'
        });
    }
};

export const updateClientBusinessCode = async (req, res) => {
    try {
        const updatedClient = await Client.findOneAndUpdate(
            {_id: req.session.user.id},
            {$set: {businessCode: req.body.businessCode}},
            {
                new: true
            }
        );

        req.session.user.businessCode = req.body.businessCode; // Adjusting the session's business code attribute
        await req.session.save(); // Important: explicitly save the session

        res.json({
            success: true,
            message: 'Business code updated successfully',
            businessCode: updatedClient.businessCode
        });

    } catch (error) {
        console.error('Error updating ', error);
        res.status(500).json({
            success: false,
            message: 'Error updating client business code'
        });
    }
};

export const fetchEmployees = async (req, res) => {
    try {
        const employees = await Client.find({businessCode: req.session.user.businessCode})

        // If the employees can be found, send them back to the front end to be used within the table
        res.json({
            success: true, // operation successful - used as an indicator within the frontend
            employees: employees // The employee names
        })

    } catch (error) {
        console.error('Error fetching employees for employees:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching employees'
        })
    }
}