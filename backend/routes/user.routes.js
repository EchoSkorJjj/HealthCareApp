const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const isAdminMiddleware = require('../middlewares/adminMiddleware');
const isSessionMiddleware = require('../middlewares/sessionMiddleware');
const isAuthMiddleware = require('../middlewares/authMiddleware');

router.use(isSessionMiddleware);

// Route for creating a new user
router.post('/register', userController.createNewUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

// router.get('/protected', userController.protectedRoute);
  
// Get all users route (requires admin privileges)
router.get('/getAll', isAdminMiddleware, userController.getAllUsers);
router.delete('/delete/:username', isAdminMiddleware, userController.deleteUser);
// Route for reset password
router.patch('/updatePassword', isAdminMiddleware , userController.updatePassword);
router.post('/requestPasswordReset', userController.requestPasswordReset);
router.patch('/resetPassword', userController.resetPassword);

module.exports = router;
