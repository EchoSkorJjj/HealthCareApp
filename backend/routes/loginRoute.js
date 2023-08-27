const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/model');

// Post Method for login
// Need to pass in usernameOrEmail & password as Json parameters
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body; 
    try {
        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Compare passwords
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Successful login
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Helper function to generate access token
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Helper function to generate refresh token
const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

module.exports = router;