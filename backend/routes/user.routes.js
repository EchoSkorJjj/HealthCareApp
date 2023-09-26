const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAdminMiddleware = require('../middlewares/adminMiddleware');
const isSessionMiddleware = require('../middlewares/sessionMiddleware');
const isAuthMiddleware = require('../middlewares/authMiddleware');

router.use(isSessionMiddleware);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user.
 *     description: Create a new user account.
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Registration failed.
 */
router.post('/register', userController.createNewUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user.
 *     description: Authenticate and log in a user.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Authentication failed.
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out a user.
 *     description: Log out the currently authenticated user.
 *     responses:
 *       200:
 *         description: User logged out successfully.
 */
router.post('/logout', userController.logoutUser);

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
 *     description: Update a user's password. This route requires user token (cookies).
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


module.exports = router;
