import React from "react";
import Navbar from "../layout/Navbar";
import HeroSection from "./HeroSection";
import Form from "./Form";
import Footer from "../layout/Footer";

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
