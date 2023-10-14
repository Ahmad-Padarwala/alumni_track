import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateOrganization from "../pages/create-organization";
import Orgnaization from "../pages/organization";
import AddOrganization from "../pages/add-organization";
import EditOrganization from "../pages/edit-organization";

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
      <Route
        path="/organization"
        element={
          <>
            <Orgnaization />
          </>
        }
      />
      <Route
        path="/add-organization"
        element={
          <>
            <AddOrganization />
          </>
        }
      />
      <Route
        path="/edit-organization"
        element={
          <>
            <EditOrganization />
          </>
        }
      />
    </Routes>
  );
};

export default CreateOrgRoute;
