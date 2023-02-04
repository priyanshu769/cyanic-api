const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
    playlistName: {
        type: String,
        required: "Cannot create account without name"
    },
    videos: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}],
    },
    userId: {
        type: String,
        required: "Cannot create playlist without userId"
    }
})

const Playlist = mongoose.model('Playlist', PlaylistSchema)
module.exports = Playlist