import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../../pages/admin/signup";

const SignUpRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="signup"
          element={
            <>
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default SignUpRoute;
