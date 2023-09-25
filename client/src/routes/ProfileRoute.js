import React from 'react';
import Profile from '../pages/profile'
import { Routes, Route } from "react-router-dom";

const ProfileRoute = () => {
  return (
    <>
       <Routes>
        <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
      </Routes>
    </>
  )
}

export default ProfileRoute
