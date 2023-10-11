import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateOrganization from "../pages/create-organization";

const CreateOrgRoute = () => {
  return (
    <Routes>
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
