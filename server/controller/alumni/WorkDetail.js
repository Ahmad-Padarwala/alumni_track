const conn = require("../../db/Connection");

const getWorkDetailData = (req, res) => {
  const user_id = req.params.id;
  const sql = `SELECT * FROM alumni_work_detail WHERE user_id=?`;
  const data = [user_id];
  conn.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from alumni_work_detail Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//get edit skill data for edit
const getEditworkData = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM alumni_work_detail WHERE id=?`;
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

//add workdetail data

const addWorkData = (req, res) => {
  const user_id = req.params.id;
  const {
    job_title,
    compeny_name,
    compeny_location,
    job_startDate,
    job_endDate,
  } = req.body;
  const sql =
    "INSERT INTO alumni_work_detail (user_id, job_title, compeny_name, compeny_location, job_startDate, job_endDate) VALUES (?, ?, ?, ?, ?, ?)";
  const data = [
    user_id,
    job_title,
    compeny_name,
    compeny_location,
    job_startDate,
    job_endDate,
  ];

  conn.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      console.log("Record added successfully");
      res.sendStatus(200);
    }
  });
};

//edit work detail section start

const editWorkData = (req, res) => {
  const {
    id,
    job_title,
    compeny_name,
    compeny_location,
    job_startDate,
    job_endDate,
  } = req.body;
  const sql =
    "UPDATE alumni_work_detail SET job_title = ?, compeny_name = ?,compeny_location=?,job_startDate=?,job_endDate=? WHERE id = ?";
  const data = [
    job_title,
    compeny_name,
    compeny_location,
    job_startDate,
    job_endDate,
    id,
  ];
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

//DELETE DATA SECTION START

const deleteWorkData = (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM alumni_work_detail WHERE id=${id}`;
  conn.query(sql, (error) => {
    if (error) {
      console.log("Error Delte Data in server.js" + error);
    }
    res.sendStatus(200);
  });
};

module.exports = {
  getWorkDetailData,
  addWorkData,
  getEditworkData,
  editWorkData,
  deleteWorkData,
};
