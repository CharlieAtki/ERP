import Session from '../models/sessionSchema.js';

export const getSession = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.sessionId;
        if (!sessionId) {
            return next();
        }

        const session = await Session.findOne({ sessionId });
        if (session) {
            req.session = session.data;
        }

        next();
    } catch (error) {
        console.error('Error retrieving session', error);
        next(error)
    }
};
