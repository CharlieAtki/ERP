import mongoose from 'mongoose';

// Collection Schema - Used to define how data should be stored within the database
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, { timestamps: true }, {collection: 'Customer'});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer