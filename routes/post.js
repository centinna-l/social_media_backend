const express = require('express');
const router = express.Router();
const multer = require("multer");
// const postController = require('../controllers/postController');
const { storage } = require('../middlewares/fileUpload');
const auth = require("../middlewares/auth");

const uploads = multer({ storage: storage });

// router.post('/create-post', uploads.single("post_image"), auth, postController.createPost);
// router.get('/get-all-posts', uploads.none(), auth, postController.getAllPosts);

module.exports = router;