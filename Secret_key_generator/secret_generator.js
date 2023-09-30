const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

console.log(secretKey);

function generateRandomSecret(length = 32) {
  // Length specifies the number of bytes. Since each byte is represented by 2 hexadecimal characters, the secret will have twice the length.
  const secretBytes = crypto.randomBytes(length);

  // Convert the random bytes to a hexadecimal string
  const secretHex = secretBytes.toString('hex');

  return secretHex;
}

// Usage example:
const randomSecret = generateRandomSecret();
console.log('Random Secret:', randomSecret);