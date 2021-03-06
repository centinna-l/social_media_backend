const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

module.exports = mongoose.model("User", userSchema);