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
  const [getAllOrg, setGetAllOrg] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(0);

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
    const options = { month: "long", day: "numeric" };
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

  //get org all data
  const getOrganizationData = () => {
    axios
      .get(`${PORT}getorganizations`)
      .then((res) => {
        setGetAllOrg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      setUserId(isAuth);
    }
    getAlumniProfileData(isAuth);
    getalumniMasterData(isAuth);
    getOrganizationData();
  }, [isAuth, navigate, addAlumniProfile]);

  const handleNaviagtOrg = () => {
    navigate("/create-organization", { state: isAuth });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //send alumni req
  const handleOrgChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOrg(selectedValue);
  };
  const sendAlumniReq = () => {
    axios
      .post(`${PORT}sendrequestforalumni/${userId}/${selectedOrg}`)
      .then((res) => {
        toast.success("Request Succesfully Sent!");
      })
      .catch((err) => {
        toast.warning("Request Failed !");
      });
  };

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
      <div className="container-fluid" style={{ padding: "80px 0px 40px 0px" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-12 px-2">
              <div className="pofile_left_side_sections">
                <div className="d-flex justify-content-between">
                  <div className="profile_image_main my-3">
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
                  <div className="mt-2">
                    <NavLink
                      to="/user-profile"
                      className="education_opr_icon text-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#addPofileModal"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </NavLink>
                    <NavLink
                      to="/user-profile"
                      className="education_opr_icon text-success"
                      data-bs-toggle="modal"
                      data-bs-target="#editPofileModal"
                      onClick={() => {
                        getAlumniProfileEditData(isAuth);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </NavLink>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <div className="fs-5 fw-semibold">
                    <p className="m-0 alumni_heading">
                      {getAlumniMaster && getAlumniMaster.username
                        ? getAlumniMaster.username
                        : ""}
                      <span className="ms-2 alumni_small_title">
                        {getAlumniProfile && getAlumniProfile.gender
                          ? "(" + getAlumniProfile.gender + ")"
                          : ""}
                      </span>
                    </p>
                  </div>
                  <div className="alumni_small_title">
                    <span>{getAlumniProfile && getAlumniProfile.address}</span>
                  </div>
                  <p className="m-0 alumni_small_title">
                    <span>Birth Date:- </span>
                    {getAlumniProfile && getAlumniProfile.dob
                      ? formatDate(getAlumniProfile.dob)
                      : ""}
                  </p>
                  <div className="my-3">
                    <button
                      className="alumni_req_btn fw-semibold"
                      data-bs-toggle="modal"
                      data-bs-target="#joinalumniModal"
                    >
                      Join Alumni
                    </button>
                    {getAllOrg.some((org) => org.user_id == userId) ? (
                      ""
                    ) : (
                      <button
                        className="alumni_req_btn fw-semibold mt-2"
                        onClick={handleNaviagtOrg}
                      >
                        Create Organization
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <p className="mb-1 alumni_heading fw-semibold">
                    Contact Info
                  </p>
                  {getAlumniProfile && getAlumniProfile.phone_number ? (
                    <div className="d-flex mb-1">
                      <div>
                        <i className="fa-solid fa-phone alumni_small_title"></i>
                      </div>
                      <div className="ms-2">
                        <NavLink
                          to={`tel:${getAlumniProfile.phone_number}`}
                          className="mb-0 text-black text-decoration-none alumni_small_title"
                        >
                          {getAlumniProfile.phone_number}
                        </NavLink>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex mb-3">
                    <div>
                      <i className="fa-regular fa-envelope alumni_small_title"></i>
                    </div>
                    <div className="ms-2">
                      <NavLink
                        to={`mailto:${getAlumniMaster.email}`}
                        className="mb-0 text-primary alumni_small_title"
                      >
                        {getAlumniMaster && getAlumniMaster.email
                          ? getAlumniMaster.email
                          : ""}
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <OrgName userId={userId} />
            </div>
            <div className="col-lg-8 col-12">
              <div
                className="background_image_main"
                style={{
                  backgroundImage: `url(/upload/${
                    getAlumniProfile && getAlumniProfile.cover_background
                      ? getAlumniProfile.cover_background
                      : "bgCover.jpeg"
                  })`,
                }}
              ></div>
              <Education id={isAuth} />
              <Skill id={isAuth} />
              <WorkDetail id={isAuth} />
            </div>
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
              <h1
                className="modal-title alumni_heading"
                id="addPofileModalLabel"
              >
                {getAlumniMaster && getAlumniMaster.username
                  ? getAlumniMaster.username
                  : ""}
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
                <p className="alumni_heading">Your Profile Section</p>
                <div className="mb-3">
                  <label
                    htmlFor="alumniBgCover"
                    className="form-label fw-semibold"
                  >
                    BackGround Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
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
              <h1
                className="modal-title alumni_heading"
                id="editPofileModalLabel"
              >
                {getAlumniMaster && getAlumniMaster.username
                  ? getAlumniMaster.username
                  : ""}
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
                <p className="alumni_heading">Your Profile Section</p>
                <div className="mb-3">
                  <label
                    htmlFor="alumniBgCover"
                    className="form-label fw-semibold"
                  >
                    BackGround Image:-
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
                    name="profile_picture"
                    id="alumniProfileImage"
                    onChange={handleEditFileChange}
                  />
                  {editProfileImageData.profile_picture ? (
                    <img
                      src={editProfileImageData.profile_picture}
                      width="70px"
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
                      width="70px"
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
                    className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
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
                    className="form-control form-control-sm"
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
              <h1 className="modal-title alumni_heading" id="joinalumniModal">
                {getAlumniMaster && getAlumniMaster.username
                  ? getAlumniMaster.username
                  : ""}
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
                <p className="alumni_heading">
                  Send a request to the organization you want to join
                </p>
              </div>
              <div>
                <select
                  className="form-select form-select-sm"
                  aria-label="select example"
                  defaultValue="0"
                  onChange={handleOrgChange}
                >
                  <option value="0">Select Organization</option>
                  {getAllOrg.map((org) => {
                    return <option value={org.id}>{org.org_name}</option>;
                  })}
                </select>
              </div>
              <div className="mt-3 float-end">
                <button
                  className="alumni_req_btn"
                  onClick={sendAlumniReq}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
