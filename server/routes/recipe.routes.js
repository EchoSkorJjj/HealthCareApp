const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const isSessionMiddleware = require('../middlewares/sessionMiddleware');
const isAuthMiddleware = require('../middlewares/authMiddleware');

router.use(isSessionMiddleware);

router.get('/getRecipes', isAuthMiddleware, recipeController.getRecipes);
router.get('/getNutrition', isAuthMiddleware, recipeController.getNutrition);
router.get('/getRecipeRating', isAuthMiddleware, recipeController.getRecipeRating);
router.post('/saveRecipe', isAuthMiddleware, recipeController.saveRecipe);
router.patch('/saveReview', isAuthMiddleware, recipeController.saveReview);
router.get('/getRecipeBook', isAuthMiddleware, recipeController.getRecipeBook);

module.exports = router;