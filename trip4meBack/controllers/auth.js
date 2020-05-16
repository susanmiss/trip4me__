const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const _ = require("lodash");
const dotenv = require("dotenv");
const User = require('../models/user');
require('dotenv').config()
dotenv.config();

exports.signup = async (req, res) => {
  const userExists = await User.findOne({email: req.body.email})
  if(userExists)
    return res.status(403).json({
      error: 'Email alredy exists!'
  })
  const user = await new User(req.body);
  await user.save();
  res.status(200).json(
    {message: "Admin User Successfully created", user}
  );
}


exports.signin = (req, res) => {
  const { email, password} = req.body
  User.findOne({email}, (err, user) => {
    if(err || !user){
      return res.status(401).json({
        error: "Wrong e-mail or password. Please try again."
      })
    }
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Email and password do not match."
      })
    }
    const token = jwt.sign({_id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.cookie('t', token, {expire: new Date() + 99999})
    const { _id, email, role } = user
    return res.json( {message: "Admin logged successfuly", token, user: { _id, email, role }})
  });
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  return res.json({message: 'Admin Signout Success!'})
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth'
})
