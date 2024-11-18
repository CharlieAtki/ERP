import express from 'express';
import {addClient, clientLogin, clientLogout} from "../controllers/clientController.js";

// initialing the express router
const router = express.Router();

// Adding the controllers to the router
router.post('/add-client', addClient)
router.post('/clientLogin', clientLogin)
router.get('/clientLogout', clientLogout)

export default router;