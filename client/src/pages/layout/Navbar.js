import React from "react";
import "../../assets/css/Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="shadow hight-auto">
        <nav className="navbar navbar-expand-lg  ">
          <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">
              <img
                className="navbar_logo"
                src={require("../../assets/image/full_logo.png")}
                width="200px"
                alt="logo"
              />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav  navbar_ul_li md-ms-5 justify-content-center">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Features
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Pricing
                  </NavLink>
                </li>
                <li className="nav-item navbar_main_btn">
                  <button className="navbar_btn">log in</button>
                  <button className="navbar_btn ms-2">Sign up</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
