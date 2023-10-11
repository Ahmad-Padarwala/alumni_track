const connection = require("../../db/Connection");

const addOrgInfo = async (req, res) => {
  const user_id = req.params.id;
  let org_logo = "";
  if (req.files && req.files.org_logo) {
    org_logo = req.files.org_logo[0].filename;
  }
  const { org_name, org_description, address, website } = req.body;
  const sql =
    "INSERT INTO organization_info (user_id, org_name, org_logo, org_description,address, website) VALUES (?,?,?,?,?,?)";
  const data = [user_id, org_name, org_logo, org_description, address, website];
  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = { addOrgInfo };
