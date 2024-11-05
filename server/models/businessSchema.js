import mongoose from "mongoose";

// The schema allows the user to add specific metrics, but the business code is required.
// The business code ensures that employees with the code can access the business metric database.
const BusinessSchema = new mongoose.Schema({
    businessCode: {
        type: String,
        required: true,
    },
    totalBookings: {
        type: Number,
    },
    occupancyRate: {
        type: Number,
    },
    cancellationRate: {
        type: Number,
    },
    bookingLeadTime: {
        type: Number,
    },
    noShowRate: {
        type: Number,
    },
    revenuePerBooking: {
        type: Number,
    },
    bookingConversionRate: {
        type: Number,
    },
    averageBookingValue: {
        type: Number,
    },
    paymentStatus: {
        type: Number,
    },
    costPerBooking: {
        type: Number,
    },
    customerRetentionRate: {
        type: Number,
    },
    seasonalBookingTrends: {
        type: Number,
    },
    demandForecasting: {
        type: Number,
    },
    revenueForecasting: {
        type: Number,
    }
}, {timestamps: true}, {collection: 'Business'});

// Creating "Business" model using the "business" schema.
const Business = mongoose.model('Business', BusinessSchema);
// Exporting the model, which would allow it to be called across the codebase
export default Business;