import express from 'express';
import {
    addClient,
    clientLogin,
    clientLogout,
    generateTwoFactor, verify2FACode
} from "../controllers/clientController.js";
import {
    addCustomer, customerLogin
} from "../controllers/customerController.js";

// initialing the express router
const router = express.Router();

// Adding the controllers to the router
router.post('/add-client', addClient)
router.post('/clientLogin', clientLogin)
router.get('/clientLogout', clientLogout)
router.post('/generate-2FA-code', generateTwoFactor);
router.post('/verify-2FA-code', verify2FACode);

// Adding the customer routes used within the account creation process
router.post('/add-customer', addCustomer);
router.post('/customer-login', customerLogin);
export default router;