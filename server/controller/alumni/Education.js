const conn = require("../../db/Connection");

//get alumni member education profile
const getEducationData = async (req, res) => {
  const user_id = req.params.id;
  const sql = `SELECT * FROM alumni_education WHERE user_id=?`;
  const data = [user_id];
  conn.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from alumni_education Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//get education data with id
const getEducationWithId = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM alumni_education WHERE id=?`;
  const data = [id];
  conn.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from alumni_education Table with id in server.js" +
          error
      );
    } else {
      res.status(200).json(result);
    }
  });
};
//edit education data
const editEducationData = async (req, res) => {
  const id = req.params.id;
  const {
    field_study,
    institute_name,
    study_startDate,
    study_endDate,
    result,
  } = req.body;
  const sql = `UPDATE alumni_education SET field_study=?, institute_name=?, study_startDate=?, study_endDate=?, result=? WHERE id=?`;
  const data = [
    field_study,
    institute_name,
    study_startDate,
    study_endDate,
    result,
    id,
  ];
  conn.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error editing Data from alumni_education Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};
// add alumni member education profile
const addEducation = async (req, res) => {
  const user_id = req.params.id;
  const {
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
      res.sendStatus(200);
    }
  });
};

//delete education data
const deleteEducationData = async (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM alumni_education WHERE id=${id}`;
  conn.query(sql, [id], (error) => {
    if (error) {
      console.log("Error Delete education Data in server.js" + error);
    }
    res.sendStatus(200);
  });
};

module.exports = {
  addEducation,
  getEducationData,
  getEducationWithId,
  editEducationData,
  deleteEducationData,
};
