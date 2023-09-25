import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../../pages/admin/layout/LoginForm";

const LoginRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="admin"
          element={
            <>
              <LoginForm />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default LoginRoute;
