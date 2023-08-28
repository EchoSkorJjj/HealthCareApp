const jwt = require('jsonwebtoken');

// jwtMiddleware.js
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Attach userId to request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;