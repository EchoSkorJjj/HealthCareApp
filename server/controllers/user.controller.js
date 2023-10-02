const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.TRANSPORTER_GMAIL}`,
      pass: `${process.env.TRANSPORTER_PASSWORD}`
    }
});

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

const logoutUser = async (req, res) => {
    try {
        req.session.destroy(function (err) {
          if (err) {
            console.log('Error destroying session:', err);
          }
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
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { currentPassword, newPassword} = req.body;

        const passwordMatch = await user.comparePassword(currentPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
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
        const resetLink = `${process.env.CLIENT_URL}/user-pages/resetpassword?token=${resetToken}`;

        // Email content
        const mailOptions = {
            from: '<donotreply@mail.healthcare>',
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`
          };

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

        user.passwordHash = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

const getRecipes = async (req, res) => {
    const {q : searchQuery} = req.query;
    try {
        const response = await fetch(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${process.env.EDAMAM_RECIPE_APP_ID}&app_key=${process.env.EDAMAM_RECIPE_API_KEY}`
        );
        const data = await response.json();
        res.status(200).json(data);
    }  catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getNutrition = async (req, res) => {
    const {q : item} = req.query;
    try {
        const response = await fetch(
            `https://api.edamam.com/api/nutrition-data?app_id=${process.env.EDAMAM_NUTRITION_APP_ID}&app_key=${process.env.EDAMAM_NUTRITION_API_KEY}&nutrition-type=cooking&ingr=${encodeURIComponent(item)}`
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    loginUser,
    logoutUser,
    getAllUsers,
    deleteUser,
    updatePassword,
    requestPasswordReset,
    resetPassword,
    getRecipes,
    getNutrition,
};
