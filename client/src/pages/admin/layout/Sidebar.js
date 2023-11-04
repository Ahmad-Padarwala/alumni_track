import React from "react";
import { NavLink } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Sidebar = () => {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin">
              <i>
                <GridViewRoundedIcon />
              </i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-heading">Pages</li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed" to="/user-request">
              <i>
                <SchoolRoundedIcon />
              </i>
              <span>Users Request</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link collapsed" to="/active-user">
              <i>
                <ApartmentIcon />
              </i>
              <span>Active Users</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              to="/admin"
            >
              <i>
                <RequestPageIcon />
              </i>
              <span>Requests</span>
              <i className="bi-chevron-down ms-auto">
                <KeyboardArrowDownIcon />
              </i>
            </NavLink>
            <ul
              id="components-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <NavLink to="/admin">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span>School/College</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin">
                  <i className="fa-solid fa-building"></i>
                  <span>Companies</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
