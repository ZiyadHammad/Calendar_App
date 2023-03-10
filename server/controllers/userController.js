const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');



const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.status(400);
    throw new Error('Please fill in all required fields')
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid User Date');
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
  
})
const getMe = asyncHandler(async  (req, res) => {
  const { _id, email, name } = await User.findById(req.user.id)
  res.status(200).json({
    id: _id,
    name,
    email
  })

})

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}