import React from "react";
import Navbar from "../layout/Navbar";
import HeroSection from "./HeroSection";
import Form from "./Form";
import Footer from "../layout/Footer";
// import "../../assets/css/Profile.css";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Form />
      <Footer />
    </>
  );
};

export default index;
