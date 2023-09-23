import React from "react";
import "../../assets/css/Navbar.css";

const Navbar = () => {
  return (
    <>
      <header className="shadow hight-auto">
      <nav class="navbar navbar-expand-lg  ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img className="navbar_logo" src={require('../../assets/image/full_logo.png')} width='200px' /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul class="navbar-nav  navbar_ul_li md-ms-5 justify-content-center">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              {/* <div className="navbar_main_btn "> */}
                <li className="nav-item navbar_main_btn">
                  <button className="navbar_btn ">log in</button>
                  <button className="navbar_btn  ms-2">Sign up</button>
                </li>
                {/* <li className="nav-item">
                  
                </li> */}
              {/* </div> */}
            </ul>
          </div>

        </div>
      </nav>
      </header>
    </>
  );
};

export default Navbar;
