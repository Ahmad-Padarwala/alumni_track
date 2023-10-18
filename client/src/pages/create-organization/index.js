import React from "react";
import Navbar from "../layout/Navbar";
import CreateOrg from "./CreateOrg";
import "../../assets/css/Organization.css";

const index = () => {
  return (
    <>
      <Navbar />
      <CreateOrg />
    </>
  );
};

export default index;
