const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

//redis connection
const redis = require("redis");
// const client = redis.createClient(6379);
const client = require("../helper/redis_connections");

client.on('connect', (_) => {
    console.log("Connected");
});

client.on('err', (err) => {
    console.log(`${err}`);
});

// const client = require("../helper/redis_connections");
// client.on('connected', (_) => {
//     console.log("Redis Connected")
// });


exports.createPost = async (req, res) => {
    let _id = req.uid;
    let pathToFile = req.pathname + '/' + req.filename;
    const { title, body } = req.body;
    if (!title) {
        return res.json({
            "message": "Please Provide a title"
        })
    }
    User.findById(_id, (err, user) => {
        if (err || !user) {
            return res.json({
                "message": "Cannot Locate User - Please check if you have logged In"
            });
        }
        let data = {
            author: _id,
            title,
            body,
            post_image: pathToFile
        }
        const post = new Post(data);
        post.save((err, p) => {
            if (err || !p) {
                return res.json({
                    "message": "Cannot Add Post"
                });
            }
            User.findByIdAndUpdate(_id, { $push: { posts: post } }, (err, result) => {
                console.log(result);
                if (err || !result) {
                    return res.json({
                        "message": "Cannot Publish Post"
                    });
                }
                return res.json({
                    "message": "Post Published Successfully"
                });
            })
        });
    });
}
//for only 1 ID 
exports.getAllPosts = async (req, res) => {
    let _id = req.uid;
    let author_id = req.params.aid;
    User.findById(_id, (err, huser) => {
        if (err || !huser) {
            return res.json({
                "message": "Cannot Locate User - Please check if you have logged In"
            });
        }
        User.findById({ _id: author_id }, (err, user) => {
            if (err || !user) {
                return res.json({
                    "message": "Cannot locate Author"
                });
            }
            client.setex(author_id, 3600, JSON.stringify(user.posts));
            return res.json(user.posts)

        }).populate({
            path: 'posts',
            populate: {
                path: 'comment'
            }
        });

    });
}