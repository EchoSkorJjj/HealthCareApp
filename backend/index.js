const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

require('dotenv').config();
const mongoString = process.env.DATABASE_URL

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

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

app.use('/api/account', require('./routes/user.routes'));

//Protect Routes with JWT:
//Apply the verifyToken middleware to all the routes that need JWT authentication, like updateUserRoute.js and deleteUserRoute.js.
//Handle Token in React Native Frontend:
//In your React Native frontend, store the received JWT token securely and include it in the headers of API requests to protected routes.
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;