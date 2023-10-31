const express = require("express");
const router = express.Router();

const Post = require("../../controller/post/Post");

const multer = require("multer");

var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.${file.originalname}`);
  },
});

var upload = multer({
  storage: imgconfig,
});

router
  .route("/addPostData/:id")
  .post(upload.fields([{ name: "post_image", maxCount: 1 }]), Post.addPostData);
router.route("/getPostData").get(Post.getPostData);
router.route("/getpostdatawithid/:id").get(Post.getPostDataWithId);
router.route("/getUserPostDataWithId/:id").get(Post.getUserPostDataWithId);
router.route("/deletePostData/:id").delete(Post.deletePostData);
router
  .route("/editUserPostData/:id")
  .put(
    upload.fields([{ name: "post_image", maxCount: 1 }]),
    Post.editUserPostData
  );

module.exports = router;
