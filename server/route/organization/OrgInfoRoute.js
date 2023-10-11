const express = require("express");
const router = express.Router();

const OrgInfo = require("../../controller/organization/OrgInfo");

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
  .route("/addorganization-info/:id")
  .post(upload.fields([{ name: "org_logo", maxCount: 1 }]), OrgInfo.addOrgInfo);

module.exports = router;
