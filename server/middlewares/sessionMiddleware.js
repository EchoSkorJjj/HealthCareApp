const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'sessions',
});

const productionSessionMiddleware = session({
  name: 'sid',
  secret: process.env.MY_SECRET_KEY,
  resave: false,
  // proxy: true, // ******* ABSOLUTELY REQUIRED ********* if using reverse proxy like nginx
  // https://stackoverflow.com/questions/30802322/node-js-express-session-what-does-the-proxy-option-do
  // Explains best about why proxy should be set to true and how nginx actually freaking works
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true, // Use HTTPS //set to false for development (http)
    sameSite: 'none', // Set sameSite to none
    domain: '.healthcarepro.live',
    path: '/', // Set cookie path to root
    httpOnly: true, // Set httpOnly to true
  },
  store: store, // Use the MongoDB store
});

const developmentSessionMiddleware = session({
  name: 'sid',
  secret: process.env.MY_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: true, // Set to false for development (http)
    domain: '.healthcarepro.live',
    sameSite: 'none', // Set sameSite to 'lax'
  },
  store: store, // Use the MongoDB store
});

// const sessionMiddleware = process.env.NODE_ENV === 'production' ? productionSessionMiddleware : developmentSessionMiddleware;
const sessionMiddleware = productionSessionMiddleware;

module.exports = sessionMiddleware;