import React from "react";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import Dashboard from "./Dashboard";
import "../../../assets/css/admin/admin.css";

const index = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Dashboard />
    </>
  );
};

export default index;
