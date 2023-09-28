const conn = require("../../db/Connection");

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

module.exports = { addAlumniProfile };
