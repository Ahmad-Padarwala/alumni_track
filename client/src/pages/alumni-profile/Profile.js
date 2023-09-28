import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Education from "./Education";
import Skill from "./Skill";
import WorkDetail from "./WorkDetail";
import OrgName from "./OrgName";
import PORT from "../../assets/constant/Url";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("user");
    if (!isAuth) {
      navigate("/");
    } else {
      setUserId(isAuth);
    }
  }, []);

  const [alumniProfile, setAlumniProfile] = useState({
    cover_background: null,
    profile_picture: null,
    address: "",
    contact: "",
    dob: "",
    gender: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlumniProfile((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAlumniProfile((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
  };

  const saveProfileData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("cover_background", alumniProfile.cover_background);
    formData.append("profile_picture", alumniProfile.profile_picture);
    formData.append("address", alumniProfile.address);
    formData.append("contact", alumniProfile.contact);
    formData.append("dob", alumniProfile.dob);
    formData.append("gender", alumniProfile.gender);

    try {
      axios.post(`${PORT}addalumniprofile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      toast.warning("Enter All Details");
      console.error("Error adding Alumniprofile data in Profile.js:", error);
    }
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
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-8 col-12 px-lg-0 px-md-0 px-2">
            <div className="pofile_left_side_sections pb-4">
              <div>
                <img
                  src={require("../../assets/image/coverBg.png")}
                  width="100%"
                  alt="coverBg"
                />
              </div>
              <div className="profile_image_main">
                <img
                  src={require("../../assets/image/profileImage.png")}
                  width="100%"
                  alt="profile"
                />
              </div>
              <div className="float-end pe-3 mt-3">
                <NavLink
                  to="/user-profile"
                  className="education_opr_icon"
                  data-bs-toggle="modal"
                  data-bs-target="#addPofileModal"
                >
                  <i className="fa-solid fa-plus"></i>
                </NavLink>
                <NavLink
                  to="/user-profile"
                  className="education_opr_icon"
                  data-bs-toggle="modal"
                  data-bs-target="#addPofileModal"
                >
                  <i className="fa-solid fa-pen"></i>
                </NavLink>
              </div>
              <div className="px-3 relative">
                <div className="mt-5 fs-5 fw-semibold">
                  <p className="m-0">Padarwala Ahmad</p>
                </div>
                <div>
                  <span>Alumni member Address</span>
                  <NavLink
                    to="/user-profile"
                    className="text-primary fw-semibold ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#contactModal"
                  >
                    Contact Info
                  </NavLink>
                </div>
                <div className="mt-2">
                  <button
                    className="alumni_req_btn fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#joinalumniModal"
                  >
                    Join Alumni
                  </button>
                  <button
                    className="alumni_req_btn fw-semibold mt-lg-0 mt-md-0 mt-2"
                    data-bs-toggle="modal"
                    data-bs-target="#joinedOrgModal"
                  >
                    Joined Organization
                  </button>
                </div>
              </div>
            </div>
            <Education />
            <Skill />
            <WorkDetail />
          </div>
          <div className="col-lg-4 col-12 px-lg-0 px-md-0 px-2 mt-lg-0 mt-md-0 mt-3">
            <div className="pofile_left_side_sections ms-lg-3">
              <img
                src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                alt="adertisenment"
                width="100%"
              />
            </div>
            <OrgName />
          </div>
        </div>
      </div>

      {/* add profile modal */}
      <div
        className="modal fade"
        id="addPofileModal"
        tabIndex="-1"
        aria-labelledby="addPofileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addPofileModalLabel">
                Ahmad Padarwala
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form encType="multipart/form-data" method="post">
                <p className="fs-5">Your Profile Section</p>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label fw-semibold"
                  >
                    BackGround Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="cover_background"
                    id="exampleFormControlInput1"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label fw-semibold"
                  >
                    Profile Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="profile_picture"
                    id="exampleFormControlInput1"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileAddress"
                    className="form-label fw-semibold"
                  >
                    Address:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    id="alumniProfileAddress"
                    placeholder="Enter Your Address"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileContact"
                    className="form-label fw-semibold"
                  >
                    Contact:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="contact"
                    id="alumniProfileContact"
                    placeholder="Enter Your Mobile No."
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileDob"
                    className="form-label fw-semibold"
                  >
                    Date of Birth:-
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    id="alumniProfileDob"
                    placeholder="Enter Your Date of Birth"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfilegender"
                    className="form-label fw-semibold"
                  >
                    Gender:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="gender"
                    id="alumniProfilegender"
                    placeholder="Enter Your Mobile No."
                    onChange={handleInputChange}
                  />
                </div>
                <div className="d-flex float-end">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={saveProfileData}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="contactModalLabel">
                Ahmad Padarwala
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                <p className="fs-5">Contact Info</p>
                <NavLink to="/user-profile">
                  <i className="fa-solid fa-pen text-dark"></i>
                </NavLink>
              </div>
              <div className="d-flex mb-3">
                <div className="mt-2">
                  <i className="fa-solid fa-phone fs-5"></i>
                </div>
                <div className="ms-2">
                  <p className="mb-0 fw-semibold">Phone</p>
                  <p className="mb-0">7383294925</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="mt-2">
                  <i className="fa-regular fa-envelope fs-5"></i>
                </div>
                <div className="ms-2">
                  <p className="mb-0 fw-semibold">Email</p>
                  <NavLink
                    to="mailto:ahmadpadarwala4@gmail.com"
                    className="mb-0 text-primary"
                  >
                    ahmadpadarwala4@gmail.com
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JoinAlumni Modal */}
      <div
        className="modal fade"
        id="joinalumniModal"
        tabIndex="-1"
        aria-labelledby="joinalumniModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="joinalumniModal">
                Ahmad Padarwala
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <p className="fs-6">
                  Send a request to the organization you want to join
                </p>
              </div>
              <div>
                <select
                  className="form-select form-select"
                  aria-label="select example"
                  defaultValue="0"
                >
                  <option value="0">Select Organization</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mt-3 float-end">
                <button className="alumni_req_btn">Send Request</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Joined Organization Modal */}
      <div
        className="modal fade"
        id="joinedOrgModal"
        tabIndex="-1"
        aria-labelledby="joinedOrgModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="joinedOrgModal">
                Ahmad Padarwala
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <p className="fs-6">
                  You have already joined as an alumni member with these
                  organizations.
                </p>
              </div>
              <div className="d-flex justify-content-between ps-3 mb-2 pb-1 border-bottom">
                <p className="fw-semibold m-0">Organization</p>
                <p className="fw-semibold m-0">Joined Date</p>
              </div>
              <div className="mb-1 d-flex justify-content-between">
                <div>
                  <i className="fa-solid fa-caret-right me-2"></i>
                  <span>Organization 1</span>
                </div>
                <div>
                  <span className="fs-6">04/05/2014</span>
                </div>
              </div>
              <div className="mb-1 d-flex justify-content-between">
                <div>
                  <i className="fa-solid fa-caret-right me-2"></i>
                  <span>Organization 2</span>
                </div>
                <div>
                  <span className="fs-6">04/05/2014</span>
                </div>
              </div>
              <div className="mb-1 d-flex justify-content-between">
                <div>
                  <i className="fa-solid fa-caret-right me-2"></i>
                  <span>Organization 3</span>
                </div>
                <div>
                  <span className="fs-6">04/05/2014</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
