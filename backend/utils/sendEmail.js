import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/* =========================
   TRANSPORTER
========================= */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true only for 465

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

/* =========================
   SEND EMAIL FUNCTION
========================= */
const sendEmail = async (to, subject, text, html = null) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      text,
      html: html || text,
    });
  } catch (error) {
    console.log('Email error:', error);
    throw error;
  }
};

export default sendEmail;
