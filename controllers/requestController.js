const User = require('../models/user');
const FollowRequest = require('../models/followrequest');


exports.sendRequests = async (req, res) => {
    let _id = req.uid;
    let reciever_id = req.params.pfid;
    console.log(_id);
    console.log(reciever_id);
    let current_user = await User.findById(_id).exec();
    if (!current_user) {
        return res.json({
            "message": "Cannot locate current user - Invalid Authorisation"
        });
    }
    let data = {
        sender_id: _id,
        reciever_id
    };
    let user = await User.findById(reciever_id).exec();
    if (!user) {
        return res.json({
            "message": "Cannot Locate User"
        });
    }
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
    console.log("ID", _id)
    const { user_name } = req.body;
    User.findOne({ user_name: { $regex: user_name } }, (err, user) => {
        if (err || !user) {
            return res.json({ 'message': 'Not able to Locate User' })
        }
        return res.json(user)
    }).select('-password, -posts');
}

exports.getAllRequests = async (req, res) => {
    let _id = req.uid;
    FollowRequest.find({ reciever_id: _id }).populate({
        path: 'sender_id',
        select: '-password  -posts',
    }).then((follow) => {
        if (!follow) {
            return res.json({
                "message": "Cannot find"
            })
        }
        return res.json({ follow })
    });
}

exports.acceptRequest = async (req, res) => {
    let _id = req.uid;
    let sender_id = req.params.sid;
    User.findById(_id, (err, user) => {
        if (err || !user) {
            return res.json({
                "message": "User Does not exist - Token Invalid"
            });
        }
        FollowRequest.findOne({ sender_id, reciever_id: _id }, (err, follow) => {
            if (err || !follow) {
                return res.json({
                    "message": "Not able to find the following Request -1"
                });
            }
            User.findByIdAndUpdate(_id, { $push: { followers: follow.sender_id } }, (err, user) => {
                if (err || !user) {
                    console.log('User', user)
                    return res.json({
                        "message": "Cannot Add Friend-1"
                    });
                }
                console.log(follow);
                User.findOneAndUpdate({ _id: sender_id }, { $push: { following: follow.reciever_id } }, (err, update) => {
                    if (err || !update) {
                        return res.json({
                            "message": "Cannot Add Friend-2"
                        });
                    }
                    console.log(update)
                    FollowRequest.findByIdAndDelete(follow._id, (err, result) => {
                        if (err || !result) {
                            return res.json({
                                "message": "Cannot Add Friend- Delete from Follow Table"
                            });
                        }
                        return res.json({
                            "message": "Accepted Request"
                        })
                    });
                });
            });
        });
    });
}