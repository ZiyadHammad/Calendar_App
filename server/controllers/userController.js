const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');





const registerUser = (req, res) => {
  res.json({message: 'Register user'})
}

const loginUser = (req, res) => {
  res.json({message: 'login user'})
}
const getUser = (req, res) => {
  res.json({message: 'User Data'})
}

module.exports = {
  registerUser,
  loginUser,
  getUser
}