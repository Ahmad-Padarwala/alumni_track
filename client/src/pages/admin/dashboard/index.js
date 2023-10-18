import React from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import "../../../assets/css/admin/Layout.css";
import Dashboard from "./Dashboard";

const index = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Dashboard/>
      <Footer />
    </>
  );
};

export default index;
