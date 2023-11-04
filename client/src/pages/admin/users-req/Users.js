import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../../assets/constant/Url";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [getUsersRequest, setGetUsersRequest] = useState([]);
  //delete and accept alumni req
  const [selectedAction, setSelectedAction] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleClickOpen = (education) => {
    setOpen(true);
    setSelectedCategory(education);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [searchInput, setSearchInput] = useState(""); 
  const getRequestUsersData = async () => {
    axios
      .get(`${PORT}getPendingAlumniMaster`)
      .then((response) => {
        setGetUsersRequest(response.data);
      })
      .catch((err) => {
        console.log(err, "error getting signup data in admin");
      });
  };

  //accept req
  const acceptUser = async (id) => {
    axios
      .put(`${PORT}acceptUserReq/${id}`)
      .then((res) => {
        toast.success("Users request accepted!");
        getRequestUsersData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
   // Function to handle search input change
   const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  // Filter the data based on the search input
  const filteredUsers = getUsersRequest.filter((user) => {
    return (
      user.username.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  useEffect(() => {
    getRequestUsersData();
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
      <main id="main" className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="pagetitle">
                <h1>Users Request</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <NavLink to="/admin">Home</NavLink>
                    </li>
                    <li className="breadcrumb-item active">Users Request</li>
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
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((users) => {
                  return (
                    <tr key={users.id}>
                      <td>{users.id}</td>
                      <td>{users.email}</td>
                      <td>{users.username}</td>
                      <td>
                        <div>
                          <span
                            style={{ cursor: "pointer" }}
                            className="education_opr_icon text-success"
                            // onClick={() => {
                            //   acceptUser(users.id);
                            // }}
                            onClick={() => {
                              handleClickOpen(users);
                            }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </span>
                          <span
                            style={{ cursor: "pointer" }}
                            className="education_opr_icon text-danger"
                            // onClick={() => {
                            //     handleClickOpen("delete", users.user_id);
                            //   }}
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "Do you want to accept this request?"
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              acceptUser(selectedCategory.id);
              //   if (selectedAction === "accept") {
              //     acceptUser(selectedCategory);
              //   } else if (selectedAction === "delete") {
              //     deleteAlumniRequest(selectedCategory);
              //   }
            }}
            autoFocus
          >
            accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
