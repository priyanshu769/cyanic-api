const express = require('express')
const router = express.Router()
const { extend } = require('lodash')

// Model
const User = require('../models/user.model')

// Middlewares
const verifyLoggedInUser = require('../middlewares/verifyLoggedInUser.middleware')

router.use(verifyLoggedInUser)
router.route('/').get(async (req, res) => {
  try {
    const userId = req.userId
    if (userId) {
      const user = await User.findById(userId).populate("likedVideos").populate("watchLater").exec()
      const { password, __v, ...restUserData } = user._doc
      res.json({ succcess: true, user: restUserData })
    }
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to get user',
      errorMessage: error.message,
    })
  }
})

router.route('/likeVideo').post(async(req, res) => {
  const userId = req.userId
  const {videoId} = req.body
  try {
    const user = await User.findById(userId)
    if(user.likedVideos.includes(videoId)){
      await user.updateOne({$pull: {likedVideos: videoId}})
      res.json({ success: true, message: "Video removed from liked." })
    } else 
    await user.updateOne({$push: {likedVideos: videoId}})
    res.json({ success: true, message: "Video added to liked." })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to add video to liked videos.',
      errorMessage: error.message,
    })
  }
})
router.route('/watchLater').post(async(req, res) => {
  const userId = req.userId
  const {videoId} = req.body
  try {
    const user = await User.findById(userId)
    if(user.watchLater.includes(videoId)){
      await user.updateOne({$pull: {watchLater: videoId}})
      res.json({ success: true, message: "Video removed from watch later." })
    } else 
    await user.updateOne({$push: {watchLater: videoId}})
    res.json({ success: true, message: "Video added to watch later." })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to add video to watch later videos.',
      errorMessage: error.message,
    })
  }
})

module.exports = router
