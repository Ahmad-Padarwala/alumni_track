import React from "react";
import Navbar from "../layout/Navbar";
import EditOrganization from "./EditOrganization";
import Footer from "../layout/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <EditOrganization />
      <Footer />
    </>
  );
};

export default index;
