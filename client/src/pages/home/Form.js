import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [addLoginData, setAddLoginData] = useState({
    email: "",
    password: "",
  });
  const [addSignUpData, setAddSignUpData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const [getSignUpdata, setGetSignUpData] = useState([]);
  const [formType, setFormType] = useState("login");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const isAuth = localStorage.getItem("user");

  const toggleFormType = () => {
    console.log("hii");
    if (formType == "login") {
      console.log("object");
      setFormType("sign-up");
    } else {
      console.log("object22");
      setFormType("login");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //login user
  const handleLoginDataChange = (event) => {
    const { name, value } = event.target;
    setAddLoginData((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const saveLoginData = (e) => {
    e.preventDefault();
    const user = getSignUpdata.find(
      (user) =>
        user.email === addLoginData.email &&
        user.password === addLoginData.password
    );
    if (user) {
      console.log("object");
      if (user.status === 0) {
        toast.error("Now you are disabled, please stay with us.");
      } else {
        localStorage.setItem("user", user.id);
        navigate("/post");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast.warning("please correct information");
    }
  };

  // SIGNUP USER  DATA SECTION
  const handleSignUpDataChange = (event) => {
    const { name, value } = event.target;
    setAddSignUpData((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const errors = {};

    if (!addSignUpData.email) {
      errors.email = "Please fill in your email.";
    } else if (!isValidEmail(addSignUpData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!addSignUpData.password) {
      errors.password = "Please fill in your password.";
    } else if (addSignUpData.password.length < 7) {
      errors.password = "Password must be at least 7 characters long.";
    }

    if (!addSignUpData.username) {
      errors.username = "Please fill in your username.";
    } else if (
      addSignUpData.username.length < 3 ||
      addSignUpData.username.length > 20
    ) {
      errors.username = "Username must be between 3 and 20 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const saveSignUpData = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the form errors.");
      return;
    }

    const userExists = getSignUpdata.some(
      (user) => user.email === addSignUpData.email
    );

    if (userExists) {
      toast.warning("User with this email already exists.");
      return;
    }

    axios
      .post(`${PORT}alumni-master`, addSignUpData)
      .then(() => {
        toast.success("Your Account is Created!");
        toast.success("Now you are not able to use plaese stay with us!");
        setFormType("login");
      })
      .catch(() => {
        toast.warning("Enter All Details");
      });
  };

  //sign up user
  const getdata = () => {
    axios
      .get(`${PORT}alumni-master`)
      .then((response) => {
        setGetSignUpData(response.data);
      })
      .catch((err) => {
        console.log(err, "error getting signup data in admin");
      });
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      navigate("/post");
    }
    getdata();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container-fluid home_form_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 home_form_right">
              <NavLink to="/">
                <img
                  src={require("../../assets/image/Logo.png")}
                  alt=""
                  width="100px"
                />
              </NavLink>
              <div className="text-white form_right_side">
                <h2>Manage your professional identity</h2>
                <p>
                  Photoshpo delivers a comprehensive environment for
                  professional designers and graphics producers to create
                  sophisticated images for print, the web, wireless devices and
                  other media.
                </p>
              </div>
            </div>
            <div className="col-lg-6 bg-white">
              <div className="login_form">
                {formType === "sign-up" && (
                  <div className="form_left_side mx-auto">
                    <h2>Sign Up</h2>
                    <p>Be greate at what you do, get started it`s free.</p>
                    <form>
                      <div className="mb-3">
                        <TextField
                          id="signEmail"
                          label="Email"
                          variant="standard"
                          name="email"
                          onChange={handleSignUpDataChange}
                          error={formErrors.email ? true : false}
                          helperText={formErrors.email}
                        />
                      </div>
                      <div className="mb-3 position-relative">
                        <TextField
                          id="signPass"
                          label="Password"
                          variant="standard"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleSignUpDataChange}
                          error={formErrors.password ? true : false}
                          helperText={formErrors.password}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="view-password-button"
                        >
                          {showPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i className="fa-solid fa-eye"></i>
                          )}
                        </span>
                      </div>
                      <div className="mb-3">
                        <TextField
                          id="signUser"
                          label="User Name"
                          variant="standard"
                          name="username"
                          onChange={handleSignUpDataChange}
                          error={formErrors.username ? true : false}
                          helperText={formErrors.username}
                        />
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={saveSignUpData}
                          className="btn btn-primary"
                        >
                          SIGN UP
                        </button>
                      </div>
                      <div className="mt-3">
                        <p>
                          Already a member ?{" "}
                          <NavLink to="/" onClick={toggleFormType}>
                            Login
                          </NavLink>
                        </p>
                      </div>
                    </form>
                  </div>
                )}
                {formType === "login" && (
                  <div className="form_left_side mx-auto">
                    <h2>Login</h2>
                    <p>Be greate at what you do, get started it`s free.</p>
                    <form method="post" onSubmit={saveLoginData}>
                      <div className="mb-3">
                        <TextField
                          id="loginEmail"
                          label="Email"
                          variant="standard"
                          name="email"
                          onChange={handleLoginDataChange}
                        />
                      </div>
                      <div className="mb-3 position-relative">
                        <TextField
                          id="loginPass"
                          label="Password"
                          variant="standard"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleLoginDataChange}
                        />
                        <span
                          onClick={togglePasswordVisibility}
                          className="view-password-button"
                        >
                          {showPassword ? (
                            <i className="fa-solid fa-eye-slash"></i>
                          ) : (
                            <i className="fa-solid fa-eye"></i>
                          )}
                        </span>
                      </div>
                      <div className="mt-2">
                        <button type="submit" className="btn btn-primary">
                          LOGIN
                        </button>
                      </div>
                      <div className="mt-3">
                        <p>
                          Not a member ?{" "}
                          <NavLink to="/" onClick={toggleFormType}>
                            Sign Up
                          </NavLink>
                        </p>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
