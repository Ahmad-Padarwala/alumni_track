import React from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import User from "./User";
import "../../../assets/css/admin/Layout.css";
const index = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <User />
      <Footer />
    </>
  );
};

export default index;
