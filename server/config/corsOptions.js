// config/corsOptions.js
const allowedOrigins = require('./allowedOrigins');

const development = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, origin);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

const production = {
    origin: ['https://www.healthcarepro.live'], // or an array of origins ['https://yourproductiondomain.com', 'https://anotherdomain.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    optionsSuccessStatus: 204,
    preflightContinue: false,
    maxAge: 600, // 10 minutes
};

const corsOptions = process.env.NODE_ENV === 'production' ? production : development;

module.exports = corsOptions;