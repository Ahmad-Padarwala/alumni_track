const express = require("express");
const router = express.Router();
const Skill = require("../../controller/skills/Skill");

router.route("/getskillsData/:id").get(Skill.getSkillData);
router.route("/addskillData/:id").post(Skill.addSkillData);

module.exports = router;
