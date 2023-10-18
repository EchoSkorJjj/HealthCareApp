const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const Recipe = require('../models/recipeModel');
const RecipeReview = require('../models/recipeReviewModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.TRANSPORTER_GMAIL}`,
      pass: `${process.env.TRANSPORTER_PASSWORD}`
    }
});
  
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
    const { q: searchQuery } = req.query;
  
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${process.env.EDAMAM_RECIPE_APP_ID}&app_key=${process.env.EDAMAM_RECIPE_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch recipes from the external API');
      }
  
      const data = await response.json();
      res.status(200).json(data);

      const existingRecipeIds = await Recipe.find({}, 'recipeId');
      const existingRecipeIdsSet = new Set(existingRecipeIds.map(recipe => recipe.recipeId));
  
      const recipesToInsertPromises = data.hits.map(async (hit) => {
        const recipeInfo = hit.recipe;
        const uri = recipeInfo.uri;
        const match = uri.match(/recipe_([A-Za-z0-9]+)/);
  
        if (!match) {
          return null; 
        }
  
        const recipeId = match[1];
  
        if (existingRecipeIdsSet.has(recipeId)) {
          return null; 
        }
  
        let totalEmissions = 0;
  
        if (!isNaN(recipeInfo.totalCO2Emissions)) {
          totalEmissions = recipeInfo.totalCO2Emissions;
        }
  
        const imageResponse = await fetch(recipeInfo.image);
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBuffed = Buffer.from(imageBuffer);
        const imageBase64 = imageBuffed.toString('base64');

  
        return {
          recipeId: recipeId,
          label: recipeInfo.label,
          image: encodedImage,
          ingredientLines: recipeInfo.ingredientLines,
          source: recipeInfo.source,
          totalCO2Emissions: totalEmissions,
          totalNutrients: recipeInfo.totalNutrients,
          yield: recipeInfo.yield,
          url: recipeInfo.url,
        };
      });
  
      // Filter out null values (skipped recipes) and insert the remaining new recipes
      const recipesToInsert = (await Promise.all(recipesToInsertPromises)).filter(recipe => recipe !== null);
  
      if (recipesToInsert.length > 0) {
        await Recipe.insertMany(recipesToInsert);
      }
    } catch (error) {
      console.error('Error fetching and inserting recipes:', error);
      res.status(500).json({ message: 'Internal server error' });
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

const getRecipeRating = async (req, res) => {
    const {q : uri} = req.query;
    try {
        const regex = /recipe_([A-Za-z0-9]+)/;
        const match = uri.match(regex);
        const recipeId = match[1];
        const recipeExist = await Recipe.findOne({ recipeId: recipeId });
        if (recipeExist) {
            overallRating = recipeExist.overallRating;
            numRating = recipeExist.numRating;
            const userId = req.session.user;
            const recipeReview = await RecipeReview.findOne({ userId: userId, recipeId: recipeId });
            if (recipeReview) {
                userRating = recipeReview.rating;
                userReview = recipeReview.review;
            } else {
                userRating = 0;
                userReview = '';
            }
            const reviews = await RecipeReview.find({ recipeId: recipeId });
            res.status(200).json({overallRating, numRating, userRating, userReview, reviews});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const saveRecipe = async (req,res) => {
    const { q: uri } = req.query;
    try {
        const regex = /recipe_([A-Za-z0-9]+)/;
        const match = uri.match(regex);
        const recipeId = match[1];
        const recipeExist = await Recipe.findOne({ recipeId: recipeId });
        if (recipeExist) {
            const userId = req.session.user;
            const profile = await Profile.findOne({ userId: userId });
            if (profile) {
                const recipeBook = profile.recipeBook;
                if (recipeBook.includes(recipeId)) {
                    res.status(200).json({ message: 'Recipe already saved' });
                } else {
                    recipeBook.push(recipeId);
                    profile.recipeBook = recipeBook;
                    await profile.save();
                    res.status(200).json({ message: 'Recipe saved successfully' });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const saveReview = async (req, res) => {
    const { q: uri } = req.query;
    const { rating, review } = req.body;
    try {
        const regex = /recipe_([A-Za-z0-9]+)/;
        const match = uri.match(regex);
        const recipeId = match[1];
        const recipeExist = await Recipe.findOne({ recipeId: recipeId });
        if (recipeExist) {
            const userId = req.session.user;
            const recipeReview = await RecipeReview.findOne({ userId: userId, recipeId: recipeId });
            const recipeInfo = await Recipe.findOne({ recipeId: recipeId });
            const user = await User.findById(userId);
            const date = new Date();
            if (recipeReview) {
                let totalrating = recipeInfo.numRating * recipeInfo.overallRating;
                totalrating -= recipeReview.rating;
                totalrating += rating;
                recipeInfo.overallRating = totalrating / recipeInfo.numRating;
                recipeReview.date = date;
                recipeReview.rating = rating;
                recipeReview.review = review;
                await recipeReview.save();
                await recipeInfo.save();
            } else {
                const newRecipeReview = new RecipeReview({
                    userId: userId,
                    recipeId: recipeId,
                    rating: rating,
                    review: review,
                    date: date,
                    username: user.username,
                });
                await newRecipeReview.save();

                let totalrating = recipeInfo.numRating * recipeInfo.overallRating;
                totalrating += rating;
                recipeInfo.numRating += 1;
                recipeInfo.overallRating = totalrating / recipeInfo.numRating;
                await recipeInfo.save();
            }
            res.status(200).json({ message: 'Review saved successfully' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getRecipeBook = async (req, res) => {
    try {
        const recipeList = [];
        const userId = req.session.user;
        const profile = await Profile.findOne({ userId: userId });
        const savedRecipe = profile.recipeBook;
        for (const recipe of savedRecipe) {
            const recipeInfo = await Recipe.findOne({ recipeId: recipe });
            recipeList.push(recipeInfo);
        }
        res.status(200).json({ recipeList: recipeList});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateSetting = async (req, res) => {
    const { username, fullname,email, age, gender, bio, profilePicture } = req.body;
    try {
        const user = await User.findOne({
            email: email
          });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.username != username) {
            const userExist = await User.findOne({ username: username });

            if (userExist) {
                return res.status(400).json({ message: 'Username is already taken' });
            }
        }
        user.username = username;
        user.fullName = fullname;
        const userToSave = await user.save();

        const userprofile = await Profile.findOne({userId: userToSave._id});
        if (userprofile) {
            userprofile.username = username;
            userprofile.fullName = fullname;
            userprofile.age = age;  
            userprofile.gender = gender;
            userprofile.bio = bio;
            userprofile.profilePicture = profilePicture;
            await userprofile.save();
        }

        const userReviews = await RecipeReview.find({userId: userToSave._id});
        if (userReviews) {
            for (const review of userReviews) {
                review.username = username;
                await review.save();
            }
        }

        res.status(200).json({ profile: userprofile });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = {
    getAllUsers,
    deleteUser,
    updatePassword,
    requestPasswordReset,
    resetPassword,
    getRecipes,
    getNutrition,
    getRecipeRating,
    saveRecipe,
    saveReview,
    getRecipeBook,
    updateSetting,
};
