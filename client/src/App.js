import React from "react";
import HomeRoute from "./routes/HomeRoute";
import ProfileRoute from "./routes/ProfileRoute";
import CreateOrgRoute from "./routes/CreateOrgRoute";

const App = () => {
  return (
    <>
      <HomeRoute />
      <ProfileRoute />
      <CreateOrgRoute />
    </>
  );
};

export default App;
