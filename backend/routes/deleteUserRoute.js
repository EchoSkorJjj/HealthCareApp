const express = require('express');
const router = express.Router();
const User = require('../models/model');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
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

// Delete by Username Method
router.delete('/delete/:username', verifyToken, async (req, res) => {
    try {
        // Get the logged-in user's ID from the token
        const loggedInUserId = req.userId;

        // Find the logged-in user in the database
        const loggedInUser = await User.findById(loggedInUserId);

        // Check if the logged-in user is an admin
        if (!loggedInUser.isAdmin) {
            return res.status(403).json({ message: 'Only admins can delete users' });
        }

        // Admin is authorized, proceed with deleting the user by username
        const usernameToDelete = req.params.username;
        const userToDelete = await User.findOne({ username: usernameToDelete });

        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userToDelete.remove();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;