const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const crypto = require("crypto");

const generateRandomPassword = () => {
    return crypto.randomBytes(32).toString('hex');
};

async function generateUniqueUsername(fullName) {
    const uniqueUsername = fullName.toLowerCase().replace(/ /g, '_');
    let counter = 1;
  
    while (true) {
      const foundUser = await User.findOne({ username: uniqueUsername });
      if (!foundUser) {
        return uniqueUsername;
      }
      uniqueUsername = `${username}_${counter}`;
      counter++;
    }
  }
  
const getUserData = async (access_token) => {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    const data = await response.data;
    return data;
};

const handleGoogleCallback = async (req, res) => {
  try {
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'postmessage',
    );
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    await oAuth2Client.setCredentials(tokens);
    const userAuth = oAuth2Client.credentials;
    // const newAccessToken = await refreshAccessToken(userAuth.refresh_token);
    // data = await getUserData(newAccessToken);
    data = await getUserData(userAuth.access_token)
    userEmail = data.email;
    const user = await User.findOne({
        email: userEmail
    });
    if (!user) {
        const randomPass = generateRandomPassword();
        const uniqueUsername = await generateUniqueUsername(data.name);
        const newUser = new User({
            username: uniqueUsername,
            fullname: data.given_name,
            email: userEmail,
            passwordHash: randomPass,
            isAdmin: false,
        });
        const userToSave = await newUser.save();

        const newProfile = new Profile({
            userId: userToSave._id,
            username: userToSave.username,
            fullname: userToSave.fullname,
            profilePicture: data.picture,
        });
        const profileToSave = await newProfile.save();

        req.session.user = userToSave._id
        req.session.cookie.expires = false;
        res.status(200).json({ message: 'Login successful' });
    } else {
        req.session.user = user._id
        req.session.cookie.expires = false;
        res.status(200).json({ message: 'Login successful' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OAuth callback failed' });
  }
};

const refreshAccessToken = async (refresh_token) => {
    try {
      const data = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
      };
  
      const response = await axios.post('https://oauth2.googleapis.com/token', data);
      const newAccessToken = response.data.access_token;
  
      return newAccessToken;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

module.exports = {
    handleGoogleCallback,
};