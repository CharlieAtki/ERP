import express from 'express';
import {
    addClient,
    clientLogin,
    clientLogout,
    generateTwoFactor, verify2FACode
} from "../controllers/clientController.js";

// initialing the express router
const router = express.Router();

// Adding the controllers to the router
router.post('/add-client', addClient)
router.post('/clientLogin', clientLogin)
router.get('/clientLogout', clientLogout)
router.post('/generate-2FA-code', generateTwoFactor);
router.post('/verify-2FA-code', verify2FACode);
export default router;