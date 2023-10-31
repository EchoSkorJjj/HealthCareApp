const helmet = require('helmet');

// Development configuration
const developmentConfig = helmet({
  crossOriginResourcePolicy: { policy: "same-site" }
});

// Production configuration
const productionConfig = helmet({
  cors: {
    origin: ["https://healthcarepro-client-5fa84d187628.herokuapp.com"]
  }
});

const configOptions = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

module.exports = configOptions;