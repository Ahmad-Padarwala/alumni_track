import React, { useState, useEffect } from "react";
import axios from "axios";
import PORT from "../../assets/constant/Url";
import { useNavigate } from "react-router-dom";

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
        const form = e.target;
        form.reset();
        alert("You are succesfully submitted");
      })
      .catch((error) => {
        alert("Enter All Details");
        console.log("Error adding Sign Up data in Form.js:", error);
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
      navigate("/admin");
      const form = e.target;
      form.reset();
      alert("You are succesfully loggined");
    } else {
      const form = e.target;
      form.reset();
      alert("please correct information");
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
      {activeForm === "login" ? (
        <form
          className="w-25 mt-5 bg-color-white shadow p-5 mb-5 rounded mx-auto"
          method="post"
          onSubmit={saveLoginData}
        >
          <h2 className="text-center text-primary">Login</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email:- </label>
            <input
              type="email"
              className="form-control mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={handleLoginDataChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="mt-2">
              Password:-
            </label>
            <input
              type="password"
              className="form-control mt-2"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              name="password"
              onChange={handleLoginDataChange}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
          <p className="text-center mt-3">
            Are You Sure?
            <a
              className="text-primary"
              onClick={() => {
                toggleForm();
              }}
            >
              Sign Up
            </a>
          </p>
        </form>
      ) : (
        <form
          className="w-25 mt-5 bg-color-white shadow px-5 py-3 mb-5 rounded mx-auto"
          method="post"
          onSubmit={saveSignUpData}
        >
          <h2 className="text-center text-primary">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email:- </label>
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="mt-2">
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="mt-2">
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
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
          <p className="text-center mt-3">
            Are You Sure?
            <a
              className="text-primary"
              onClick={() => {
                toggleForm();
              }}
            >
              Login
            </a>
          </p>
        </form>
      )}
    </>
  );
};

export default Form;
