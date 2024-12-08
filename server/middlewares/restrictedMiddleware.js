const restrictedMiddleware = (req, res, next) => {
    if (req.session && req.session.user) { // If there is a session and there is a user attribute
        next() // Log the user in
    } else {
        res.status(401).json({message: 'You are not logged in.'}) // Don't log the user in
    }
}

export default restrictedMiddleware