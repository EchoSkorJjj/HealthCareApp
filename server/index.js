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

const PORT = process.env.PORT || 3000;
app.set("trust proxy", 1);
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpecs)
);

app.use(express.urlencoded({ extended: true }));
//serving public file
app.use(express.static(__dirname));

app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);      
});
 
const connection = mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})
 // random comment
app.use('/request', require('./routes/register.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api/account', require('./routes/user.routes'));
app.use('/api/recipe', require('./routes/recipe.routes'));
app.use('/api/fitness', require('./routes/fitness.routes'));
app.use('/healthcheck', (req,res, next) => {
    res.status(200).send('Welcome to HealthCare API');
    next();
})

module.exports = {app, server, database};