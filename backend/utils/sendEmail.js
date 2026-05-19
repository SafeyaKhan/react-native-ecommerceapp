const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // false for 587

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (to, subject, text, html = null) => {
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    text,
    html: html || text,
  });
};

module.exports = sendEmail;
