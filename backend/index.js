const express = require('express');
const mongoose = require('mongoose');
const registerRoute = require('./routes/registerRoute');
const getAllRoute = require('./routes/getAllRoute');
const loginRoute = require('./routes/loginRoute');
const updateUserRoute = require('./routes/changePassRoute');
const deleteUserRoute = require('./routes/deleteUserRoute');
const refreshRoute = require('./routes/refreshRoute');

require('dotenv').config();

const app = express();
const mongoString = process.env.DATABASE_URL

app.use(express.json());

app.listen(3500, () => {
    console.log('Server started at port 3500')
})
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

app.use('/api/account', registerRoute);
app.use('/api/account', getAllRoute);
app.use('/api/account', loginRoute);
app.use('/api/account', updateUserRoute);
app.use('/api/account', deleteUserRoute);
app.use('/api/account', refreshRoute);

//Protect Routes with JWT:
//Apply the verifyToken middleware to all the routes that need JWT authentication, like updateUserRoute.js and deleteUserRoute.js.
//Handle Token in React Native Frontend:
//In your React Native frontend, store the received JWT token securely and include it in the headers of API requests to protected routes.
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;