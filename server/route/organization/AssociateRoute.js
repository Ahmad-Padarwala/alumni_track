const express = require("express");
const router = express.Router();

const Associate = require("../../controller/organization/Associate");

router
  .route("/sendrequestforalumni/:userId/:orgId")
  .post(Associate.sendReqAlumni);
router
  .route("/getrequestedalumni/:id/:status")
  .get(Associate.getRequestedAlumni);
router.route("/deleteAlumniRequest/:id").delete(Associate.deleteAlumniRequest);
router.route("/acceptAlumniRequest/:id").put(Associate.acceptAlumniRequest);
router.route("/getJoinedOrgWithId/:id").get(Associate.getJoinedOrgWithId);
module.exports = router;
