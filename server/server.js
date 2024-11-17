import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import businessRoutes from "./routes/businessRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import {sessionHandler} from "./handler/sessionHandler.js";

// Load environment variables
dotenv.config( { path: '/Users/charlieatkinson/Documents/School/A Level/Y13/ComputerScience/NEA/Code/ERP/.env'});

// setting the port
const port = process.env.PORT;

// initialising the express route management for the server
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only form yor frontend URL
    credentials: true, // This ensures cookies (sessionID) can be sent with requests
})); // Enable CORS for all routes
app.use(express.json()); // Parse JSON encoded bodies
app.use(cookieParser()); // Add cookie parser middleware

// This ensures every route has access to req.session,
// and any updates to the session are automatically saved at the end of the request
app.use(sessionHandler); // Apply session handling middleware to all routes

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

app.get('/find-cookie', (req, res) => {
    // Log cookies to check if sessionId is set
    console.log('Cookies:', req.cookies);
    res.send('Check the server console for cookies!');
});

app.get('/set-cookie', (req, res) => {
    res.cookie('testCookie', 'testValue', {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
    });
    res.send('Cookie set!');
});


// To do: (already listed in the notion page)

// Create an automated document creator - a document should be created every week.