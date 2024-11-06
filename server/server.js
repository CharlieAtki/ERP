import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
// const bodyParser = require('body-parser');
import Customer from './models/customerSchema.js';
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

// /test API will return all the documents with the name attribute equal to "Charlie Atkinson)

app.get('/test', (req, res) => {
    Customer.find({name: "Ben Tucker"})
        .then((result) => res.send(result))
        .catch((err) => {
            console.log('Error saving customer', err);
            res.status(500).send('Error fetching customers');
        })

})

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
        .then((result) => res.json(result))
        .catch((err) => {
            console.log('Error saving business', err);
            res.status(500).send('Error saving business')
        });
});


// PS - the APIs, which as currently implemented are just a proof of concept
// They still need to be incorporated into the main function of the program

// MORE REST APIs need to be developed.
// This includes:
// Fetching data from the database
// sending data to the database
