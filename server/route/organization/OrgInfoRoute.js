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

router.route("/addorganization-info/:id").post(
  upload.fields([
    { name: "org_logo", maxCount: 1 },
    { name: "org_bg", maxCount: 1 },
  ]),
  OrgInfo.addOrgInfo
);
router.route("/getOrganizationWithId/:id").get(OrgInfo.getOrganizationWithId);
router.route("/getJoinedOrgInfoWithId/:id").get(OrgInfo.getJoinedOrgInfoWithId);
router.route("/getOrganizationforedit/:id").get(OrgInfo.getOrganizationEdit);
router.route("/getorganizations").get(OrgInfo.getOrganizationsData);
router.route("/addorgdescription/:id").put(OrgInfo.addOrgDescription);
router.route("/deleteOrgAccount/:id").put(OrgInfo.deleteOrgAccount);
router.route("/getAlumniProfileMaster/:id").get(OrgInfo.getAlumniProfileMaster);
router.route("/editorganization/:id").put(
  upload.fields([
    { name: "org_logo", maxCount: 1 },
    { name: "org_bg", maxCount: 1 },
  ]),
  OrgInfo.EditOrganization
);

module.exports = router;
