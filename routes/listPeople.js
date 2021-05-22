const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const peopleController = require('../controllers/listPeopleController');


router.get('/get-followers-list', auth, peopleController.getFollowersList)
router.get('/get-following-list', auth, peopleController.getFollowingList);


module.exports = router;