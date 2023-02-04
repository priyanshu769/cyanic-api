const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Cannot add a video without name',
  },
  thumbnail: {
    type: String,
    required: 'Cannot add a video without a valid thumbnail link',
  },
  link: {
    type: String,
    required: 'Cannot add a video without a valid embed link',
  },
  category: {
    type: String,
    required: 'Cannot add a video without category',
  },
})

const Video = mongoose.model('Video', VideoSchema)
module.exports = { Video }
