import React from "react";
import Navbar from "../layout/Navbar";
import CreateOrg from "./CreateOrg";
import Footer from "../layout/Footer";
import "../../assets/css/Organization.css";

const index = () => {
  return (
    <>
      <Navbar />
      <CreateOrg />
      <Footer />
    </>
  );
};

export default index;
