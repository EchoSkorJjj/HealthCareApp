const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const nodemailer = require('nodemailer'); // You'll need to set up nodemailer for sending emails
const jwt = require('jsonwebtoken');

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

// Create a nodemailer transporter using your email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'healthportalpro@gmail.com',
      pass: 'gbemtnsldihqgpqy'
    }
});

// Function to create a new user
const createNewUser = async (req, res) => {
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

        const passwordError = isPasswordValid(passwordHash);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        // Create a new user
        const user = new User({
            username,
            fullname,
            email,
            passwordHash,
            isAdmin: false // Set as false for normal users
        });

        const userToSave = await user.save();

        // Create a profile for the user
        const profile = new Profile({
            userId: userToSave._id,
            username: userToSave.username,
            fullname: userToSave.fullname
        });

        const profileToSave = await profile.save();

        res.status(200).json({ user: userToSave, profile: profileToSave });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to handle user login
const loginUser = async (req, res) => {
    const { usernameOrEmail, password, rememberMe} = req.body; 
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
        // store user information in session, typically a user id
        req.session.user = user._id
        if (rememberMe) {
            // Set cookie to expire in 30 days
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
        } else {
            // Set cookie to expire at end of session
            req.session.cookie.expires = false;
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to handle user logout
const logoutUser = (req, res) => {
    try {
        // Clear the session data
        req.session.destroy(function (err) {
          if (err) {
            console.log('Error destroying session:', err);
          }
          // Clear the session cookie
          res.clearCookie('sid', {expires: new Date(1), path:'/'});
          res.status(200).json({ message: 'Logout successful' });
        });
      } catch (error) {
        res.status(500).json({ message: 'Error logging out' });
      }
};
  
// Function to get all users (requires admin privileges)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to delete a user (requires admin privileges)
const deleteUser = async (req, res) => {
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
};

const updatePassword = async (req,res) => {
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
};

// Request Password Reset Method
//The requestPasswordReset route allows users who have forgotten their password to 
//request a password reset. It generates a reset token, sends a password reset email to the 
//user, and includes the reset token in the link.
const requestPasswordReset = async (req,res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });

        // Send password reset email (using nodemailer or other email service)
        const resetLink = `${process.env.FRONTEND_URL}/user-pages/resetpassword?token=${resetToken}`;

        // Email content
        const mailOptions = {
            from: 'healthportalpro@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`
          };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: 'Failed to send email' });
            } else {
              console.log('Email sent:', info.response);
              res.status(200).json({ message: 'Password reset email sent' });
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Reset Password Method
//The resetPassword route is used when a user clicks the password reset link received in 
//their email. They provide the reset token and the new password they want to set. The route 
//verifies the reset token and updates the user's password.
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordError = isPasswordValid(newPassword);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        // Update the user's password
        user.passwordHash = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    createNewUser,
    loginUser,
    logoutUser,
    getAllUsers,
    deleteUser,
    updatePassword,
    requestPasswordReset,
    resetPassword,
};