import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
// const bodyParser = require('body-parser');
import Client from './models/clientSchema.js';
import Business from './models/businessSchema.js';

// setting the port
const port = process.env.PORT || 3000;

// initialising the express route management for the server
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON encoded bodies

const databaseName = "customerData" // Specifying the database name
// Specifying the database URL
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
// Postman would be used to use POST operations.
// This API is being called by loginFrom.jsx when the user attempts to create an account
app.post('/add-client', (req, res) => {
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
});

// Route to retrieve all customers from the "customer" collection (MongoDB)
// collects all the data, which is stored within the collection.
// Each element would be added to the array and then output
app.get('/all-clients', (req, res) => {
    Client.find()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log('Error fetching clients:', err);
            res.status(500).send('Error fetching clients');
        });
});

// This API is used to create a new business document within the business collection
app.post('/new-business', (req, res) => {
    // Using the mongoose constructor to create the business object and assign the according attributes
    // req.body is an object that contains data sent by the client in the body of a request, typically in POST, PUT, or PATCH requests.
    // For example, if a client sends a JSON payload or form data to the server, it will be accessible in req.body
    // In this example - req.body.businessCode - req.body.businessCode refers to the businessCode attribute of the object.
    // Therefore, if the input in the businessCode input field is "1234", req.body.business would be equal to "1234"
    // The same function applies to each of the attribute of the object
    const business = new Business({
        businessCode: req.body.businessCode,
        totalBookings: req.body.totalBookings,
        occupancyRate: req.body.occupancyRate,
        cancellationRate: req.body.cancellationRate,
        bookingLeadTime: req.body.bookingLeadTime,
        noShowRate: req.body.noShowRate,
        revenuePerBooking: req.body.revenuePerBooking,
        bookingConversionRate: req.body.bookingConversionRate,
        averageBookingValue: req.body.averageBookingValue,
        paymentStatus: req.body.paymentStatus,
        costPerBooking: req.body.costPerBooking,
        customerRetentionRate: req.body.customerRetentionRate,
        seasonalBookingTrends: req.body.seasonalBookingTrends,
        demandForecasting: req.body.demandForecasting,
        revenueForecasting : req.body.revenueForecasting
    })
    // Saving the business to the MongoDB database
    business.save()
        // Once the data is saved, the business information is then sent to the frontend
        .then((result) => res.json(result))
        // If an error occurs, the errors will be output into the console,
        // and the according server status code is set (500 = internal server error)
        //
        .catch((err) => {
            console.log('Error saving business', err);
            res.status(500).send('Error saving business')
        });
});

// This API is for development purposes.
// The algorithm is used to delete all test clients quickly rather than handling the process manually
app.delete('/delete-all-clients', (req, res) => {
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
})
