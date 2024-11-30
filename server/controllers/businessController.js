// controllers/businessController.js
import Business from '../models/businessSchema.js';
import { getWeekRange } from '../utils/getWeekRange.js';
import session from "express-session"; // Import the utility function

// Controller function to handle creating a new business document
export const addBusiness = async (req, res) => {
    const { weekStartDate, weekEndDate } = getWeekRange(new Date()); // Get the start and end date of the week
    try {
        // Preparing an object with only the provided metrics
        // The values listed below will be iterated through.
        // Each value will be added as an attribute to the "updateData" object if the user input the metric with the matching name.
        // This ensures only the values input from the fronted are overwritten.
        const updateData = {};
        const metrics = [
            'businessCode',
            'totalBookings',
            'occupancyRate',
            'cancellationRate',
            'bookingLeadTime',
            'noShowRate',
            'revenuePerBooking',
            'bookingConversionRate',
            'averageBookingValue',
            'paymentStatus',
            'costPerBooking',
            'customerRetentionRate',
            'seasonalBookingTrends',
            'demandForecasting',
            'revenueForecasting'
        ];

        // This iterates through each element (metric), which is defined within the metrics array above.
        // Each iteration through the array is used to represent the metric from the frontend
        // If the metric from the frontend is undefined, the user does not want to modify that value
        // If the metric has had a value passed, add the value to the updatedData object. Each metric would become an attribute
        metrics.forEach((metric) => {
            const value = req.body[metric];
            if (value !== undefined && value !== null && value !== '') {
                updateData[metric] = value;
            }
        });

        // Add week dates to the update
        updateData.weekStartDate = weekStartDate;
        updateData.weekEndDate = weekEndDate;

        // Using the mongoose constructor to create the business object and assign the according attributes
        // req.body is an object that contains data sent by the client in the body of a request, typically in POST, PUT, or PATCH requests.
        // For example, if a client sends a JSON payload or form data to the server, it will be accessible in req.body
        // In this example - req.body.businessCode - req.body.businessCode refers to the businessCode attribute of the object.
        // Therefore, if the input in the businessCode input field is "1234", req.body.business would be equal to "1234"

        // Find and update existing document, or create a new one if it doesn't exist
        const result = await Business.findOneAndUpdate(
            {
                businessCode: req.session.user.businessCode, // preventing incorrect business document modification
                weekStartDate,
                weekEndDate
            },
            { $set: updateData }, // $set ensures only update provided fields are updated within the document
            {
                // upsert if a combination of "update" and "insert"
                // If a document matching the search criteria exists, it updates that document
                // If no matching document exists, it creates (inserts) a new one
                upsert: true, // Create new document if it doesn't exist
                // Determines which version of the document to return
                // when true: Returns the modified document
                // when false: returns the original document
                new: true, // Return the modified document
                // Only applies when a new document is being created (during upsert)
                // Applies the default values defined in the business schema
                // Only works in combination with upsert: true
                setDefaultsOnInsert: true // This applies default values when creating
            }
        );

        console.log("Update Data: ", updateData); // This will show the object being sent to MongoDB

        res.json(result);
    } catch (error) {
        console.error('Error Saving Business', error);
        res.status(500).send('Error Saving Business');
    }
};

// The graph data fetching will need to be modified to allow for multiple business documents to be found
// The data fetching algorithm will use weeks data value on each point of the graph, this will be used to smoothen out the data
// Maybe used fetchMultiple() ? and the iterate through each element of the array to add data to the graphs

//export const getGraphData = (req, res) => {
    // This API is used to fetch data from the database.
    // The algorithm currently has a manual input for which business data to find,
    // but eventually, the program will send the business code
   // Business.find( { businessCode: "BIZ124" })
      //  .then((result) => res.send(result))
     //   .catch((err) => {
       //     console.log('Error saving business', err);
     //       res.status(500).send('Error fetching business data')
       // });
//}

export const getGraphData = async (req, res) => {
    try {
        // Using MongoDB aggregation to fetch multiple documents and then map each metric data into a separate array
        // This will allow my program to easily visualise the data
        // Additionally, I have included the weekStartDate and weekEndDate as I may use this within the axis of the graph
        // This structure is useful when trying to show the weekly periods alongside their metrics in the response
        // filtering between dates can be included within the aggregation search, but I haven't included this feature within the current algorithm.
        // This feature would require further UI additions, which may be unfeasible within my NEA time frame.
        const metrics = await Business.aggregate([
            { $match: { businessCode: req.session.user.businessCode} }, // filter by business
            { $sort: { weekStartDate: 1 } }, // Sorted by weekStart date (the value is stored in the business document)
            {
                $group: {
                    _id: null,
                    metricData: {
                        $push: {
                            weekStartDate: "$weekStartDate",
                            weekEndDate: "$weekEndDate",
                            totalBookings: "$totalBookings",
                            occupancyRate: "$occupancyRate",
                            cancellationRate: "$cancellationRate",
                            bookingLeadTime: "$bookingLeadTime",
                            noShowRate: "$noShowRate",
                            revenuePerBooking: "$revenuePerBooking",
                            bookingConversionRate: "$bookingConversionRate",
                            averageBookingValue: "$averageBookingValue",
                            paymentStatus: "$paymentStatus",
                            costPerBooking: "$costPerBooking",
                            customerRetentionRate: "$customerRetentionRate",
                            seasonalBookingTrends: "$seasonalBookingTrends",
                            demandForecasting: "$demandForecasting"
                        },
                    },
                },
            },
        ]);

        // Check if data exists
        if (!metrics || metrics.length === 0) {
            return res.status(404).json({
                message: 'No metrics found.',
                success: false,
            });
        }

        // Send the 'metricData' array to the frontend
        res.status(200).json({
            success: true,
            // the aggregation returns an array with one object because _id: null groups all documents into a single group
            // metrics[0] accesses that single object
            // metrics[0].metricData contains the array of weekly data that you want to send to the frontend
            data: metrics[0].metricData, // Extract 'metricData' from the first (and only) element
        });

    } catch (error) {
        console.error("Error fetching graph data", error)
        res.status(500).json({
            message: 'Failed to fetch graph data',
            success: false
        });
    }
};

export const getWeeklyData = (req, res) => {
    // Defining the conditions, the business document must match the Code, weekStartDate and weekEndDate.
    // If found, the businesses weekly document will be returned
    Business.find({
        businessCode: req.session.user.businessCode, // Using the businessCode from the users session
    })
    .sort({ weekStartDate: -1 }) // Sort from most recent to oldest
    .then((result) => res.send(result))
    .catch((err) => {
        console.log('Error saving weekly data', err);
        res.status(500).send('Error fetching weekly data')
    });
}