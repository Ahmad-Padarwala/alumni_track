import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/admin/dashboard";

const DashRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default DashRoute;
