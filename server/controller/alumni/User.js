const connection = require("../../db/Connection");

// GET USER DATA

const getUser = (req, res) => {
  let uname = req.query.uname;
  const sql = `SELECT * FROM user WHERE uname='${uname}'`;
  console.log(sql);
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from bg_blog_user Table in server.js" + error
      );
    }
    return res.json(result);
  });
};

module.exports = { getUser };
