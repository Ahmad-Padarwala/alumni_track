const connection = require("../../db/Connection");

//add org data
const addOrgInfo = async (req, res) => {
  const user_id = req.params.id;
  let org_logo = "";
  if (req.files && req.files.org_logo) {
    org_logo = req.files.org_logo[0].filename;
  }
  let org_bg = "";
  if (req.files && req.files.org_bg) {
    org_bg = req.files.org_bg[0].filename;
  }

  const { org_name, address, website } = req.body;
  connection.query(
    "INSERT INTO organization_info SET ? ",
    {
      user_id,
      org_name: org_name,
      org_logo: org_logo,
      org_bg: org_bg,
      org_shortdesc: "",
      org_longdesc: "",
      address: address,
      address: address,
      website: website,
      status: 1,
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

//edit org description
const addOrgDescription = async (req, res) => {
  const id = req.params.id;
  const { org_shortdesc, org_longdesc } = req.body;
  const sql = `UPDATE organization_info SET org_shortdesc=?, org_longdesc=? WHERE id=?`;
  const data = [org_shortdesc, org_longdesc, id];
  connection.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error add desc Data from organization_info Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//get org data with userId
const getOrganizationWithId = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM organization_info WHERE user_id=? AND status=1`;
  const data = [id];
  connection.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from organization_info Table with id in server.js" +
          error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//get all org data
const getOrganizationsData = async (req, res) => {
  const sql = "SELECT * FROM organization_info WHERE status=1";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from organization_info Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//get org data for edit with id
const getOrganizationEdit = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM organization_info WHERE id=?`;
  const data = [id];
  connection.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from organization_info Table with id in server.js" +
          error
      );
    } else {
      res.status(200).json(result);
    }
  });
};
//edit org data
const EditOrganization = (req, res) => {
  const id = req.params.id;
  let org_logo = "";
  let org_bg = "";

  if (req.files && req.files.org_logo) {
    org_logo = req.files.org_logo[0].filename;
  }

  if (req.files && req.files.org_bg) {
    org_bg = req.files.org_bg[0].filename;
  }

  const { org_name, org_shortdesc, org_longdesc, address, website } = req.body;

  let sql = "UPDATE organization_info SET ";
  const values = [];

  if (org_logo) {
    sql += "org_logo = ?, ";
    values.push(org_logo);
  }

  if (org_bg) {
    sql += "org_bg = ?, ";
    values.push(org_bg);
  }

  sql +=
    "org_name = ?, org_shortdesc = ?, org_longdesc = ?, address = ?, website = ? WHERE id = ?";
  values.push(org_name, org_shortdesc, org_longdesc, address, website, id);

  connection.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error updating organization" });
    }

    return res.status(200).json({ success: true });
  });
};

//delet org account
const deleteOrgAccount = async (req, res) => {
  const org_id = req.params.id;
  const sql = `UPDATE organization_info SET status=0 WHERE id=?`;
  connection.query(sql, org_id, (error, result) => {
    if (error) {
      console.log(
        "Error add desc Data from organization_info Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  addOrgInfo,
  getOrganizationWithId,
  getOrganizationsData,
  addOrgDescription,
  EditOrganization,
  deleteOrgAccount,
  getOrganizationEdit,
};
