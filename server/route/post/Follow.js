const express = require("express");
const router = express.Router();

const Follow = require("../../controller/post/Follow");

router.route('/addUserFollowPost/:id/:reqid').post(Follow.addUserFollowPost);
router.route('/getUserFollowLenght/:id').get(Follow.getUserFollowLenght);
// router.route('/checkFollowingStatus/:userId/:otherUserId').get(Follow.getUserCheckFollowingStatus);

module.exports = router;