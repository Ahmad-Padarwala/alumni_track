const express = require("express");
const router = express.Router();

const Master = require("../../controller/alumni/Master");
router
  .route("/alumni-master")
  .get(Master.getAlumniMaster)
  .post(Master.addSignUpData);
router.route("/getPendingAlumniMaster").get(Master.getPendingAlumniMaster);
router.route("/acceptUserReq/:id").put(Master.acceptUserReq);
router
  .route("/getalumniMasterWithId/:id")
  .get(Master.getAlumniMasterDataWithId);

module.exports = router;
