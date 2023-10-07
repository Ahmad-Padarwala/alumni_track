const connection = require("../../db/Connection");
//GET DATA
const getOrganizationMaster = (req, res) => {
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

module.exports = {
  getOrganizationMaster,
};
