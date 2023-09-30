module.exports = {
    expiry: process.env.OTP_EXPIRY || 300,
    secret: process.env.OTP_SECRET || 'toomanysecrets',
    numValidPastWindows: process.env.OTP_NUM_VALID_PAST_WINDOWS || 1,
    numValidFutureWindows: process.env.OTP_NUM_VALID_FUTURE_WINDOWS || 0,
  };