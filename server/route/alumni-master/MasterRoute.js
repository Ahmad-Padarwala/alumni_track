const express = require("express");
const router = express.Router();

const Master = require("../../controller/alumni-master/Master");
router
  .route("/alumni-master")
  .get(Master.getAlumniMaster)
  .post(Master.addSignUpData);
router
  .route("/getalumniMasterWithId/:id")
  .get(Master.getAlumniMasterDataWithId);

module.exports = router;
