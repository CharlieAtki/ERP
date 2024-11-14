import Client from '../models/clientSchema.js';

export const deleteAllClients = (req, res) => {
    // Client.deleteMany - This deletes all documents within the Client collection, which match the filter
    // In this scenario, I have identified all documents with the email, "test@gmail.com"
    Client.deleteMany( { email: "test@gmail.com"} )
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
        console.log("Received data:", req.body);

        // Checking if the input email is already in use
        // The email must be a unique value as it's being used to fetch user specific content.
        const existingEmail = await Client.findOne({ email: req.body.email });
        // if the input email can be found within the database, dont create a new client account
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

        // Creating a new client in the document
        const client = new Client({
            // both email and password are the attributes, which have had data input
            email: req.body.email,
            password: req.body.password,
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

export const clientLogin = (req, res) => {
    // Temp, aids the debugging process
    console.log("Received data:", req.body);
    // Defining the variables with the payloads attributes (the input email and password from the frontend)
    const clientEmail = req.body.email;
    const clientPassword = req.body.password;
    // Searching through the Client collection
    // Looking for a client document, which has the matching attribute values as the input values
    Client.findOne( {
        email: clientEmail,
        password: clientPassword,
    })
        // If a matching account can be found, send the result back to the front end.
        // (NO use yet, but could be used to store the active user) - allowing user specific content to be generated
    .then((client) => {
        if (!client) {
            return res.status(404).send({message: 'Invalid email or password'});
        }

        if (client.password === clientPassword) {
            return res.status(200).send({message: "Login successful", client})
        } else {
            return res.status(401).send({ message: "Invalid email or password"})
        }
    })
        // If an error occurs, output the message into the console and set the server status code
        // 500 = internal server error
    .catch((err) => {
        console.log('Error SigningIn', err);
        res.status(500).send({ message: 'Error login'});
    });
}

// need to add selection to the input API - currently lets everyone in