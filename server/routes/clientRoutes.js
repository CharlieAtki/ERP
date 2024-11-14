import express from 'express';
import {addClient, clientLogin, deleteAllClients, getAllClients} from "../controllers/clientController.js";

// initialing the express router
const router = express.Router();

// Extra Info:

// The controllers and routes have both being added to improve the readability of the code
// Previously, each API has its body of code within the server file, each API has been broken down into a router and controller
// The controller is the logic of the API, but the router manages the route to the API (How the API is accessed)

// adding the deleteAllClients controller to the router
router.delete('/delete-all-clients', deleteAllClients);
// Adding the getAllClients controller to the router
router.get('/all-clients', getAllClients);
// Adding the AddClient controller to the router
router.post('/add-client', addClient)
// Adding the clientLogin controller to the router
router.post('/clientLogin', clientLogin)

export default router;