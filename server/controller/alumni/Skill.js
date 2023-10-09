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

//get edit skill data for edit
const getEditSkillData = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM alumni_skill WHERE id=?`;
  const data = [id];
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
const addSkillData = (req, res) => {
  const user_id = req.params.id;
  const { skill_name, skill_level } = req.body;

  // Check if the user_id exists in the alumni_master table
  const checkUserQuery = "SELECT * FROM alumni_master WHERE id = ?";
  conn.query(checkUserQuery, [user_id], (checkUserErr, checkUserResults) => {
    if (checkUserErr) {
      console.error("Error checking user:", checkUserErr);
      res.status(500).json({ error: "Error checking user" });
    } else if (checkUserResults.length === 0) {
      // User does not exist, return an error
      res.status(404).json({ error: "User not found" });
    } else {
      // User exists, proceed with inserting skill data
      const sql =
        "INSERT INTO alumni_skill (user_id, skill_name, skill_level) VALUES (?, ?, ?)";
      const data = [user_id, skill_name, skill_level];

      conn.query(sql, data, (err, result) => {
        if (err) {
          console.error("Error adding record:", err);
          res.status(500).json({ error: "Error adding record" });
        } else {
          console.log("Record added successfully");
          res.sendStatus(200);
        }
      });
    }
  });
};

//edit skill data section start
const editSkillData = (req, res) => {
  const { id, skill_name, skill_level } = req.body;
  const sql =
    "UPDATE alumni_skill SET skill_name = ?, skill_level = ? WHERE id = ?";
  const data = [skill_name, skill_level, id];
  conn.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      console.log("Number of records updated: " + result.affectedRows);
      res.sendStatus(200);
    }
  });
};
const deleteSkillData = (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM alumni_skill WHERE id=${id}`;
  conn.query(sql, (error) => {
    if (error) {
      console.log("Error Delte Data in server.js" + error);
    }
    res.sendStatus(200);
  });
};

module.exports = {
  getSkillData,
  addSkillData,
  getEditSkillData,
  editSkillData,
  deleteSkillData,
};
