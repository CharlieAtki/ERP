import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import businessRoutes from "./routes/businessRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import authenticationRoutes from "./AuthRoute/authenticationRoutes.js";
import restrictedMiddleware from "./middlewares/restrictedMiddleware.js";

// Load environment variables
dotenv.config( { path: '/Users/charlieatkinson/Documents/School/A Level/Y13/ComputerScience/NEA/Code/ERP/.env'});

// setting the port
const port = process.env.PORT;
// Specifying the database URL
const databaseURL = process.env.MONGODB_URI;

// initialising the express route management for the server
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only form yor frontend URL
    credentials: true, // This ensures cookies (sessionID) can be sent with requests
})); // Enable CORS for all routes

app.use(express.json()); // Parse JSON encoded bodies
app.use(cookieParser())

app.use(session({
    name: 'monster', // Name of the cookie
    secret: process.env.SESSION_SECRET, // Secret to sign the cookie
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: databaseURL, // Reuse your MongoDB URI
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        secure: false, // Set true for HTTPS in production
        httpOnly: true, // Prevent access from client-side JS
    },
}));

// Connecting to the MongoDB database
// Once the database has been initialised, the server will listen for requests.
// This includes; Create, Read, Update and Delete
// .catch will return any error messages in the event of an error
mongoose.connect(databaseURL)
    .then(() => {
        app.listen(port, () => console.log(`Server started on port ${port}`));
    })
    .catch((err) => console.log('MongoDB connection error:', err));


// This route is used to check whether the user attempting to load the dashboard,
// which is a protected page. Eg, users who haven't logged in cannot access
// If the user has logged in at the account management module, a cookie and session will have been created with the users ID
// This information will allow for user specific content later
// Extra Info - data within the cookies will have been encrypted, hackers will not be able to access the secrete code (stored in the env file)
app.get('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    console.log(req.session.user);

    if (req.session.user) {
        return res.status(200).json({valid: true, user: req.session.user});
    } else {
        return res.status(401).json({valid: false, user: null});
    }
})

app.use('/api/business', restrictedMiddleware, businessRoutes) // adding the business routes to the server
app.use('/api/client', restrictedMiddleware, clientRoutes) // adding the client routes to the server
app.use('/api/auth', authenticationRoutes) // Routes used before validation