const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const isSessionMiddleware = require('../middlewares/sessionMiddleware');

router.use(isSessionMiddleware);

router.post('/auth/google/callback', authController.handleGoogleCallback);
router.post('/auth/github/callback', authController.handleGithubCallback);

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
router.post('/auth/login', authController.loginUser);

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
router.post('/auth/logout', authController.logoutUser);


module.exports = router;

