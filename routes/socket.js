const express = require('express');
const { auth } = require('../helper/redis_connections');
const router = express.Router();
const User = require('../models/user');


router.get('/sockets', auth, async (req, res) => {
    let socket = req.app.get('socket.io');
    socket.on('notification', async (data) => {
        const { author_id, post_id } = data;
        let user = await User.findById(author_id).populate({
            path: 'followers',
            select: 'followers -_id'
        }).exec();
        user.followers.foreach(element => {
            socket.emit('send-notifications', {
                target_id: element._id,
                message: `${element.user_name} has posted a new post`,
                post_id: post_id
            });
        })
    })
});

// This is the Request from the Client
// data= {
//     "author_id": "Auth ID",
//     "post_id" : "Post ID"    
// }


module.exports = router;