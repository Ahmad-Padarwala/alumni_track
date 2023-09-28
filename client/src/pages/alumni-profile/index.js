import React from "react";
import Navbar from "../layout/Navbar";
import Profile from "./Profile";
import Footer from "../layout/Footer";
import "../../assets/css/Profile.css";

const index = () => {
  return (
    <>
      <Navbar />
      <Profile />
      <Footer />
    </>
  );
};

export default index;
