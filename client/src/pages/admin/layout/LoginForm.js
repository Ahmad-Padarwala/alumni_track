import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PORT from "../../../assets/constant/Url";

const LoginForm = () => {
  const navigate = useNavigate();
  const uname = useRef();
  const password = useRef();
  const getUname = localStorage.getItem("unameData");

  useEffect(() => {
    if (getUname) {
      navigate("/dashboard");
    }
  }, [getUname, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .get(`${PORT}users?uname=${uname.current.value}`)
      .then((response) => {
        const userData = response.data[0];
        if (userData && password.current.value === userData.password) {
          localStorage.setItem("unameData", userData.uname);
          navigate("/dashboard");
        } else {
          window.confirm("Please Enter valid values");
        }
      })
      .catch((error) => {
        console.log("Error fetching Category data in Brand.js:", error);
      });
  };
  console.log(uname);
  console.log(password);
  return (
    <>
      <div className="card">
        <form className="box" onSubmit={handleLogin}>
          <h1 className="font-monospace h3 text-white">LOGIN</h1>
          <p className="text-secondary">
            Please enter your username and password!
          </p>
          <input
            type="text"
            placeholder="Username"
            className="form-control text-center p-2 outline-0 rounded-3"
            ref={uname}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control text-center p-2 outline-0 rounded-3"
            ref={password}
          />
          <a href="/admin" className="text-decoration-none text-secondary">
            Forgot password?
          </a>
          <input
            type="submit"
            className="btn btn-primary rounded-3 cursor-pointer py-2"
            value="Login"
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
