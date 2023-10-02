const { totp: totpFactory } = require('otplib');
const otpConfig = require('../config/otpConfig');

const NUM_MINUTES_IN_AN_HOUR = 60;
const totp = totpFactory.clone({
    step: otpConfig.expiry,
    window: [otpConfig.numValidPastWindows, otpConfig.numValidFutureWindows],
  });

function concatSecretWithEmail(email) {
  return `${otpConfig.secret}` + email;
}

function generateOtp(email) {
  const token = totp.generate(concatSecretWithEmail(email));
  const timeLeft = Math.floor(totp.options.step / NUM_MINUTES_IN_AN_HOUR);
  return { token, timeLeft };
}

function verifyOtp(email, token) {
  return totp.verify({
    secret: concatSecretWithEmail(email),
    token,
  });
}

module.exports = {
  generateOtp,
  verifyOtp,
};
