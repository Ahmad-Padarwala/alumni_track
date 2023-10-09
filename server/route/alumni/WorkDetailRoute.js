const express = require("express");
const router = express.Router();
const WorkDetail = require("../../controller/alumni/WorkDetail");

router.route("/getworksData/:id").get(WorkDetail.getWorkDetailData);
router.route("/geteditworksData/:id").get(WorkDetail.getEditworkData);
router.route("/addWorksData/:id").post(WorkDetail.addWorkData);
router.route("/editWorkssData/:id").put(WorkDetail.editWorkData);
router.route("/deleteWorksData/:id").delete(WorkDetail.deleteWorkData);

module.exports = router;
