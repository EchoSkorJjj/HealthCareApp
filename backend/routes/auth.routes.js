const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const isSessionMiddleware = require('../middlewares/sessionMiddleware');

router.use(isSessionMiddleware);

router.post('/auth/google/callback', authController.handleGoogleCallback);
router.post('/auth/github/callback', authController.handleGithubCallback);

module.exports = router;

