import {getSession} from "../middlewares/retrievingSession.js";
import {saveSession} from "../middlewares/savingSession.js";

export const sessionHandler = async (req, res, next) => {
    console.log("session handler triggered"); // used to track middleware
    try {
        await new Promise((resolve, reject) => {
            getSession(req, res, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        const originalEnd = res.end;
        res.end = async function () {
            try {
                if (req.session) {
                    console.log("Saving session...");
                    await new Promise((resolve, reject) => {
                        saveSession(req, res, (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    });
                }
                return originalEnd.apply(this, arguments);
            } catch (error) {
                console.error("Error in session handling", error);
                return originalEnd.apply(this, arguments);
            }
        };

        next();
    } catch (error) {
        console.error("Session Handler Error", error);
        res.status(500).send('Internal Server Error');
    }
};