const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Cannot create account without name"
    },
    email: {
        type: String,
        required: "Cannot create account without a valid email address"
    },
    password: {
        type: String,
        min: 6,
        required: "Cannot create account without password"
    },
    likedVideos: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}]
    },
    watchLater: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Video"}]
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User