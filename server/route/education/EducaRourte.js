const express = require("express");
const router = express.Router();
const Education = require("../../controller/education/Education");

router.route("/addeducation/:id").post(Education.addEducation);
router.route("/getEducationWithId/:id").get(Education.getEducationData);
router
  .route("/getEducationWithIdforedit/:id")
  .get(Education.getEducationWithId);
router.route("/editEducationData/:id").put(Education.editEducationData);
router.route("/deleteEducationData/:id").delete(Education.deleteEducationData);

module.exports = router;
