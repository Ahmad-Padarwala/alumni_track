import React from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Footer from "../layout/Footer";
import Users from "./Users";
import "../../../assets/css/admin/Layout.css";
const index = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Users />
      <Footer />
    </>
  );
};

export default index;
