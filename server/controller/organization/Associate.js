const connection = require("../../db/Connection");

//send req for alumni
const sendReqAlumni = async (req, res) => {
  const userId = req.params.userId;
  const orgId = req.params.orgId;
  const requestDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql =
    "INSERT INTO alumni_associate (user_id, org_id, request_date, join_date, status) VALUES (?, ?, ?, 0, 0)";
  const data = [userId, orgId, requestDate];

  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error adding record:", err);
      res.status(500).json({ error: "Error adding record" });
    } else {
      res.sendStatus(200);
    }
  });
};

//get requested alumni
const getRequestedAlumni = async (req, res) => {
  const org_id = req.params.id;
  const sql = `SELECT * FROM alumni_associate WHERE org_id=?`;
  const data = [org_id];
  connection.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from alumni_associate Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = { sendReqAlumni,getRequestedAlumni };
