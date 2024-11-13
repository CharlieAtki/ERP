import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import businessRoutes from "./routes/businessRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

// Load environment variables
dotenv.config();

// setting the port
const port = process.env.PORT;

// initialising the express route management for the server
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON encoded bodies

// Specifying the database URL
const databaseURL = process.env.MONGODB_URI;
const databaseName = "customerData" // Specifying the database name

// Connecting to the MongoDB database
// Once the database has been initialised, the server will listen for requests.
// This includes; Create, Read, Update and Delete
// .catch will return any error messages in the event of an error
mongoose.connect(databaseURL)
    .then(() => {
        app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch((err) => console.log('MongoDB connection error:', err));

// adding the business routes to the server
app.use('/api/business', businessRoutes)
// adding the client routes to the server
app.use('/api/client', clientRoutes)

// To do: (already listed in the notion page)

// Create an automated document creator - a document should be created every week.
