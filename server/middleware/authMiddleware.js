const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userSchema')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get User from the token
      req.user = await User.findById(decoded.id).select('-password')
      next()

    } catch (e) {
      console.log(e)
      res.status(401)
      throw new Error('Not Authenticated')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authenticated, no token')
  }
})

module.exports = {
  protect
}