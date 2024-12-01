import mongoose from "mongoose";

// Schema used to create Client Bookings - This data will be used within the ERP system
const BookingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
    },
    bookingLocation: {
        type: String,
    },
    bookingDate: {
        type: Date,
    },
    arrivalDate: {
        type: Date,
    },
    holidayDuration: {
        type: Number,
    },
    bookingPrice: {
        type: Number,
    },
    holidayStatus: {
        type: String,
    },
    paymentStatus: {
        type: String,
    }
}, { timestamps: true }, { collection: "Booking" });

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;