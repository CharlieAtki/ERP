import Session from "../models/sessionSchema.js";

export const deleteSession = async (sessionId) => {
    try {
        await Session.deleteOne({ sessionId });
        console.log('Session deleted');
    } catch (error) {
        console.error('Error deleting session', error);
    }
}

// This middleware can be applied specifically for logout or invalidation routes.
// Both the retrievingSession and savingSession middlewares are being used sequentially for each operation.