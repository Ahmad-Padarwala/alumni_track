const express = require("express");
const router = express.Router();

const Master = require("../../controller/organization/Master");

router
  .route("/organization-master")
  .post(Master.addcreateOrgData)
  .get(Master.getOrgMaster);

module.exports = router;
