const conn = require("../../db/Connection");

// add alumni member education profile
const addEducation = async (req, res) => {
  const {
    user_id,
    field_study,
    institute_name,
    study_startDate,
    study_endDate,
    result,
  } = req.body;
  const sql =
    "INSERT INTO alumni_education (user_id, field_study, institute_name,study_startDate,study_endDate,result) VALUES (?,?,?,?,?,?)";
  const data = [
    user_id,
    field_study,
    institute_name,
    study_startDate,
    study_endDate,
    result,
  ];
  conn.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      console.log("Records added: " + result.affectedRows);
      res.sendStatus(200);
    }
  });
};

module.exports = { addEducation };
