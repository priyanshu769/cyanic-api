const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Cannot add a user without name"
    },
    email: {
        type: String,
        required: "Cannot add a user without a valid email address"
    },
    password: {
        type: String,
        required: "Cannot add a user without password"
    },
    playlists: {
        type: Array,

    },
    likeVideos: {
        type: Array
    },
    watchLater: {
        type: Array
    }
})
const User = mongoose.model('User', UserSchema)
module.exports = User