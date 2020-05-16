const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const express = require('express')

const defaultEmailData = { from: "noreply@node-react.com" };

exports.sendEmail = ((req, res) => {
  console.log(req.body);
  const output = `
    <p>You have a new Contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>
  `;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "susanfochesatto@gmail.com",
      pass: process.env.EMAIL
    },
    tls: {
      rejectUnauthorized:false
    }
});

let mailOptions = {
  from: 'susanfochesatto@gmail.com', // sender address
  to: 'fsusan@icloud.com', // list of receivers
  subject: 'Trip4me ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: output // html body
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
 return res.redirect('/')
});
