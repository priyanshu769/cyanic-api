const jwt = require('jsonwebtoken')
require('dotenv').config()
const secretKey = process.env.SECRET

const verifyLoggedInUser = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(403).json({ success: false, message: 'Invalid Token' })
  }
  try {
    const decode = jwt.decode(token, secretKey)
    req.userId = decode.userId
    return next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to decode data from token.',
      errorMessage: error.message,
    })
  }
}

module.exports = verifyLoggedInUser
