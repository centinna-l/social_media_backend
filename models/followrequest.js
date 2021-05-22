const mongoose = require("mongoose");
const followRequestSchema = mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reciever_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamp: true });


module.exports = mongoose.model('FollowRequest', followRequestSchema);