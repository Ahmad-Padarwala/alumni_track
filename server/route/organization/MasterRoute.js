const express = require("express");
const router = express.Router();

const Master = require("../../controller/organization/Master");

router.route("/organization-master").get(Master.getOrganizationMaster);

module.exports = router;
