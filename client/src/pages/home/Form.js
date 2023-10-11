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
        "**password length is more then 6";
      return false;
    }
    document.getElementById("passwordErrInSignup").innerHTML = "";
    if (addSignUpData.username === "") {
      document.getElementById("usernameErrInSignup").innerHTML =
        "**Please fill the user name";
      return false;
    }
    if (
      addSignUpData.username.length < 3 ||
      addSignUpData.username.length > 20
    ) {
      document.getElementById("usernameErrInSignup").innerHTML =
        "**user name length must be between 3 and 20";
      return false;
    }

    if (!isNaN(addSignUpData.username)) {
      document.getElementById("usernameErrInSignup").innerHTML =
        "**Do not allow numbers";
      return false;
    }
    document.getElementById("usernameErrInSignup").innerHTML = "";
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
        localStorage.setItem("user", addSignUpData.id);
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
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">
                  {activeForm === "login" ? "Login" : "Sign Up"}
                </h2>
                <form
                  onSubmit={
                    activeForm === "login" ? saveLoginData : saveSignUpData
                  }
                >
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={
                        activeForm === "login"
                          ? addLoginData.email
                          : addSignUpData.email
                      }
                      onChange={
                        activeForm === "login"
                          ? handleLoginDataChange
                          : handleSignUpDataChange
                      }
                    />
                    <span
                      className="text-danger font-bold"
                      id={
                        activeForm === "login" ? "emailErr" : "emailErrInsignup"
                      }
                    ></span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={
                        activeForm === "login"
                          ? addLoginData.password
                          : addSignUpData.password
                      }
                      onChange={
                        activeForm === "login"
                          ? handleLoginDataChange
                          : handleSignUpDataChange
                      }
                    />
                    <span
                      className="password_icon"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </span>
                    <span
                      className="text-danger font-bold"
                      id={
                        activeForm === "login"
                          ? "passwordErr"
                          : "passwordErrInSignup"
                      }
                    ></span>
                  </div>
                  {activeForm === "signup" && (
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={addSignUpData.username}
                        onChange={handleSignUpDataChange}
                      />
                      <span
                        className="text-danger font-bold"
                        id="usernameErrInSignup"
                      ></span>
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary mb-3">
                    {activeForm === "login" ? "Login" : "Sign Up"}
                  </button>
                  <p className="text-center">
                    {activeForm === "login"
                      ? "Not a member?"
                      : "Already a member?"}
                    <NavLink
                      to=""
                      className="text-primary ms-1"
                      onClick={toggleForm}
                    >
                      {activeForm === "login" ? "Sign Up" : "Login"}
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
