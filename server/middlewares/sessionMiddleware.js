const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'sessions',
});

const sessionMiddleware = session({
  name: 'sid',
  secret: process.env.MY_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false, // Use HTTPS //set to false for development (http)
    sameSite: 'lax', // Set sameSite to none
  },
  store: store, // Use the MongoDB store
});

module.exports = sessionMiddleware;