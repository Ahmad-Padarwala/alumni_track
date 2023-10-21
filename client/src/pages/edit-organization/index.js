import React from "react";
import Navbar from "../layout/Navbar";
import EditOrganization from "./EditOrganization";
import "../../assets/css/Organization.css";

const index = () => {
  return (
    <>
      <Navbar />
      <EditOrganization />
    </>
  );
};

export default index;
