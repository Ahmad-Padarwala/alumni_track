import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright
          <strong>
            <span>Alumni Track</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by
          <NavLink to="https://valudas.com/" target="_blank">
            Valudas Team
          </NavLink>
        </div>
      </footer>

      <NavLink
        to="/admin"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </NavLink>
    </>
  );
};

export default Footer;
