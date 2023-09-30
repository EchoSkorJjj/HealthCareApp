const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const { generateOtp, verifyOtp } = require('../otp/otp.service');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.TRANSPORTER_GMAIL}`,
      pass: `${process.env.TRANSPORTER_PASSWORD}`
    }
});

// Check if password is valid
function isPasswordValid(password) {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
  
    if (password.length > 20) {
      return 'Password must be less than 20 characters';
    }
  
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      return 'Password must have at least one special character';
    }
  
    if (!/\d/.test(password)) {
      return 'Password must have at least one number';
    }
  
    if (!/[a-z]/.test(password)) {
      return 'Password must have at least one lowercase letter';
    }
  
    if (!/[A-Z]/.test(password)) {
      return 'Password must have at least one uppercase letter';
    }
  
    return null; // Password is valid
}

const sendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const { token, timeLeft } = generateOtp(email);

        const html = `Your OTP is <b>${token}</b>. It will expire in ${timeLeft} minutes.
        Please use this to login to your account.
        <p>If your OTP does not work, please request for a new one.</p>`

        const mailOptions = {
            from: '<donotreply@mail.healthcare>',
            to: email,
            subject: 'One-Time Password (OTP) for HealthCare App',
            html,
            }
        
        console.log('Sending email...');
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Failed to send email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: 'OTP sent successfully' });
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to create a new user
const createNewUser = async (req, res) => {
    const { username, fullName, email, passwordHash, otpToken } = req.body;

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

        const passwordError = isPasswordValid(passwordHash);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        const isOtpValid = verifyOtp(email, otpToken);

        if (!isOtpValid) {
        return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Create a new user
        const user = new User({
            username,
            fullName,
            email,
            passwordHash,
            isAdmin: false,
            isEmailVerified: true
        });

        const userToSave = await user.save();

        // Create a profile for the user
        const profile = new Profile({
            userId: userToSave._id,
            username: userToSave.username,
            fullName: userToSave.fullName
        });

        const profileToSave = await profile.save();

        res.status(200).json({ user: userToSave, profile: profileToSave });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    sendOTP,
    createNewUser
};