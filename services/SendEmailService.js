
const axios = require('axios')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});
async function sendEmail(email_data){
    let response = { message: 'Failed to send email' , status : 0 }
    const request = JSON.parse(email_data);
    
    const info = await transporter.sendMail({
        from: process.env.RECEIPIENT_EMAIL,
        to: process.env.RECEIPIENT_EMAIL,
        subject: "Portfolio Email Send",
        text: '',
        html:`<h1>From : ${request.email} </h1> <br> ${request.message}` 
    });
  if(info){
    response.message = 'Success';
    response.status = 1
    return response
  }
  return response
}
module.exports = { sendEmail };

