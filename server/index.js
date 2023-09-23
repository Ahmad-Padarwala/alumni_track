const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

const Master = require("./route/alumni-master/MasterRoute");
app.use("/", Master);

app.listen(1006, () => {
  console.log("SERVER CREATED IN 1006");
});
