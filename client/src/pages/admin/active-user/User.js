import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../../assets/constant/Url";
import axios from "axios";

const User = () => {
  const [activeUser, setActiveUser] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const getActiveUserData = () => {
    axios
      .get(`${PORT}alumni-master`)
      .then((response) => {
        setActiveUser(response.data);
      })
      .catch((err) => {
        console.log(err, "error getting signup data in admin");
      });
  };
  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  // Filter the data based on the search input
  const filteredUsers = activeUser.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  useEffect(() => {
    getActiveUserData();
  }, []);

  return (
    <>
      <main id="main" className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="pagetitle">
                <h1>Active Users</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <NavLink to="/admin">Home</NavLink>
                    </li>
                    <li className="breadcrumb-item active">Active Users</li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form user_form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search anything..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <span className="left-pan">
                  <i className="fa fa-microphone"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="section dashboard">
          <div className="row">
            <table className="table">
              <thead>
                <tr className="table-primary">
                  <th>ID</th>
                  <th>Email</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((users) => {
                  return (
                    <tr key={users.id}>
                      <td>{users.id}</td>
                      <td>{users.email}</td>
                      <td>{users.username}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
};

export default User;
