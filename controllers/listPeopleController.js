const User = require("../models/user");


exports.getFollowersList = async (req, res) => {

    let _id = req.uid;
    let user = await User.findById(_id).populate({
        path: 'followers',
        select: 'user_name email profile_image'
    }
    ).select('followers -_id').exec();
    if (!user) {
        return res.json({
            "message": "Cannot Locate User"
        });
    }
    return res.json({
        "followers": user.followers
    });
}

exports.getFollowingList = async (req, res) => {
    let _id = req.uid;
    let user = await User.findById(_id).populate({
        path: 'following',
        select: 'user_name email profile_image'
    }
    ).select('following -_id').exec();
    if (!user) {
        return res.json({
            "message": "Cannot Locate User"
        });
    }
    return res.json({
        "following": user.following
    });
}

//remove a follower
exports.removeFollower = async (req, res) => {
    let _id = req.uid;
    let follower_id = req.params.fid;
    if (_id === follower_id) {
        return res.json({
            "message": "You cannot remove yourself"
        });
    }
    User.findById(_id, async (err, user) => {
        if (err || !user) {
            return res.json({
                "message": "Cannot locate User / Token Invalid"
            });
        }
        let check = await User.findOne({ _id }).select('followers -_id').exec();
        let temp_id = JSON.stringify(check.followers[0]);
        let temp1_id = JSON.stringify(follower_id);
        if (!(temp1_id === temp_id)) {
            return res.json({
                "message": "User Not found in Follower list"
            });
        }
        User.findByIdAndUpdate(_id, { $pull: { followers: follower_id } }, (err, result) => {
            if (err || !result) {
                return res.json({
                    "message": "Cannot Remove User"
                });
            }
            User.findByIdAndUpdate(follower_id, { $pull: { following: _id } }, (err, result) => {
                if (err || !result) {
                    return res.json({
                        "message": "Cannot Remove User from their following list"
                    });
                }
                return res.json({
                    "message": "User Removed Sucessfully"
                });
            });

        });
    });
}

exports.removeFollowing = async (req, res) => {
    let _id = req.uid;
    let following_id = req.params.fid;
    if (_id === following_id) {
        return res.json({
            "message": "You cannot remove yourself"
        });
    }
    User.findById(_id, async (err, user) => {
        if (err || !user) {
            return res.json({
                "message": "Cannot locate User / Token Invalid"
            });
        }
        let check = await User.findOne({ _id }).select('following -_id').exec();
        let temp_id = JSON.stringify(check.following[0]);
        let temp1_id = JSON.stringify(following_id);
        if (!(temp1_id === temp_id)) {
            return res.json({
                "message": "User Not found in Following list"
            });
        }
        User.findByIdAndUpdate(_id, { $pull: { following: following_id } }, (err, result) => {
            if (err || !result) {
                return res.json({
                    "message": "Cannot Remove User - following"
                });
            }
            User.findByIdAndUpdate(following_id, { $pull: { followers: _id } }, (err, res) => {
                if (err || !res) {
                    return res.json({
                        "message": "Cannot remove User - Follower"
                    });
                }
                return res.json({
                    "message": "User Removed"
                });
            })

        });
    });
}