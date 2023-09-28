import React from "react";
import Profile from "../pages/alumni-profile";
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
      </Routes>
    </>
  );
};

export default ProfileRoute;
