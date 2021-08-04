const express = require('express')
const router = express.Router()
const { extend } = require('lodash')


// Model
const { Video } = require('../models/video.model')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const videos = await Video.find({})
      res.json({ success: true, videos })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to fetch videos',
        errorMessage: error.message,
      })
    }
  })
  .post(async (req, res) => {
    const addVideo = req.body
    try {
      const newVideo = new Video(addVideo)
      const addedVideo = await newVideo.save()
      res.json({ success: true, addedVideo })
    } catch (error) {
      res.json({
        success: false,
        message: 'Unable to add video',
        errorMessage: error.message,
      })
    }
  })

router.param('id', async (req, res, next, id) => {
  try {
    const video = await Video.findById(id)
    if (!video) {
      return res.json({
        success: false,
        message: 'No video found with this Id',
      })
    }
    req.video = video
    next()
  } catch (error) {
    res.json({
      success: false,
      message: 'Error while retrieving video',
      errorMessage: error.message,
    })
  }
})
router
  .route('/:id')
  .get((req, res) => {
    let video = req.video
    res.json({ success: true, video })
  })
  .post(async (req, res) => {
    const updateVideo = req.body
    let video = req.video
    video = extend(video, updateVideo)
    video = await video.save()
    res.json({ success: true, video })
  })

module.exports = router
