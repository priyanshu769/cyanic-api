const router = require('express').Router()

// Model
const Playlist = require('../models/playlist.model')

// Middlewares
const verifyLoggedInUser = require('../middlewares/verifyLoggedInUser.middleware')

router.use(verifyLoggedInUser)

router.route('/').get(async (req, res) => {
  const userId = req.userId
  try {
    const playlists = await Playlist.find({ userId: userId })
    res.json({ success: true, playlists })
  } catch (error) {
    res.json({
      success: false,
      message: 'Cannot get playlists',
      errorMessage: error.message,
    })
  }
})
router.route('/').post(async (req, res) => {
  const userId = req.userId
  let newPlaylist = req.body
  newPlaylist = { ...newPlaylist, userId: userId }
  try {
    const verifyNewPlaylist = new Playlist(newPlaylist)
    const playlistAdded = await verifyNewPlaylist.save()
    const { __v, ...restPlaylistData } = playlistAdded._doc
    res.json({ success: true, playlistAdded: restPlaylistData })
  } catch (error) {
    res.json({
      success: false,
      message: 'Unable to create playlist',
      errorMessage: error.message,
    })
  }
})

router.param('playlistId', async (req, res, next, playlistId) => {
  try {
    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
      res.json({ success: false, message: 'No playlist found with this Id.' })
    }
    if (playlist.userId === req.userId) {
      req.playlist = playlist
      return next()
    } else
      res.json({ success: false, message: "Cannot get other user's playlist" })
  } catch (error) {
    res.json({
      success: false,
      error: 'Unable to fetch playlist.',
      errorMessage: error.message,
    })
  }
})
router.route('/:playlistId').get(async (req, res) => {
  const populatedPlaylist = await Playlist.findById(req.params.playlistId).populate("videos")
  res.json({ success: true, populatedPlaylist })
})
router.route('/:playlistId/addRemoveVideo').post(async (req, res) => {
  const playlist = req.playlist
  const { videoId } = req.body
  if (playlist.videos.includes(videoId)) {
    await playlist.updateOne({ $pull: { videos: videoId } })
  } else await playlist.updateOne({ $push: { videos: videoId } })
  res.json({ success: true, message: "Playlist updated." })
})
router.route('/:playlistId/delete').post(async (req, res) => {
  const playlistId = req.playlist._id
  const playlistDeleted = await Playlist.findOneAndDelete({_id: playlistId})
  res.json({ success: true, message: "Playlist updated.", playlistDeleted })
})

module.exports = router
