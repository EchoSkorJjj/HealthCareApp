const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const Recipe = require('../models/recipeModel');
const RecipeReview = require('../models/recipeReviewModel');

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

      const existingRecipeLabels = await Recipe.find({}, 'recipeLabel');
      const existingRecipeLabelsSet = new Set(existingRecipeLabels.map(recipe => recipe.recipeLabel));
  
      const recipesToInsertPromises = data.hits.map(async (hit) => {
        const recipeInfo = hit.recipe;
        const recipeLabel = recipeInfo.label;
       
        if (existingRecipeLabelsSet.has(recipeLabel)) {
          return null; 
        }
  
        let totalEmissions = 0;
  
        if (!isNaN(recipeInfo.totalCO2Emissions)) {
          totalEmissions = recipeInfo.totalCO2Emissions;
        }
  
        const imageResponse = await fetch(recipeInfo.image);
        const imageBuffer = await imageResponse.arrayBuffer();
        const imageBuffed = Buffer.from(imageBuffer);
        const encodedImage = imageBuffed.toString('base64');

  
        return {
          recipeLabel: recipeLabel,
          image: encodedImage,
          ingredientLines: recipeInfo.ingredientLines,
          source: recipeInfo.source,
          totalCO2Emissions: totalEmissions,
          totalNutrients: recipeInfo.totalNutrients,
          yield: recipeInfo.yield,
          url: recipeInfo.url,
        };
      });

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
    const {q : recipeLabel} = req.query;
    try {
        const recipeExist = await Recipe.findOne({ recipeLabel: recipeLabel});
        if (recipeExist) {
            overallRating = recipeExist.overallRating;
            numRating = recipeExist.numRating;
            const userId = req.session.user.id;
            const recipeReview = await RecipeReview.findOne({ userId: userId, recipeLabel: recipeLabel });
            if (recipeReview) {
                userRating = recipeReview.rating;
                userReview = recipeReview.review;
            } else {
                userRating = 0;
                userReview = '';
            }
            const reviews = await RecipeReview.find({ recipeLabel: recipeLabel });
            res.status(200).json({overallRating, numRating, userRating, userReview, reviews});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const saveRecipe = async (req,res) => {
    const { q: recipeLabel } = req.query;
    try {
        const recipeExist = await Recipe.findOne({ recipeLabel: recipeLabel });
        if (recipeExist) {
            const userId = req.session.user.id;
            const profile = await Profile.findOne({ userId: userId });
            if (profile) {
                const recipeBook = profile.recipeBook;
                if (recipeBook.includes(recipeLabel)) {
                    res.status(200).json({ message: 'Recipe already saved' });
                } else {
                    recipeBook.push(recipeLabel);
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
    const { q: recipeLabel } = req.query;
    const { rating, review } = req.body;
    try {
        const recipeExist = await Recipe.findOne({ recipeLabel: recipeLabel });
        if (recipeExist) {
            const userId = req.session.user.id;
            const recipeReview = await RecipeReview.findOne({ userId: userId, recipeLabel: recipeLabel });
            const recipeInfo = await Recipe.findOne({ recipeLabel: recipeLabel });
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
                    recipeLabel: recipeLabel,
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
        const userId = req.session.user.id;
        const profile = await Profile.findOne({ userId: userId });
        const savedRecipe = profile.recipeBook;
        for (const recipe of savedRecipe) {
            const recipeInfo = await Recipe.findOne({ recipeLabel: recipe });
            recipeList.push(recipeInfo);
        }
        res.status(200).json({ recipeList: recipeList});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const removeRecipe = async (req, res) => {
    try {
        const {recipeLabel: recipeLabel} = req.body;
        const userId = req.session.user.id;
        const profile = await Profile.findOne({ userId: userId });
        const recipeBook = profile.recipeBook;
        const index = recipeBook.indexOf(recipeLabel);
        if (index > -1) {
            recipeBook.splice(index, 1);
        }
        profile.recipeBook = recipeBook;
        await profile.save();
        const recipeList = [];
        for (const recipe of profile.recipeBook) {
            const recipeInfo = await Recipe.findOne({ recipeLabel: recipe });
            recipeList.push(recipeInfo);
        }
        res.status(200).json({ recipeList: recipeList });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getRecipeData = async (req, res) => {
    const { recipeLabel: recipeLabel} = req.body;
    try {
        const recipeData = await Recipe.findOne({ recipeLabel: recipeLabel});
        res.status(200).json({ recipeData: recipeData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
 
module.exports = {
    getRecipes,
    getNutrition,
    getRecipeRating,
    saveRecipe,
    saveReview,
    getRecipeBook,
    removeRecipe,
    getRecipeData,
}