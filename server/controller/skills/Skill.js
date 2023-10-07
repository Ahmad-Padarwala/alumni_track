const conn = require("../../db/Connection");

//get alumni member skill profile
const getSkillData = async (req, res) => {
  const user_id = req.params.id;
  const sql = `SELECT * FROM alumni_skill WHERE user_id=?`;
  const data = [user_id];
  conn.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from alumni_skill Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//add alumni skill data
const addSkillData = async (req, res) => {
  const user_id = req.params.id;
  const { skill_name, skill_level } = req.body;
  const sql =
    "INSERT INTO alumni_skill (user_id, skill_name, skill_level) VALUES (?,?,?)";
  const data = [user_id, skill_name, skill_level];
  conn.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = { getSkillData, addSkillData };
