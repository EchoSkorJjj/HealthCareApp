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
  },
  store: store, // Use the MongoDB store
  sameSite: 'lax',
  secure: false,
});

module.exports = sessionMiddleware;