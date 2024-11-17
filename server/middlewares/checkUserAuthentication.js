export const checkUserAuthentication = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).send({ message: 'Unauthorised' });
    }
    next()
};