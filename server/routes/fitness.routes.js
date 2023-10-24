const express = require('express');
const router = express.Router();
const fitnessController = require('../controllers/fitness.controller');
const isSessionMiddleware = require('../middlewares/sessionMiddleware');
const isAuthMiddleware = require('../middlewares/authMiddleware');

router.use(isSessionMiddleware);

router.post('/getStepData', isAuthMiddleware, fitnessController.fetchStepCountData);
router.post('/getDistanceData', isAuthMiddleware, fitnessController.fetchDistanceData);
router.post('/getCaloriesData', isAuthMiddleware, fitnessController.fetchCaloriesData);

module.exports = router;