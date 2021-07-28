const express = require('express')
const router = express.Router()
const {extend} = require('lodash')

// Model
const User = require('../models/user.model')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find({})
      res.json({
        success: true,
        users,
      })
    } catch (error) {
      res.json({
        success: false,
        message: 'kachra ho gya',
        errorMessage: error.message,
      })
    }
  })
  .post(async (req, res) => {
    const addUser = req.body
    try {
      const newUser = new User(addUser)
      const userAdded = await newUser.save()
      res.json({ success: true, userAdded })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to add user',
        errorMessage: error.message,
      })
    }
  })

router.param('id', async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      res.json({ success: false, message: 'No user found with this Id' })
    }
    req.user = user
    next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Errro retrieving user',
      errorMessage: error.message,
    })
  }
})
router.route('/:id')
.get(()=> {
    const user = req.user
    res.json({success: true, user})
})
.post(async (req, res)=> {
    const updateUser = req.body
    let user = req.user
    user = extend(user, updateUser)
    user = await user.save()
    res.json({success: true, user})
})

module.exports = router
