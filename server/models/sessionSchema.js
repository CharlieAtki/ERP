import mongoose from "mongoose";

// Defining the session schema
const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }, // Store session data as an object
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => Date.now() + 7 * 24 * 60 * 60 * 1000 }, // Default expiry: 7 Days
});

// Add an index to automatically remove expired sessions
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0});

// Create the session model
const Session = mongoose.model("Session", sessionSchema);

export default Session;

// This schema was developed through research on Stack Overflow and geeks for geeks.
// I have now learnt how this schema operates: How data session data is formatted in the MongoDB database