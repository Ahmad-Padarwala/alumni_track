import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Education from "./Education";
import OrgName from "./OrgName";
import Skill from "./Skill";
import WorkDetail from "./WorkDetail";
import PORT from "../../assets/constant/Url";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Profile = () => {
  const [getAlumniProfile, setGetAlumniProfile] = useState([]);
  const [getAlumniMaster, setGetAlumniMaster] = useState([]);
  const location = useLocation();
  const userId = location.state.id;
  const alumniId = location.state.alumniId;
  console.log(alumniId);

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
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    getAlumniProfileData(userId);
    getalumniMasterData(userId);
    localStorage.setItem("organization", alumniId);
  }, [userId]);

  return (
    <>
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
                </div>
                <div className="mt-3">
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
              <Education id={userId} />
              <Skill id={userId} />
              <WorkDetail id={userId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
