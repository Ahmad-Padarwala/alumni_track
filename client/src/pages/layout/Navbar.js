import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const Navbar = () => {
  const isAuth = localStorage.getItem("user");
  const [getAlumniProfile, setGetAlumniProfile] = useState([]);
  const [getAlumniMaster, setGetAlumniMaster] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  //log out modal
  const handleClickOpen = (education) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //get alumni profile with id
  const getAlumniProfileData = async (userId) => {
    try {
      const response = await axios.get(`
          ${PORT}getalumniprofilewithid/${userId}`);

      if (response.status === 200) {
        setGetAlumniProfile(response.data[0]);
      } else {
        console.error("Failed to fetch alumni profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //get alumni master data
  const getalumniMasterData = async (id) => {
    try {
      const response = await axios.get(`${PORT}getalumniMasterWithId/${id}`);
      if (response.status === 200) {
        setGetAlumniMaster(response.data[0]);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err, "error in getting alumni master data");
    }
  };
  useEffect(() => {
    getAlumniProfileData(isAuth);
    getalumniMasterData(isAuth);
  }, [isAuth]);

  //log out member
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("organization");
    navigate("/");
  };
  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <NavLink to="/" className="logo d-flex align-items-center">
            <span className="d-none d-lg-block">Alumni</span>
          </NavLink>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" action="">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="button" title="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
        {/* <!-- End Search Bar --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <NavLink
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="/admin"
                data-bs-toggle="dropdown"
              >
                {getAlumniProfile && getAlumniProfile.profile_picture ? (
                  <img
                    src={`/upload/${getAlumniProfile.profile_picture}`}
                    alt="Profile"
                    className="rounded-circle"
                    width="37px"
                    height="37px"
                  />
                ) : (
                  <img
                    src={require("../../assets/image/profile-img.jpg")}
                    alt="Profile"
                    className="rounded-circle"
                  />
                )}
                <span className="d-none d-md-block dropdown-toggle ps-2"></span>
              </NavLink>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>
                    <NavLink to="/user-profile">
                      {getAlumniMaster && getAlumniMaster.username
                        ? getAlumniMaster.username
                        : ""}
                    </NavLink>
                  </h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <span
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleClickOpen}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to log out your account?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogOut} autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
