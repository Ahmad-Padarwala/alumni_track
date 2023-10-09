import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PORT from "../../assets/constant/Url";
import { NavLink, useNavigate } from "react-router-dom";

const Forms = () => {
  const [addOrganization, setAddOrganization] = useState([]);
  const [activeForm, setActiveForm] = useState("login");
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
  const toggleForm = () => {
    setActiveForm((prevActiveForm) => {
      return prevActiveForm === "login" ? "signup" : "login";
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //CREATE ORG ACCOUNT
  const handleChangeCreate = (event) => {
    const { name, value } = event.target;
    setAddOrganization((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const addOrganizationData = (e) => {
    e.preventDefault();
    //FOR EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (addOrganization.email === "") {
      document.getElementById("emailErrInsignup").innerHTML =
        "**Please fill the email";
      return false;
    }
    if (!emailRegex.test(addOrganization.email)) {
      document.getElementById("emailErrInsignup").innerHTML =
        "**Invalid email format";
      return false;
    }
    document.getElementById("emailErrInsignup").innerHTML = "";
    //FOR PASSWORD VALIDATION
    if (addOrganization.password === "") {
      document.getElementById("passwordErrInSignup").innerHTML =
        "**Please fill the password";
      return false;
    }
    if (addOrganization.password.length <= 6) {
      document.getElementById("passwordErrInSignup").innerHTML =
        "**password length is more then 5";
      return false;
    }
    document.getElementById("passwordErrInSignup").innerHTML = "";
    axios
      .post(`${PORT}organization-master`, addOrganization)
      .then(() => {
        const form = e.target;
        form.reset();
        navigate("/create-organization");
      })
      .catch(() => {
        toast.warning("Enter All Details");
      });
  };

  // LOGIN USER  DATA SECTION
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

      <div className="container-fluid org_main_form_section py-3">
        <div className="row">
          <h1 className="text-center ">Create Your Organization Account</h1>
          <div className="form_main py-2 px-2 rounded mx-auto">
            <div className="rounded p-3">
              {activeForm === "login" ? (
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
                      className="password_icon"
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
                  <p className="text-center">
                    Are You Sure?
                    <NavLink
                      to=""
                      className="text-primary ms-1"
                      onClick={() => {
                        toggleForm();
                      }}
                    >
                      Create Account
                    </NavLink>
                  </p>
                </form>
              ) : (
                <form method="post" onSubmit={addOrganizationData}>
                  <div className="form-group mb-3">
                    <label htmlFor="orgEmail" className="fw-semibold">
                      Email:-
                    </label>
                    <input
                      type="email"
                      className="form-control mt-1"
                      id="orgEmail"
                      placeholder="Enter Your Email Address"
                      onChange={handleChangeCreate}
                      name="email"
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
                      onChange={handleChangeCreate}
                      name="password"
                    />
                    <span
                      className="password_icon"
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
                      Create Account
                    </button>
                  </div>
                  <p className="text-center">
                    Are You Sure?
                    <NavLink
                      to=""
                      className="text-primary ms-1"
                      onClick={() => {
                        toggleForm();
                      }}
                    >
                      Login Account
                    </NavLink>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
