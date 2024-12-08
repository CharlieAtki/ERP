import express from 'express';
import {
    deleteAllClients,
    fetchEmployees,
    getAllClients,
    updateClientBusinessCode
} from "../controllers/clientController.js";

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

router.post('/adjust-business-code', updateClientBusinessCode);

router.get('/all-business-employees', fetchEmployees) // fetches the employees from the business to be displayed within the table

export default router;