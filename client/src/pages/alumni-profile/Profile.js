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
  const [getAlumniProfile, setGetAlumniProfile] = useState([]);
  const [addAlumniProfile, setAddAlumniProfile] = useState({
    cover_background: null,
    profile_picture: null,
    address: "",
    phone_number: "",
    dob: "",
    gender: "",
  });
  const [getAlumniMaster, setGetAlumniMaster] = useState([]);
  const [editProfileData, setEditProfileData] = useState([]);
  const [editProfileImageData, setEditProfileImageData] = useState({
    profile_picture: null,
    cover_background: null,
  });

  const isAuth = localStorage.getItem("user");

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

  // add alumni profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddAlumniProfile((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAddAlumniProfile((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
  };
  const saveProfileData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("cover_background", addAlumniProfile.cover_background);
    formData.append("profile_picture", addAlumniProfile.profile_picture);
    formData.append("address", addAlumniProfile.address);
    formData.append("contact", addAlumniProfile.contact);
    formData.append("dob", addAlumniProfile.dob);
    formData.append("gender", addAlumniProfile.gender);

    try {
      await axios.post(`${PORT}addalumniprofile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAddAlumniProfile({
        cover_background: null,
        profile_picture: null,
        address: "",
        phone_number: "",
        dob: "",
        gender: "",
      });
    } catch (error) {
      toast.warning("Enter All Details");
      console.error("Error adding Alumniprofile data in Profile.js:", error);
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
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  //alumni profile data for edit
  const getAlumniProfileEditData = async (userId) => {
    try {
      const response = await axios.get(`
          ${PORT}getalumniprofilewithid/${userId}`);
      if (response.status === 200) {
        setEditProfileData(response.data[0]);
      } else {
        console.error("Failed to fetch alumni profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    const tempURL = URL.createObjectURL(file);

    setEditProfileData((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));

    setEditProfileImageData((prevImageData) => ({
      ...prevImageData,
      [event.target.name]: tempURL,
    }));
  };
  const saveEditProfile = async (id) => {
    const formData = new FormData();
    if (editProfileData.profile_picture) {
      formData.append("profile_picture", editProfileData.profile_picture);
    }

    if (editProfileData.cover_background) {
      formData.append("cover_background", editProfileData.cover_background);
    }

    formData.append("address", editProfileData.address);
    formData.append("phone_number", editProfileData.phone_number);
    formData.append("dob", editProfileData.dob);
    formData.append("gender", editProfileData.gender);

    await axios
      .put(`${PORT}editalumniprofile/${id}`, formData)
      .then((res) => {
        getAlumniProfileData(isAuth);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatDateForInput = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      setUserId(isAuth);
    }
    getAlumniProfileData(isAuth);
    getalumniMasterData(isAuth);
  }, [isAuth, navigate, addAlumniProfile]);

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
              <div
                className="background_image_main"
                style={{
                  backgroundImage: `url(/upload/${
                    getAlumniProfile && getAlumniProfile.cover_background
                      ? getAlumniProfile.cover_background
                      : "coverBg.png"
                  })`,
                }}
              ></div>
              <div className="profile_image_main">
                {getAlumniProfile && getAlumniProfile.profile_picture ? (
                  <img
                    src={`/upload/${getAlumniProfile.profile_picture}`}
                    width="100%"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={require("../../assets/image/profileImage.png")}
                    width="100%"
                    alt="default-profile"
                  />
                )}
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
                  data-bs-target="#editPofileModal"
                  onClick={() => {
                    getAlumniProfileEditData(isAuth);
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </NavLink>
              </div>
              <div className="px-4 relative">
                <div className="mt-5 fs-5 fw-semibold">
                  <p className="m-0">
                    {getAlumniMaster.username}
                    <span className="ms-2" style={{ fontSize: "14px" }}>
                      ({getAlumniProfile.gender})
                    </span>
                  </p>
                </div>
                <div>
                  <span>{getAlumniProfile && getAlumniProfile.address}</span>
                  <NavLink
                    to="/user-profile"
                    className="text-primary fw-semibold ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#contactModal"
                  >
                    Contact Info
                  </NavLink>
                </div>
                <p className="m-0" style={{ fontSize: "14px" }}>
                  <span>DOB:- </span>
                  {formatDate(getAlumniProfile.dob)}
                </p>
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
            <Education id={isAuth} />
            <Skill id={isAuth} />
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
                {getAlumniMaster.username}
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
                    htmlFor="alumniBgCover"
                    className="form-label fw-semibold"
                  >
                    BackGround Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="cover_background"
                    id="alumniBgCover"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileImage"
                    className="form-label fw-semibold"
                  >
                    Profile Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="profile_picture"
                    id="alumniProfileImage"
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
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <p className="form-label fw-semibold">Gender:-</p>
                  <div>
                    <label className="form-check-label" htmlFor="alumnimale">
                      <input
                        type="radio"
                        id="alumnimale"
                        name="gender"
                        value="male"
                        className="form-check-input me-2"
                        onChange={handleInputChange}
                      />
                      Male
                    </label>
                    <label
                      className="form-check-label ms-3"
                      htmlFor="alumnifemale"
                    >
                      <input
                        type="radio"
                        id="alumnifemale"
                        name="gender"
                        value="female"
                        className="form-check-input me-1"
                        onChange={handleInputChange}
                      />
                      Female
                    </label>
                  </div>
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

      {/* edit profile modal */}
      <div
        className="modal fade"
        id="editPofileModal"
        tabIndex="-1"
        aria-labelledby="editPofileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editPofileModalLabel">
                {getAlumniMaster.username}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <p className="fs-5">Your Profile Section</p>
                <div className="mb-3">
                  <label
                    htmlFor="alumniBgCover"
                    className="form-label fw-semibold"
                  >
                    BackGround Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="cover_background"
                    id="alumniBgCover"
                    onChange={handleEditFileChange}
                  />
                  {editProfileImageData.cover_background ? (
                    <img
                      src={editProfileImageData.cover_background}
                      width="100px"
                      className="mt-2"
                      alt="profile"
                    />
                  ) : (
                    <img
                      src={`/upload/${
                        editProfileData.cover_background
                          ? editProfileData.cover_background
                          : "coverBg.png"
                      }`}
                      width="100px"
                      alt="default-profile"
                      className="mt-2"
                    />
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileImage"
                    className="form-label fw-semibold"
                  >
                    Profile Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="profile_picture"
                    id="alumniProfileImage"
                    onChange={handleEditFileChange}
                  />
                  {editProfileImageData.profile_picture ? (
                    <img
                      src={editProfileImageData.profile_picture}
                      width="100px"
                      className="mt-2"
                      alt="profile"
                    />
                  ) : (
                    <img
                      src={`/upload/${
                        editProfileData.profile_picture
                          ? editProfileData.profile_picture
                          : "profileImage.png"
                      }`}
                      width="100px"
                      alt="default-profile"
                      className="mt-2"
                    />
                  )}
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
                    onChange={handleEditChange}
                    value={editProfileData.address}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileContact"
                    className="form-label fw-semibold"
                  >
                    phone Number:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    id="alumniProfileContact"
                    placeholder="Enter Your Mobile No."
                    onChange={handleEditChange}
                    value={editProfileData.phone_number}
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
                    onChange={handleEditChange}
                    value={formatDateForInput(editProfileData.dob)}
                  />
                </div>
                <div className="mb-3">
                  <p className="form-label fw-semibold">Gender:-</p>
                  <div>
                    <label className="form-check-label" htmlFor="alumnimale">
                      <input
                        type="radio"
                        id="alumnimale"
                        name="gender"
                        value="male"
                        onChange={handleEditChange}
                        checked={editProfileData.gender === "male"}
                        className="form-check-input me-2"
                      />
                      Male
                    </label>
                    <label
                      className="form-check-label ms-3"
                      htmlFor="alumnifemale"
                    >
                      <input
                        type="radio"
                        id="alumnifemale"
                        name="gender"
                        value="female"
                        onChange={handleEditChange}
                        checked={editProfileData.gender === "female"}
                        className="form-check-input me-2"
                      />
                      Female
                    </label>
                  </div>
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
                    type="button"
                    className="btn btn-primary ms-3"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      saveEditProfile(isAuth);
                    }}
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
                {getAlumniMaster.username}
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
                  <p className="mb-0">
                    {getAlumniProfile && getAlumniProfile.phone_number}
                  </p>
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
                    {getAlumniMaster.email}
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
                {getAlumniMaster.username}
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
                {getAlumniMaster.username}
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
