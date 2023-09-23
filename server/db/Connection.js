const mysql = require("mysql");

const Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alumni",
});

Connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB CONNECTED");
  }
});

module.exports = Connection;
