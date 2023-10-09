import React from "react";
import Navbar from "../layout/Navbar";
import HeroSection from "./HeroSection";
// import Forms from "./Forms";
import Footer from "../layout/Footer";
import "../../assets/css/Organization.css";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* <Forms /> */}
      <Footer />
    </>
  );
};

export default index;
