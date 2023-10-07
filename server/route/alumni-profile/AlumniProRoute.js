const express = require("express");
const router = express.Router();
const AlumniProfile = require("../../controller/alumni-profile/AlumniProfie");

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

router.route("/addalumniprofile").post(
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "cover_background", maxCount: 1 },
  ]),
  AlumniProfile.addAlumniProfile
);
router
  .route("/getalumniprofilewithid/:id")
  .get(AlumniProfile.getAlumniProfileWithId);

router.route("/editalumniprofile/:id").put(
  upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "cover_background", maxCount: 1 },
  ]),
  AlumniProfile.editAlumniProfile
);

module.exports = router;
