const swaggerSpec = require('../config/swaggerConfig');

const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, 'swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));