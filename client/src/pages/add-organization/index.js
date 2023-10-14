import React from "react";
import Navbar from "../layout/Navbar";
import AddOrganization from "./AddOrganization";
import Footer from "../layout/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <AddOrganization />
      <Footer />
    </>
  );
};

export default index;
