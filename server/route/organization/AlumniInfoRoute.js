const express = require("express");
const router = express.Router();

const AlumniInfo = require("../../controller/organization/Master");

router.route("/addorganization-info").post(AlumniInfo.addcreateOrgData);

module.exports = router;
