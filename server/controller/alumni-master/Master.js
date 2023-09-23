const connection = require("../../db/Connection");

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

module.exports = { getAlumniMaster };
