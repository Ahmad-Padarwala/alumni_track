import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PORT from "../../assets/constant/Url";
import { NavLink, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [getOrgdata, setGetOrgData] = useState([]);
  const [addLoginData, setAddLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getdata();
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // LOGIN USER DATA SECTION
  const handleLoginDataChange = (event) => {
    const { name, value } = event.target;
    setAddLoginData((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const saveLoginData = (e) => {
    e.preventDefault();
    const organization = getOrgdata.find(
      (organization) =>
        organization.email === addLoginData.email &&
        organization.password === addLoginData.password
    );
    if (organization) {
      localStorage.setItem("organization", organization.id);
      navigate("/create-organization");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.warning("please correct information");
    }
  };

  //GET SIGHN UP DATA FOR CHACKING LOGIN FORM
  const getdata = () => {
    axios
      .get(`${PORT}organization-master`)
      .then((response) => {
        setGetOrgData(response.data);
      })
      .catch((err) => {
        console.log(err, "error getting signup data in admin");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container-fluid Hero_Main">
        <div className="container Hero_Main">
          <div className="row">
            <div className="col-lg-7">
              <div className="hero_text">
                <p className="hero_Header">track your alumni member here</p>
                <p className="hero_detail">
                  Let’s get started with a few details about your educational
                  institute. After creating the page, you can request to get
                  additional education features like the Alumni tool.
                </p>
              </div>
            </div>
            <div className="col-lg-5 p-5">
              <div className="org_main_form_section rounded px-3 py-5">
                <h3 className="text-center">Login Organization</h3>
                <form method="post" onSubmit={saveLoginData}>
                  <div className="form-group mb-3">
                    <label htmlFor="orgEmail" className="fw-semibold">
                      Email:-
                    </label>
                    <input
                      type="email"
                      className="form-control mt-1"
                      id="orgEmail"
                      placeholder="Enter Your Email Address"
                      name="email"
                      onChange={handleLoginDataChange}
                    />
                    <span
                      className="text-danger font-bold"
                      id="emailErrInsignup"
                    ></span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="orgPassword" className="fw-semibold">
                      Password:-
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control mt-1"
                      id="orgPassword"
                      placeholder="Enter Password"
                      name="password"
                      onChange={handleLoginDataChange}
                    />
                    <span
                      className="password_icon ms-5 ps-3"
                      style={{ cursor: "pointer" }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </span>
                    <span
                      className="text-danger font-bold"
                      id="passwordErrInSignup"
                    ></span>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary relative">
                      Login Account
                    </button>
                  </div>
                  <div className="text-black float-start mx-auto mt-2">
                    Not a remenber?
                    <NavLink to="/create-organization" className="ms-2">
                      Sign Up
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
