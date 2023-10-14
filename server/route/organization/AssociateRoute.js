const express = require("express");
const router = express.Router();

const Associate = require("../../controller/organization/Associate");

router
  .route("/sendrequestforalumni/:userId/:orgId")
  .post(Associate.sendReqAlumni);
router.route("/getrequestedalumni/:id").get(Associate.getRequestedAlumni);
module.exports = router;
