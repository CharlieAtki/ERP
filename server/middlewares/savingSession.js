import { randomUUID } from 'crypto' // use for generating unique IDs
import Session from "../models/sessionSchema.js";

export const saveSession = async (req, res, next) => {
    try {
        if (!req.session) {
            return next();
        }

        let sessionId = req.cookies?.sessionId;
        if (!sessionId) {
            sessionId = randomUUID(); // Generate a new session ID
        }

        console.log("Saving Session with ID: ", sessionId); // debug log
        console.log("Session data:", req.session) // debug log

        await Session.findOneAndUpdate(
            { sessionId },
            {
                sessionId,
                data: req.session,
                expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
                },
            { upsert: true, new: true} // create if it doesn't exist
        );
        if (!req.cookies?.sessionId) {
            res.cookie("sessionId", sessionId, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === 'production', // Set to false for HTTP (works for localhost)
                sameSite: 'lax',
            });
        }

        next();
    } catch (error) {
        console.error('Error updating session', error);
        next(error); // Pass error to error handler
    }
};
