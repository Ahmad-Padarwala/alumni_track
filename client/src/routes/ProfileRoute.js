import React from "react";
import Profile from "../pages/alumni-profile";
import ViewProfile from "../pages/view-alumni-profile";
import { Routes, Route } from "react-router-dom";

const ProfileRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/user-profile"
          element={
            <>
              <Profile />
            </>
          }
        />
        <Route
          path="/view-profile/:username"
          element={
            <>
              <ViewProfile />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default ProfileRoute;
