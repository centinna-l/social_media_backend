const User = require('../models/user');
const FollowRequest = require('../models/followrequest');


exports.sendRequests = async (req, res) => {
    let sender_id = req.uid;
    let reciever_id = req.params.pfid;
    console.log(reciever_id);
    let data = {
        sender_id,
        reciever_id
    };
    const sendRequest = new FollowRequest(data);
    sendRequest.save((err, followrequest) => {
        if (err || !followrequest) {
            return res.json(err);
        }
        return res.json(followrequest);
    });
}


exports.search = async (req, res) => {
    let _id = req.uid;
    const { user_name } = req.body;
    User.findOne({ user_name }, (err, user) => {
        if (err || !user) {
            return res.json({ 'message': 'Not able to Locate User' })
        }
        return res.json(user)
    }).select('-password, -posts');
}