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
//GET alumni master with id
const getAlumniMasterDataWithId = (req, res) => {
  const user_id = req.params.id;
  const sql = `SELECT * FROM alumni_master WHERE id=?`;
  const data = [user_id];
  connection.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from alumni_education Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//ADD SIGNUP FORM DATA SECTION
const addSignUpData = (req, res) => {
  const { email, password, username } = req.body;
  const sql =
    "INSERT INTO alumni_master (email,password,username,status) VALUES (?,?,?,1)";
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

module.exports = {
  getAlumniMaster,
  getAlumniMasterDataWithId,
  addSignUpData,
};
