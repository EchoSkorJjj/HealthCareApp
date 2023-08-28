const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, continue to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Not authorized' });
    }
};

//Get all Method
router.get('/getAll', isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
