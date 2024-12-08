// routes/businessRoutes.js
import express from 'express';
import {addBusiness, getGraphData, getWeeklyData} from '../controllers/businessController.js'; // Import the controller

const router = express.Router();

// Define the route for adding a new business
router.post('/new-business', addBusiness);
// used to fetch a business document
router.get('/get-graph-data', getGraphData);
// Used to fetch a businesses specific weekly data document
router.get('/get-weekly-data', getWeeklyData);

export default router;