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