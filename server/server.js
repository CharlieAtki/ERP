import express from 'express';
import mongoose from 'mongoose';
// const cors = require('cors');
// const bodyParser = require('body-parser');
import Customer from './models/customerSchema.js';

// setting the port
const port = process.env.PORT || 3000;

// initialising the express route management for the server
const app = express();

const databaseName = "customerData" // Specifying the database name
const databaseURL = "mongodb+srv://charlie06atkinson:iLwdpmiA4cdZGDSK@erpdatabase.eolfh.mongodb.net/ERPDatabase?retryWrites=true&w=majority&appName=ERPDatabase";



// Connecting to the MongoDB database
// Once the database has been initialised, the server will listen for requests.
// This includes; Create, Read, Update and Delete
// .catch will return any error messages in the event of an error
mongoose.connect(databaseURL)
    .then(() => {
        app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch((err) => console.log('MongoDB connection error:', err));

// API to add customers to the database
// This is for reference as data will be input via input fields later in development
// Postman would be used to use POST operations.
app.post('/add-customer', (req, res) => {
    const customer = new Customer({
        name: 'Ben Tucker',
        age: 17,
        email: 'N/A'
    })
    customer.save()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log('Error saving customer', err)
            res.status(500).send('Error saving customer')
        });
});

// Route to retrieve all customers from the "customer" collection (MongoDB)
// collects all the data, which is stored within the collection.
// Each element would be added to the array and then output
app.get('/all-customers', (req, res) => {
    Customer.find()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log('Error fetching customers:', err);
            res.status(500).send('Error fetching customers');
        });
});

// PS - the APIs, which as currently implemented are just a proof of concept
// They still need to be incorporated into the main function of the program

// MORE REST APIs need to be developed.
// This includes:
// Fetching data from the database
// sending data to the database
