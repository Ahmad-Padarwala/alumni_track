const connection = require("../../db/Connection");

//GET ALL ORGANIZATION DATA
const getOrgMaster = (req, res) => {
  const sql = "SELECT * FROM organization_master";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from organization_master Table in server.js" + error
      );
    }
    return res.json(result);
  });
};

//ADD ORGANIZATION DATA
const addcreateOrgData = (req, res) => {
  const { email, password } = req.body;
  const sql =
    "INSERT INTO organization_master (email,password,status) VALUES (?,?,1)";
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

module.exports = {
  addcreateOrgData,
  getOrgMaster,
};
