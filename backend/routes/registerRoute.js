const express = require('express');
const router = express.Router();
const User = require('../models/model');
module.exports = router;

//Post Method
//Need to pass in username, fullname, email, passwordHash as parameters
//passwordHash will be hashed in model.js userSchema.pre
router.post('/register', async (req, res) => {
    const { username, fullname, email, passwordHash } = req.body;

    try {
        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if email already in use
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check password format
        if (passwordHash.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        if (passwordHash.length > 20) {
            return res.status(400).json({ message: 'Password must be less than 20 characters' });
        }

        if (!/(?=.*[!@#$%^&*])/.test(passwordHash)) {
            return res.status(400).json({ message: 'Password must have at least one special character' });
        }

        if (!/\d/.test(passwordHash)) {
            return res.status(400).json({ message: 'Password must have at least one number' });
        }

        if (!/[a-z]/.test(passwordHash)) {
            return res.status(400).json({ message: 'Password must have at least one lowercase letter' });
        }

        if (!/[A-Z]/.test(passwordHash)) {
            return res.status(400).json({ message: 'Password must have at least one uppercase letter' });
        }

        const user = new User({
            username,
            fullname,
            email,
            passwordHash,
            isAdmin: false //set as false for normal users
        });

        const userToSave = await user.save();
        res.status(200).json(userToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
