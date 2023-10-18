import React from "react";
import HomeRoute from "./routes/HomeRoute";
import ProfileRoute from "./routes/ProfileRoute";
import CreateOrgRoute from "./routes/CreateOrgRoute";
import DashRoute from "./routes/admin/DashRoute";

const App = () => {
  return (
    <>
      <HomeRoute />
      <ProfileRoute />
      <CreateOrgRoute />
      <DashRoute />
    </>
  );
};

export default App;
