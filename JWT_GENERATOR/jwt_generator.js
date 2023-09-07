const crypto = require("crypto");

// Generate a random secret key
const generateRandomSecret = () => {
    return crypto.randomBytes(32).toString('hex');
};

const jwtSecret = generateRandomSecret();
const jwtRefreshSecret = generateRandomSecret();
const jwtResetSecret = generateRandomSecret();
const jwtSessionSecret = generateRandomSecret();

console.log('JWT Secret:', jwtSecret);
console.log('JWT Refresh Secret:', jwtRefreshSecret);
console.log('JWT Reset Secret:', jwtResetSecret);
console.log('JWT Session Secret:', jwtSessionSecret) // Print reset secret
