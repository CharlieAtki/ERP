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

export const addClient = (req, res) => {
    console.log("Received data:", req.body);
    // Creating a new client in the document
    const client = new Client({
        // both email and password are the attributes, which have had data input
        email: req.body.email,
        password: req.body.password,
    })
    client.save()
        // .then is used as saving the data to the database is asynchronous
        // res.send(result) will send the saved data back to the frontend
        .then((result) => res.send(result))
        // If an error occurs, the error is output into the console and the according server status code is set
        .catch((err) => {
            console.log('Error saving client', err)
            res.status(500).send('Error saving client')
        });
}