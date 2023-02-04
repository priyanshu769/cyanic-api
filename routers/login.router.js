const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const secretKey = process.env.SECRET

// Model
const User = require('../models/user.model')

router.route('/').post(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email }).populate("likedVideos").populate("watchLater").exec()
  if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (isPasswordCorrect) {
        const token = jwt.sign({userId: user._id}, secretKey)
        const {password, __v, ...restUserData} = user._doc
      return res.json({ success: true, message: "Login Successful", user: restUserData, token })
    }
    return res.json({ success: false, message: 'Incorrect Password' })
  }
  return res.json({
    success: false,
    message: 'No account linked to this email.',
  })
})

module.exports = router