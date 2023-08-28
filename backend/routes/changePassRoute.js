const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // You'll need to set up nodemailer for sending emails

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
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

//Update by ID Method
router.patch('/updatePassword', verifyToken, async (req, res) => {
    try {
        const userId = req.userId; // User ID from verified token

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { currentPassword, newPassword} = req.body;

        // Check if the provided current password matches the user's actual password
        const passwordMatch = await user.comparePassword(currentPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update the user's password
        user.passwordHash = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Request Password Reset Method
//The requestPasswordReset route allows users who have forgotten their password to 
//request a password reset. It generates a reset token, sends a password reset email to the 
//user, and includes the reset token in the link.
router.post('/requestPasswordReset', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });

        // Send password reset email (using nodemailer or other email service)
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        // Set up and send the email using nodemailer or another email service
        // ...

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Reset Password Method
//The resetPassword route is used when a user clicks the password reset link received in 
//their email. They provide the reset token and the new password they want to set. The route 
//verifies the reset token and updates the user's password.
router.patch('/resetPassword', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        user.passwordHash = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
});

module.exports = router;