const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const postSchema = mongoose.Schema({
    author: {
        type: ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
    post_image: {
        type: String
    },
    likes: {
        type: Number
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }]

}, { timestamps: true });



module.exports = mongoose.model('Post', postSchema);