import React from "react";
import HomeRoute from "./routes/HomeRoute";
import ProfileRoute from "./routes/ProfileRoute";
import LoginRoute from "./routes/admin/LoginRoute";
import DashRoute from "./routes/admin/DashRoute";
import SignUpRoute from "./routes/admin/SignUpRoute";

const App = () => {
  return (
    <>
      <HomeRoute />
      <ProfileRoute />
      <LoginRoute />
      <DashRoute />
      <SignUpRoute />
    </>
  );
};

export default App;
