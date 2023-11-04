import React from "react";
import Dashboard from "../../pages/admin/dashboard";
import UsersReq from "../../pages/admin/users-req";
import ActiveUser from "../../pages/admin/active-user";
import { Routes, Route } from "react-router-dom";

const DashRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <>
              <Dashboard />
            </>
          }
        />
        <Route
          path="/user-request"
          element={
            <>
              <UsersReq />
            </>
          }
        />
        <Route
          path="/active-user"
          element={
            <>
              <ActiveUser />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default DashRoute;
