import React from "react";
import { Routes, Route } from "react-router-dom";
import Organization from "../pages/organization";
import CreateOrganization from "../pages/create-organization";

const CreateOrgRoute = () => {
  return (
    <Routes>
      <Route
        path="/organization"
        element={
          <>
            <Organization />
          </>
        }
      />
      <Route
        path="/create-organization"
        element={
          <>
            <CreateOrganization />
          </>
        }
      />
    </Routes>
  );
};

export default CreateOrgRoute;
