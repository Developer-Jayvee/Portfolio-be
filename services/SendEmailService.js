
const axios = require('axios')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});
async function sendEmail(email_data){
    let response = { message: 'Failed to send email' , status : 0 }
    const request = JSON.parse(email_data);
    
    const info = await transporter.sendMail({
        from: request.email,
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

