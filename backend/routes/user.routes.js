const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAdminMiddleware = require('../middlewares/adminMiddleware');
const isJWTMiddleware = require('../middlewares/jwtMiddleware');

// Route for creating a new user
router.post('/register', userController.createNewUser);
router.post('/login', userController.loginUser);
router.post('/refresh', userController.refreshAccessToken);
// Get all users route (requires admin privileges)
router.get('/getAll', isAdminMiddleware, userController.getAllUsers);
router.delete('/delete/:username', isJWTMiddleware, userController.deleteUser);
// Route for reset password
router.patch('/updatePassword', isJWTMiddleware, userController.updatePassword);
router.post('/requestPasswordReset', userController.requestPasswordReset);
router.patch('/resetPassword', userController.resetPassword);

module.exports = router;
