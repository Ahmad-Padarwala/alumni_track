import React from "react";
import HomeRoute from "./routes/HomeRoute";
import ProfileRoute from "./routes/ProfileRoute";
import CreateOrgRoute from "./routes/CreateOrgRoute";
import DashRoute from "./routes/admin/DashRoute";
import PostRoute from "./routes/PostRoute";

const App = () => {
  return (
    <>
      <HomeRoute />
      <ProfileRoute />
      <CreateOrgRoute />
      <DashRoute />
      <PostRoute />
    </>
  );
};

export default App;
