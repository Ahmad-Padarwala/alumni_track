import React, { useState, useEffect } from "react";
import axios from "axios";
import PORT from "../../assets/constant/Url";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, NavLink } from "react-router-dom";

const Form = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [addSignUpData, setAddSignUpData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [addLoginData, setAddLoginData] = useState({
    email: "",
    password: "",
  });
  const [getSignUpdata, stGetSignUpData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setActiveForm((prevActiveForm) => {
      return prevActiveForm === "login" ? "signup" : "login";
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // SIGNUP USER  DATA SECTION
  const handleSignUpDataChange = (event) => {
    const { name, value } = event.target;
    setAddSignUpData((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const saveSignUpData = (e) => {
    e.preventDefault();
    //FOR EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (addSignUpData.email === "") {
      document.getElementById("emailErrInsignup").innerHTML =
        "**Please fill the email";
      return false;
    }
    if (!emailRegex.test(addSignUpData.email)) {
      document.getElementById("emailErrInsignup").innerHTML =
        "**Invalid email format";
      return false;
    }
    document.getElementById("emailErrInsignup").innerHTML = "";
    //FOR PASSWORD VALIDATION
    if (addSignUpData.password === "") {
      document.getElementById("passwordErrInSignup").innerHTML =
        "**Please fill the password";
      return false;
    }
    if (addSignUpData.password.length <= 6) {
      document.getElementById("passwordErrInSignup").innerHTML =
        "**password length is more then 5";
      return false;
    }
    document.getElementById("passwordErrInSignup").innerHTML = "";
    if (addSignUpData.username === "") {
      document.getElementById("usernameErrInSignup").innerHTML =
        "**Please fill the first name";
      return false;
    }
    if (
      addSignUpData.username.length < 3 ||
      addSignUpData.username.length > 20
    ) {
      document.getElementById("usernameErrInSignup").innerHTML =
        "**name length must be between 3 and 20";
      return false;
    }

    if (!isNaN(addSignUpData.username)) {
      document.getElementById("usernameErrInSignup").innerHTML =
        "**Do not allow numbers";
      return false;
    }
    document.getElementById("usernameErrInSignup").innerHTML = "";
    axios
      .post(`${PORT}alumni-master`, addSignUpData)
      .then(() => {
        navigate("/user-profile");
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
    //FOR EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (addLoginData.email === "") {
      document.getElementById("emailErr").innerHTML = "**Please fill the email";
      return false;
    }
    if (!emailRegex.test(addLoginData.email)) {
      document.getElementById("emailErr").innerHTML = "**Invalid email format";
      return false;
    }
    document.getElementById("emailErr").innerHTML = "";

    //FOR PASSWORD VALIDATION
    if (addLoginData.password === "") {
      document.getElementById("passwordErr").innerHTML =
        "**Please fill the password";
      return false;
    }
    document.getElementById("passwordErr").innerHTML = "";

    const user = getSignUpdata.find(
      (user) =>
        user.email === addLoginData.email &&
        user.password === addLoginData.password
    );
    if (user) {
      localStorage.setItem("user", user.id);
      navigate("/user-profile");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.warning("please correct information");
    }
  };

  //GET SIGHNUP DATA FOR CHACKING LOGIN FORM
  const getdata = () => {
    axios
      .get(`${PORT}alumni-master`)
      .then((response) => {
        stGetSignUpData(response.data);
      })
      .catch((err) => {
        console.log(err, "error getting signup data in admin");
      });
  };

  useEffect(() => {
    getdata();
  }, []);

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
      <div className="container-fluid login_from_main">
        <div className="row">
          {activeForm === "login" ? (
            <form
              className="mt-5 shadow py-3 px-4 mb-5 rounded mx-auto form_main"
              method="post"
              onSubmit={saveLoginData}
            >
              <h2 className="form_title">Login</h2>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1" className="fw-semibold">
                  Email:-
                </label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleLoginDataChange}
                />
                <span className="text-danger font-bold" id="emailErr"></span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="fw-semibold">
                  Password:-
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
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
                <span className="text-danger font-bold" id="passwordErr"></span>
              </div>
              <button type="submit" className="btn btn-primary mb-1">
                Login
              </button>
              <p className="text-center mt-3">
                Not a member?
                <NavLink
                  to=""
                  className="text-primary ms-1"
                  onClick={() => {
                    toggleForm();
                  }}
                >
                  Sign Up
                </NavLink>
              </p>
            </form>
          ) : (
            <form
              className="mt-5 shadow py-3 px-4 mb-5 rounded mx-auto form_main"
              method="post"
              onSubmit={saveSignUpData}
            >
              <h2 className="form_title">Sign Up</h2>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputEmail1" className="fw-semibold">
                  Email:-
                </label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleSignUpDataChange}
                />
                <span
                  className="text-danger font-bold"
                  id="emailErrInsignup"
                ></span>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="fw-semibold">
                  Password:-
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleSignUpDataChange}
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
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1" className="fw-semibold">
                  User Name:-
                </label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="exampleInputText1"
                  name="username"
                  placeholder="Enter Name"
                  onChange={handleSignUpDataChange}
                />
                <span
                  className="text-danger font-bold"
                  id="usernameErrInSignup"
                ></span>
              </div>
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
              <p className="text-center">
                Are You Sure?
                <NavLink
                  to=""
                  className="text-primary ms-1"
                  onClick={() => {
                    toggleForm();
                  }}
                >
                  Login
                </NavLink>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
