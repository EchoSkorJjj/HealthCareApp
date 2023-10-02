const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nodejs Express API',
      version: '1.0.0',
      description: 'Basic API',
    },
    basePath: '/',
  },
  apis: ['./routes/*.js'], // Specify the paths to your route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
