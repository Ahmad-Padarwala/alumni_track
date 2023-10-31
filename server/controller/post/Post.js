const connection = require("../../db/Connection");

//add post data
const addPostData = async (req, res) => {
  const user_id = req.params.id;
  let post_image = "";
  console.log(req.files);
  if (req.files && req.files.post_image) {
    post_image = req.files.post_image[0].filename;
    console.log("in if post_image");
  }
  const post_date = new Date().toISOString().slice(0, 19).replace("T", " ");
  const { post_title } = req.body;

  connection.query(
    "INSERT INTO user_post SET ? ",
    {
      user_id,
      post_title: post_title,
      post_image: post_image,
      post_date: post_date,
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error adding post data");
      } else {
        res.send(result);
        console.log("result", result);
      }
    }
  );
};

//get all post data
const getPostData = (req, res) => {
  const sql = `SELECT * FROM user_post ORDER BY id DESC`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from user_post Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//get alumni post data for edit with id
const getPostDataWithId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM user_post WHERE id=?`;
  const data = [id];
  connection.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from user_post Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

//edit user post data
const editUserPostData = async (req, res) => {
  const id = req.params.id;
  const { post_title } = req.body;
  let post_image = null;

  if (req.files && req.files.post_image) {
    post_image = req.files.post_image[0].filename;
  }

  let sql = "UPDATE user_post SET post_title = ?, post_image = ? WHERE id = ?";

  connection.query(sql, [post_title, post_image, id], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error updating user post" });
    }

    return res.status(200).json({ success: true });
  });
};

//delete post data section start

const deletePostData = (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM user_post WHERE id=${id}`;
  connection.query(sql, (error) => {
    if (error) {
      console.log("Error Delte Data in server.js" + error);
    }
    res.sendStatus(200);
  });
};

//get alumni profile data
const getAllAlumniProfile = (req, res) => {
  const sql = `SELECT * FROM alumni_profile `;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from user_post Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

const getUserPostDataWithId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM user_post WHERE user_id=? ORDER BY id DESC`;
  const data = [id];
  connection.query(sql, data, (error, result) => {
    if (error) {
      console.log(
        "Error Getting Data from user_post Table in server.js" + error
      );
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = {
  addPostData,
  getPostData,
  getPostDataWithId,
  editUserPostData,
  deletePostData,
  getAllAlumniProfile,
  getUserPostDataWithId,
};
