const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAdminMiddleware = require('../middlewares/adminMiddleware');
const isSessionMiddleware = require('../middlewares/sessionMiddleware');
const isAuthMiddleware = require('../middlewares/authMiddleware');

router.use(isSessionMiddleware);

router.get('/check-auth', isAuthMiddleware);  

/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: Get all users (requires admin privileges).
 *     description: Retrieve a list of all users. This route requires admin privileges.
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *       401:
 *         description: Authentication failed or insufficient privileges.
 */
router.get('/getAll', isAdminMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /delete/{username}:
 *   delete:
 *     summary: Delete a user by username (requires admin privileges).
 *     description: Delete a user account by username. This route requires admin privileges.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Username of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: Authentication failed or insufficient privileges.
 *       404:
 *         description: User not found.
 */
router.delete('/delete/:username', isAdminMiddleware, userController.deleteUser);

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Update a user's password.
 *     description: Update a user's password. This route requires session token.
 *     security:
 *       - sessionAuth: []
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       401:
 *         description: Authentication failed or insufficient privileges.
 */
router.patch('/updatePassword', isAdminMiddleware, userController.updatePassword);

/**
 * @swagger
 * /requestPasswordReset:
 *   post:
 *     summary: Request a password reset.
 *     description: Request a password reset for a user account.
 *     responses:
 *       200:
 *         description: Password reset request sent successfully.
 *       400:
 *         description: Password reset request failed.
 *       404:
 *         description: User not found.
 */
router.post('/requestPasswordReset', userController.requestPasswordReset);

/**
 * @swagger
 * /resetPassword:
 *   patch:
 *     summary: Reset a user's password.
 *     description: Reset a user's password after a password reset request.
 *     responses:
 *       200:
 *         description: Password reset successful.
 *       400:
 *         description: Password reset failed.
 */
router.patch('/resetPassword', userController.resetPassword);

router.get('/getRecipes', isAuthMiddleware, userController.getRecipes);
router.get('/getNutrition', isAuthMiddleware, userController.getNutrition);
router.get('/getRecipeRating', isAuthMiddleware, userController.getRecipeRating);
router.post('/saveRecipe', isAuthMiddleware, userController.saveRecipe);
router.patch('/saveReview', isAuthMiddleware, userController.saveReview);
router.get('/getRecipeBook', isAuthMiddleware, userController.getRecipeBook);

router.patch('/updateSetting', isAuthMiddleware, userController.updateSetting);


module.exports = router;
