import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <NavLink to="" className="logo d-flex align-items-center">
            <img
              src={require("../../../assets/image/footer_logo.png")}
              alt=""
            />
            <span className="d-none d-lg-block">Alumni</span>
          </NavLink>
        </div>
        {/* <!-- End Logo --> */}

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" action="">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="button" title="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        {/* <!-- End Search Bar --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <NavLink
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="/admin"
                data-bs-toggle="dropdown"
              >
                <img
                  src={require("../../../assets/image/profile-img.jpg")}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  A. Padarwala
                </span>{" "}
              </NavLink>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Ahmad Padarwala</h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink
                    className="dropdown-item d-flex align-items-center"
                    to="/admin"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
