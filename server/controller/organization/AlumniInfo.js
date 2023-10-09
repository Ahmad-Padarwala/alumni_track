const connection = require("../../db/Connection");

const addAlumniInfo = async (req, res) => {
  const org_id = req.params.id;
  const { org_name, org_logo, org_description, address, website } = req.body;
  const sql =
    "INSERT INTO organization_info (org_id, org_name, org_logo, org_description,address, website) VALUES (?,?,?,?,?,?)";
  const data = [org_id, org_name, org_logo, org_description, address, website];
  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = { addAlumniInfo };
