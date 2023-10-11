const conn = require("../../db/Connection");

//get alumni profile with user_id
const getAlumniProfileWithId = async (req, res) => {
  const user_id = req.params.id;
  const sql = `SELECT * FROM alumni_profile WHERE user_id=?`;
  const data = [user_id];
  conn.query(sql, data, (err, result) => {
    if (err) {
      console.error("Error getting record:", err);
      res.status(500).json({ error: "Error getting record" });
    } else {
      res.status(200).json(result);
    }
  });
};

// add alumni member profile
const addAlumniProfile = async (req, res) => {
  let profile_picture = "";
  let cover_background = "";

  if (req.files && req.files.profile_picture) {
    profile_picture = req.files.profile_picture[0].filename;
  }
  if (req.files && req.files.cover_background) {
    cover_background = req.files.cover_background[0].filename;
  }

  const { user_id, contact, address, dob, gender } = req.body;
  conn.query(
    "INSERT INTO alumni_profile SET ? ",
    {
      user_id,
      profile_picture: profile_picture,
      cover_background: cover_background,
      phone_number: contact,
      address: address,
      dob: dob,
      gender: gender,
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

//edit elumni profile data
const editAlumniProfile = (req, res) => {
  const user_id = req.params.id;
  let profile_picture = "";
  let cover_background = "";

  if (req.files && req.files.profile_picture) {
    profile_picture = req.files.profile_picture[0].filename;
  }

  if (req.files && req.files.cover_background) {
    cover_background = req.files.cover_background[0].filename;
  }

  const { phone_number, address, dob, gender } = req.body;

  let sql = "UPDATE alumni_profile SET ";
  const values = [];

  if (profile_picture) {
    sql += "profile_picture = ?, ";
    values.push(profile_picture);
  }

  if (cover_background) {
    sql += "cover_background = ?, ";
    values.push(cover_background);
  }

  sql += "phone_number = ?, address = ?, dob = ?, gender = ? WHERE user_id = ?";
  values.push(phone_number, address, dob, gender, user_id);

  conn.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error updating profile" });
    }

    return res.status(200).json({ success: true });
  });
};

module.exports = {
  addAlumniProfile,
  getAlumniProfileWithId,
  editAlumniProfile,
};
