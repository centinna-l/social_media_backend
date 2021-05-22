const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth');
const { storage } = require('../middlewares/fileUpload');
var uploads = multer({ storage: storage });
const requestController = require('../controllers/requestController');

router.post('/search', auth, uploads.none(), requestController.search);
router.get('/send-requests/:pfid', auth, uploads.none(), requestController.sendRequests);


module.exports = router;


//pfid - Potential Follower ID