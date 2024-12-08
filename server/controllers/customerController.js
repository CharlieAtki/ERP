import Customer from "../models/customerSchema.js";
import bcrypt from "bcrypt";

// Controls how many rounds of hashing are applied to the password before the final hash is produced.
// This value also determines how complex the hashing process will be,
// which directly impacts the security and performance of the hashing algorithm
const saltRounds = 10;

export const addCustomer = async (req, res) => {
    try {
        const existingAccount = await Customer.findOne({email: req.body.email})

        if (existingAccount) {
            return res.status(400).json({
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
        const customer = new Customer({
            // both email and password are the attributes, which have had data input
            email: req.body.email,
            hashedPassword: hashedPassword, // This is the hashed password
        });

        // Saving the input data into the client document (the input email and password)
        // Once saved, the 201 server status code is send back & the client information (may not be needed)
        const result = await customer.save();
        res.status(201).send(result);

    } catch (error) {
        console.log('Error saving customer', error);
        res.status(500).send('Error saving customer')
    }
}

export const customerLogin = (req, res) => {
    const customerEmail = req.body.email;

    const customerPasswordString = String(req.body.password);

    Customer.findOne({
        email: customerEmail,
    })

        .then(async (customer) => {
            if (customer) {
                const match = await bcrypt.compare(customerPasswordString, customer.hashedPassword);
                if (match) {
                    // Adding the users ID and email to the session
                    // This allows the values to be accessed across the express backend
                    req.session.user = {
                        id: customer._id,
                        email: customer.email,
                        accessType: "Shop" // These users can only access the shop - Prevents access to the ERP system
                        // More elements could be added, such as roles
                    }

                    res.status(200).json({
                        success: true,
                        message: 'Customer login successful'
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
                    success: false,
                    field: "email",
                    message: "Incorrect email or password",
                });
            }
        })
        .catch((error) => {
            console.log('Error logging in customer', error);
            res.status(500).send({message: 'Error login'});
        });
};

export const customerLogout = (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                res.status(500).json({message: 'Error deleting customer', error});
            } else {
                res.status(200).json({message: 'Customer logout successful'});
            }
        })
    } else {
        res.status(200).json({message: 'Not logged in'});
    }
}