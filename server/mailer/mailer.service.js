const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.TRANSPORTER_GMAIL}`,
      pass: `${process.env.TRANSPORTER_PASSWORD}`
    }
});

module.exports = {
    transporter
}