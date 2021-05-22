const mongoose = require("mongoose");
const followRequestSchema = mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamp: true });


module.exports = mongoose.model('FollowRequest', followRequestSchema);