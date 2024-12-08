import express from 'express';
import {
    addCustomer, customerLogin, customerLogout,
} from '../controllers/customerController.js';

const router = express.Router();

router.get('/customer-Logout', customerLogout);
export default router;