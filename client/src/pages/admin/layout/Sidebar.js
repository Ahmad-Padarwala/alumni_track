import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LogOutModal from "./LogOutModal";
import "../../../assets/css/admin/style.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getUname = localStorage.getItem("unameData");
    if (!getUname) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("unameData");
    navigate("/admin");
  };
  return (
    <>
      <nav className="sidebar fixed-top bg-dark text-white left-0 h-100 py-4 px-3">
        <div className="fs-3 font-weight-bold ms-4">BLOGS</div>
        <div className="dashboard-links mt-5">
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-4 rounded-md ${
              location.pathname === "/dashboard"
            }  duration-300 d-flex align-items-center`}
          >
            <NavLink to="/dashboard" className="sidebar_names">
              <i className="fas fa-home"></i>
              <span className="mx-2">Dashboard</span>
            </NavLink>
          </div>
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-4 rounded-md ${
              location.pathname === "/blogcategory"
                ? "bg-primary"
                : "hover-bg-primary"
            } transition-colors duration-300 d-flex align-items-center`}
          >
            <NavLink to="/signup" className="sidebar_names">
              <i className="fas fa-layer-group"></i>
              <span className="mx-2">Sign Up</span>
            </NavLink>
          </div>
          <div
            className={`mb-2 cursor-pointer py-2 pl-3 pr-4 rounded-md ${
              location.pathname === "/allblogpost"
                ? "bg-primary"
                : "hover-bg-primary"
            } transition-colors duration-300 d-flex align-items-center`}
          >
            <NavLink to="/allblogpost" className="sidebar_names">
              <i className="fas fa-layer-group"></i>
              <span className="mx-2">Blog Post</span>
            </NavLink>
          </div>
          <div className="mb-2 cursor-pointer py-2 pl-3 pr-4 rounded-md transition-colors duration-300 d-flex align-items-center">
            <button
              type="button"
              onClick={handleLogoutClick}
              className="bg-primary px-3 py-2 rounded-2"
            >
              <i className="fas fa-sign-out-alt text-white"></i>
              <span className="mx-3 text-white">Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      <LogOutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar;
