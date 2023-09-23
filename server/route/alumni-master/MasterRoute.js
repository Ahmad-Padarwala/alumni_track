const express = require("express");
const router = express.Router();

const Master = require("../../controller/alumni-master/Master");
router.route("/alumni-master").get(Master.getAlumniMaster);

module.exports = router;
