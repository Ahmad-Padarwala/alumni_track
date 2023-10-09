const express = require("express");
const router = express.Router();
const Skill = require("../../controller/alumni/Skill");

router.route("/getskillsData/:id").get(Skill.getSkillData);
router.route("/getSkillDataForEdit/:id").get(Skill.getEditSkillData);
router.route("/addSkillsData/:id").post(Skill.addSkillData);
router.route("/editSkillsData/:id").put(Skill.editSkillData);
router.route("/deleteSkillData/:id").delete(Skill.deleteSkillData);

module.exports = router;
