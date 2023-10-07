import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              <i className="fa-solid fa-grip"></i>
              DashBoard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">
              <i className="fa-solid fa-grip"></i>
              Alumni Member
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
