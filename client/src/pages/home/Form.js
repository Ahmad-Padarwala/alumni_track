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

  const toggleForm = () => {
    setActiveForm((prevActiveForm) => {
      return prevActiveForm === "login" ? "signup" : "login";
    });
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
    axios
      .post(`${PORT}alumni-master`, addSignUpData)
      .then(() => {
        navigate("/profile");
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
  const navigate = useNavigate();
  const saveLoginData = (e) => {
    e.preventDefault();
    const user = getSignUpdata.find(
      (user) =>
        user.email === addLoginData.email &&
        user.password === addLoginData.password
    );
    if (user) {
      navigate("/user-profile");
    } else {
      const form = e.target;
      form.reset();
      toast.warning("please correct information");
    }
  };

  //GET SIGHNUP DATA FOR CHACKING LOGIN FORM
  useEffect(() => {
    getdata();
  }, []);

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
                  type="email"
                  className="form-control mt-1"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleLoginDataChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="fw-semibold">
                  Password:-
                </label>
                <input
                  type="password"
                  className="form-control mt-1"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleLoginDataChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
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
                  type="email"
                  className="form-control mt-2"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleSignUpDataChange}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="exampleInputPassword1" className="fw-semibold">
                  Password:-
                </label>
                <input
                  type="password"
                  className="form-control mt-2"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleSignUpDataChange}
                />
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
