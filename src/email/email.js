import nodemailer from 'nodemailer'
import { emailHtml } from './emailHTML.js';
export const sendEmails=async(email)=>{



 const transporter =nodemailer.createTransport({
service:"gmail",
    auth: {
      user: "samehtharwat420@gmail.com",
      pass: "szzmkmovtsrofycj",
    },
  });


  
    const info = await transporter.sendMail({
      from: '"ST corporation " <samehtharwat420@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: emailHtml(email)

    });


}