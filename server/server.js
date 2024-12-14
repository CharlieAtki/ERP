import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import businessRoutes from "./routes/businessRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import authenticationRoutes from "./AuthRoute/authenticationRoutes.js";
import restrictedMiddleware from "./middlewares/restrictedMiddleware.js";

// Load environment variables
dotenv.config();

// setting the port
const port = process.env.PORT || 3000;
// Specifying the database URL
const databaseURL = process.env.MONGODB_URI;

const frontendURL = process.env.FRONTEND_URL;

// initialising the express route management for the server
const app = express();

app.use(cors({
    origin: ['http://192.168.1.155:5137', 'http://localhost:3000', `${frontendURL}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
    name: 'monster',
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: databaseURL,
        collectionName: 'sessions',
    }),
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false, // true if https is used in production
        httpOnly: true,
        sameSite: 'none'
    },
}));

// Connecting to the MongoDB database
// Once the database has been initialised, the server will listen for requests.
// This includes; Create, Read, Update and Delete
// .catch will return any error messages in the event of an error
mongoose.connect(databaseURL)
    .then(() => {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server started on port ${port}`)
        });
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err)
        process.exit(1);
    });

// This route is used to check whether the user attempting to load the dashboard,
// which is a protected page. Eg, users who haven't logged in cannot access
// If the user has logged in at the account management module, a cookie and session will have been created with the users ID
// This information will allow for user specific content later
// Extra Info - data within the cookies will have been encrypted, hackers will not be able to access the secrete code (stored in the env file)
app.get('/', (req, res) => {
    res.header('Content-Type', 'application/json');
    console.log('Session:', req.session.user); // used for debug
    if (req.session.user) {
        return res.status(200).json({valid: true, user: req.session.user});
    } else {
        return res.status(401).json({valid: false, user: null});
    }
})

app.use('/api/business', restrictedMiddleware, businessRoutes) // adding the business routes to the server
app.use('/api/client', restrictedMiddleware, clientRoutes) // adding the client routes to the server
app.use('/api/auth', authenticationRoutes) // Routes used before validation
app.use('/api/customer', customerRoutes)
