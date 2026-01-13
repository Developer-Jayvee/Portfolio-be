
const axios = require('axios')
const nodemailer = require("nodemailer");
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY)
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: 2587,
//   secure: false, 
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
//   connectionTimeout: 10000,
// });
async function sendEmail(email_data){
    let response = { message: 'Failed to send email' , status : 0 }
    const request = JSON.parse(email_data);

    const { data, error } = await resend.emails.send({
        from: 'Jayvee Portfolio <onboarding@resend.dev>',
        to:'jayvee.github0703@gmail.com',
        subject: "hello world",
        html: `<h1>From : ${request.email} </h1> <br> ${request.message}`,
    });
  //   const info = await transporter.sendMail({
  //       from: process.env.RECEIPIENT_EMAIL,
  //       to: process.env.RECEIPIENT_EMAIL,
  //       subject: "Portfolio Email Send",
  //       text: '',
  //       html:`<h1>From : ${request.email} </h1> <br> ${request.message}` 
  //   });
  if(data){
    response.message = 'Success';
    response.status = 1
  }

  return response
}
module.exports = { sendEmail };

