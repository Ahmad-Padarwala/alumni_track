const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const user_route = require("./route/alumni/User");
const Master_Route = require("./route/alumni/MasterRoute");
const AlumniProRoute = require("./route/alumni/AlumniProRoute");
const EducaRoute = require("./route/alumni/EducaRourte");
const SkillRuote = require("./route/alumni/SkillRoute");
const OrgMaster = require("./route/organization/MasterRoute");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", user_route);
app.use("/", Master_Route);
app.use("/", AlumniProRoute);
app.use("/", EducaRoute);
app.use("/", SkillRuote);
app.use("/", OrgMaster);

app.listen(1010, () => {
  console.log("SERVER CREATED IN 1010");
});
