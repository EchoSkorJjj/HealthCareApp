const helmet = require('helmet');

// Development configuration
const developmentConfig = helmet({
  crossOriginResourcePolicy: { policy: "same-site" }
});

// Production configuration
const productionConfig = helmet({
  crossOriginResourcePolicy: { policy: "same-origin" }
});

const configOptions = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

module.exports = configOptions;