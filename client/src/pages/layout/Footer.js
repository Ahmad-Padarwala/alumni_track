import React from "react";
import "../../assets/css/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer_main">
        <footer className=" text-white py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-6">
                <img
                  className="footer_logo"
                  src={require("../../assets/image/Logo.png")}
                  width="100px"
                  alt="logo"
                />
              </div>
              <div className="col-lg-3 col-6 ps-5">
                <h4>
                  <b>Features</b>
                </h4>
                <ul className="list-unstyled footer_text ">
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2  footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-6 ps-5">
                <h4>
                  <b>Resources</b>
                </h4>
                <ul className="list-unstyled footer_text">
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links">Cool stuff</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links"> Cool stuff </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-6 ps-5">
                <h4>
                  <b>Contact</b>
                </h4>
                <ul className="list-unstyled footer_text">
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links">Cool stuff</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links">Cool stuff</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links">Cool stuff</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="text-muted">
                      <i className="fa-solid fa-caret-right"></i>
                      <span className="ms-2 footer_links">Cool stuff</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </footer>
    </>
  );
};

export default Footer;
