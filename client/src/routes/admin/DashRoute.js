import React from "react";
import Dashboard from "../../pages/admin/dashboard";
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
      </Routes>
    </>
  );
};

export default DashRoute;
