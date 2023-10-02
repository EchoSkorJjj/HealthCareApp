const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register.controller');

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
router.post('/register', registerController.createNewUser);
router.post('/sendOTP', registerController.sendOTP);

module.exports = router;