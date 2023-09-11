const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

require('dotenv').config();
const mongoString = process.env.DATABASE_URL

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));
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

app.use('/api/account', require('./routes/user.routes'));
