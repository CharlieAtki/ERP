import mongoose from 'mongoose';

// Collection Schema - Used to define how data should be stored within the database
const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    businessCode: {
        type: String,
    },
    authenticationCode: {
        type: String,
    },
    twoFactorAttempts: {
        count: Number,
        lastAttempt: Date
    }
}, {timestamps: true}, {collection: 'Client'});

const Client = mongoose.model('Client', clientSchema);
export default Client