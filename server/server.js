import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import session from 'express-session';
import businessRoutes from "./routes/businessRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import authenticationRoutes from "./AuthRoute/authenticationRoutes.js";
import restrictedMiddleware from "./middlewares/restrictedMiddleware.js";

// Load environment variables
dotenv.config( { path: '/Users/charlieatkinson/Documents/School/A Level/Y13/ComputerScience/NEA/Code/ERP/.env'});

// setting the port
const port = process.env.PORT;

// initialising the express route management for the server
const app = express();

const sessionConfig = {
    name: 'monster', // Name of the cookie
    secret: process.env.SESSION_SECRET, // Secret that makes the cookie effective
    cookie: {
        maxAge: 1000 * 60 * 60, // Time span of the cookie
        secure: false, // for production set true for https only access
        httpOnly: true, // true means no access from JavaScript
    },
    resave: false,
    saveUninitialized: true, // true = Automatic cookie saving - Must be set to false in production (GDPR laws)
}

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only form yor frontend URL
    credentials: true, // This ensures cookies (sessionID) can be sent with requests
})); // Enable CORS for all routes

app.use(express.json()); // Parse JSON encoded bodies
app.use(session(sessionConfig))

// Specifying the database URL
const databaseURL = process.env.MONGODB_URI;

// Connecting to the MongoDB database
// Once the database has been initialised, the server will listen for requests.
// This includes; Create, Read, Update and Delete
// .catch will return any error messages in the event of an error
mongoose.connect(databaseURL)
    .then(() => {
        app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api/business', restrictedMiddleware, businessRoutes) // adding the business routes to the server
app.use('/api/client', restrictedMiddleware, clientRoutes) // adding the client routes to the server
app.use('/api/auth', authenticationRoutes) // Routes used before validation