const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const user_route = require("./route/user/User");
const Master_Route = require("./route/alumni-master/MasterRoute");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

const Master = require("./route/alumni-master/MasterRoute");
app.use("/", Master);

app.use("/", user_route);
app.use("/", Master_Route);

app.listen(1006, () => {
  console.log("SERVER CREATED IN 1006");
});
