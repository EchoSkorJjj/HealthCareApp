const helmet = require('helmet');

// Development configuration
const developmentConfig = helmet({
  crossOriginResourcePolicy: { policy: "same-site" }
});

// Production configuration
const productionConfig = helmet({
  cors: {
    origin: ["https://www.healthcarepro.live"]
  }
});

const configOptions = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

module.exports = configOptions;