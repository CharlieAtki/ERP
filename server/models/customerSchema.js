import mongoose from "mongoose";

// Schema used to create Client Accounts
const CustomerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
    }
}, { timestamps: true }, { collection: "Customer" });

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;