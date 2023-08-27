const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token missing' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const userId = decoded.userId;

        const accessToken = generateAccessToken(userId);

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
});

// Helper function to generate access token
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

module.exports = router;
// Token Expiration:
//Access tokens typically have a shorter lifespan (e.g., 15 minutes) to enhance security. After the access token expires, the user can no longer use it to make authenticated requests.
//Frontend Interaction:
//When the frontend receives an "access token expired" error while making a request to a protected route, it can initiate the token refresh process.
//Calling refreshRoute:
//To refresh the access token, the frontend sends a request to the refreshRoute in your backend, passing the refresh token. The refreshRoute validates the refresh token and generates a new access token if the refresh token is valid.
//Response to Frontend:
//If the refresh token is valid, the refreshRoute sends back a response containing the new access token. The frontend can then use this new access token to retry the original request to the protected route.
//Frontend Error Handling:
//If the refresh token is not valid (e.g., expired, tampered), the refreshRoute responds with an error message. The frontend should handle this error appropriately, possibly by logging the user out or showing an error message.
