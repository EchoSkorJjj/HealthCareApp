const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const axios = require('axios');

const fetchStepCountData = async (req, res) => {
    const { q } = req.query;
    let queryData = {};
    try {
        queryData = JSON.parse(decodeURIComponent(q));
    } catch (err) {
        return res.status(400).json({ message: 'Invalid query format' });
    }

    const { weekOffset, timeRange } = queryData;
    const token = req.session.user.accessToken;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let startOfRange = new Date(today);
    let endOfRange = new Date(today);

    if (timeRange === 'weekly') {
        const dayOfWeek = today.getDay();
        startOfRange.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) - (7 * weekOffset));
        endOfRange = new Date(startOfRange);
        endOfRange.setDate(startOfRange.getDate() + 6);
        endOfRange.setHours(23, 59, 59, 999);
    } else if (timeRange === 'monthly') {
        const today = new Date();
        startOfRange = new Date(today.getFullYear(), today.getMonth(), 1);
        endOfRange = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        endOfRange.setHours(23, 59, 59, 999);
    }
    
    const body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.step_count.delta",
        }],
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": startOfRange.getTime(),
        "endTimeMillis": endOfRange.getTime()
    };

    try {
        const response = await axios.post(process.env.FITNESS_URL, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("API response: " + response.data);

        let stepsArray = Array(timeRange === 'weekly' ? 7 : new Date(startOfRange.getFullYear(), startOfRange.getMonth() + 1, 0).getDate()).fill(null);
        response.data.bucket.forEach((bucket) => {
            let index;
            if (timeRange === 'weekly') {
                const day = new Date(parseInt(bucket.startTimeMillis)).getDay();
                index = day === 0 ? 6 : day - 1;
            } else if (timeRange === 'monthly') {
                index = new Date(parseInt(bucket.startTimeMillis)).getDate() - 1;
            }
            if (bucket.dataset[0].point[0]) {
                stepsArray[index] = bucket.dataset[0].point[0].value[0].intVal;
            }
        });
        console.log("steps array: " + stepsArray);

        const totalSteps = stepsArray.reduce((total, daySteps) => total + (daySteps || 0), 0);
        
        res.status(200).json({dailySteps: stepsArray, totalSteps });

    } catch (error) {
        console.error("Error fetching step count data:", error);
        res.status(404).json({ message: 'Error fetching step count data' });
    }
};

const fetchDistanceData = async (req,res) => {
    const { q } = req.query;
    let queryData = {};
    try {
        queryData = JSON.parse(decodeURIComponent(q));
    } catch (err) {
        return res.status(400).json({ message: 'Invalid query format' });
    }

    const { weekOffset } = queryData;
    const token = req.session.user.accessToken;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) - (7 * weekOffset));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    const body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.distance.delta",
        }],
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": startOfWeek.getTime(),
        "endTimeMillis": endOfWeek.getTime()
    };

    try {
        const response = await axios.post(process.env.FITNESS_URL, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const weekDistances = [null, null, null, null, null, null, null];
        response.data.bucket.forEach((bucket) => {
            const day = new Date(parseInt(bucket.startTimeMillis)).getDay();
            const index = day === 0 ? 6 : day - 1;
            if (bucket.dataset[0].point[0]) {
                weekDistances[index] = bucket.dataset[0].point[0].value[0].fpVal / 1000;
            }
        });

        const totalDistance = weekDistances.reduce((total, dayDistance) => total + dayDistance, 0);
        
        res.status(200).json({dailyDistance: weekDistances, totalDistance });

    } catch (error) {
        console.error("Error fetching distance data:", error);
        res.status(404).json({ message: error });
    }
};

const fetchCaloriesData = async (req, res) => {
    const { q } = req.query;
    let queryData = {};
    try {
        queryData = JSON.parse(decodeURIComponent(q));
    } catch (err) {
        return res.status(400).json({ message: 'Invalid query format' });
    }

    const { weekOffset } = queryData;
    const token = req.session.user.accessToken;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) - (7 * weekOffset));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    
    const body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.calories.expended",
        }],
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": startOfWeek.getTime(),
        "endTimeMillis": endOfWeek.getTime()
    };

    try {
        const response = await axios.post(process.env.FITNESS_URL, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const weekCalories = [null, null, null, null, null, null, null];
        response.data.bucket.forEach((bucket) => {
            const day = new Date(parseInt(bucket.startTimeMillis)).getDay();
            const index = day === 0 ? 6 : day - 1;
            if (bucket.dataset[0].point[0]) {
                weekCalories[index] = bucket.dataset[0].point[0].value[0].fpVal;
            }
        });

        const totalCalories = weekCalories.reduce((total, dayCalories) => total + dayCalories, 0);
        
        res.status(200).json({dailyCalories: weekCalories, totalCalories });

    } catch (error) {
        console.error("Error fetching calories data:", error);
        res.status(404).json({ message: error });
    }
};

module.exports = {
    fetchStepCountData,
    fetchDistanceData,
    fetchCaloriesData
}