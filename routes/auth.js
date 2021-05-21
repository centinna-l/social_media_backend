const express = require('express');
const router = express.Router();
const multer = require("multer");
const authController = require('../controllers/authController');
const { storage } = require('../middlewares/fileUpload');

const uploads = multer({ storage: storage });

router.post('/register', uploads.single('profile_image'), authController.register);
router.post('/login', uploads.none(), authController.login);
router.put('/forgot-password', authController.forgotPassword);

module.exports = router;