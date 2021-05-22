const express = require('express');
const router = express.Router();
const multer = require("multer");
const postController = require('../controllers/postController');
const { storage } = require('../middlewares/fileUpload');
const auth = require("../middlewares/auth");
const cache = require('../middlewares/cache');
const userCache = require('../middlewares/userCache');

const uploads = multer({ storage: storage });

router.post('/create-post', uploads.single("post_image"), auth, postController.createPost);
//for a specefic User
router.get('/get-all-posts/:uid', uploads.none(), cache, auth, postController.getAllPosts);
router.get('/get-user-posts/:username', uploads.none(), userCache, auth, postController.getUserFeeds);

module.exports = router;