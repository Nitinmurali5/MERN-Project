const nodemailer = require('nodemailer');
require('dotenv').config(); 


console.log('GMAIL_USER:', process.env.GMAIL_USER ? '✓ Loaded' : '✗ Missing');
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✓ Loaded' : '✗ Missing');


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_APP_PASSWORD 
  }
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: 'nitin.m2024cce@sece.ac.in', 
  subject: 'Test Email from Gmail',
  text: 'Hello! This is a test email sent through Gmail using Nodemailer.',
  html: `
    <h2>Hello from Gmail!</h2>
  `
};

console.log('📧 Sending email...');


transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('❌ Error occurred:', error.message);
  } else {
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  }
});