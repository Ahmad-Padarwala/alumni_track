const connection = require("../../db/Connection");
//GET DATA
const getAlumniMaster = (req, res) => {
  const sql = "SELECT * FROM alumni_master";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from alumi_master Table in server.js" + error
      );
    }
    return res.json(result);
  });
};

//ADD SIGNUP FORM DATA SECTION

const addSignUpData = (req, res) => {
  const { email, password, username } = req.body;
  const sql =
    "INSERT INTO alumni_master (email,password,username) VALUES (?,?,?)";
  const data = [email, password, username];
  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      console.log("Records added: " + result.affectedRows);
      res.sendStatus(200);
    }
  });
};

//ADD LOGIN FORM DATA SECTION
const addLoginData = (req, res) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO alumni_master (email,password) VALUES (?,?)";
  const data = [email, password];
  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      console.log("Records added: " + result.affectedRows);
      res.sendStatus(200);
    }
  });
};

module.exports = { getAlumniMaster, addSignUpData, addLoginData };
