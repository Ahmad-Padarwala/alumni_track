import React from "react";
import HomeRoute from "./routes/HomeRoute";
import ProfileRoute from "./routes/ProfileRoute";
import LoginRoute from "./routes/admin/LoginRoute";
import DashRoute from "./routes/admin/DashRoute";
import SignUpRoute from "./routes/admin/SignUpRoute";
import CreateOrgRoute from "./routes/CreateOrgRoute";

const App = () => {
  return (
    <>
      <HomeRoute />
      <ProfileRoute />
      <LoginRoute />
      <DashRoute />
      <SignUpRoute />
      <CreateOrgRoute />
    </>
  );
};

export default App;
