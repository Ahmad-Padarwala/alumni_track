const express = require("express");
const router = express.Router();
const Education = require("../../controller/education/Education");

router.route("/addeducation").post(Education.addEducation);

module.exports = router;
