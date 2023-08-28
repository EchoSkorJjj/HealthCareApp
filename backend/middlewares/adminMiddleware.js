// adminMiddleware.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, continue to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Not authorized' });
    }
};

module.exports = isAdmin;
