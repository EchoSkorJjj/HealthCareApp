const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swaggerConfig')
const helmetConfig = require('./config/helmetConfig.js');

require('dotenv').config();
const mongoString = process.env.DATABASE_URL

const app = express();

// app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
);

// app.use((req, res, next) => {
//     // Allow requests from "https://localhost"
//     res.header('Access-Control-Allow-Origin', 'https://localhost');
    
//     // Allow credentials (e.g., cookies) to be sent in cross-origin requests
//     res.header('Access-Control-Allow-Credentials', 'true');
  
//     // Other CORS headers if needed
//     // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
//     // Continue to the next middleware or route
//     next();
//   });

app.use(express.urlencoded({ extended: true }));
//serving public file
app.use(express.static(__dirname));

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

app.use('/request', require('./routes/register.routes'));
app.use('/api/account', require('./routes/user.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/healthcheck', (req,res, next) => {
    res.status(200).send('Welcome to HealthCare API');
    next();
})