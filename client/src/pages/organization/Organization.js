import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Organization.css";
import axios from "axios";
import PORT from "../../assets/constant/Url";

const Orgnaization = () => {
  const [userId, setUserId] = useState("");
  const [getOrgData, setGetOrgData] = useState([]);
  const [alumniRequests, setAlumniRequests] = useState([]);
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("organization");
  useEffect(() => {
    if (!isAuth) {
      navigate("/user-profile");
    } else {
      setUserId(isAuth);
      getOrgDataWithId(isAuth);
    }
  }, [isAuth, navigate, userId]);
  useEffect(() => {
    if (getOrgData.id) {
      getAlumniReq(getOrgData.id);
    }
  }, [getOrgData.id]);
  const getOrgDataWithId = (userId) => {
    axios
      .get(`${PORT}getOrganizationWithId/${userId}`)
      .then((response) => {
        setGetOrgData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigatAddOrg = () => {
    navigate("/add-organization", { state: getOrgData.id });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };
  const navigateEditOrg = () => {
    navigate("/edit-organization", { state: getOrgData.id });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  //get req alumni
  const getAlumniReq = (org_id) => {
    axios
      .get(`${PORT}getrequestedalumni/${org_id}`)
      .then((res) => {
        setAlumniRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <>
      <div className="container mt-lg-3">
        <div className="row">
          <div className="col-lg-4 col-12 px-2">
            <div className="pofile_left_side_sections">
              <div className="d-flex justify-content-between">
                <div className="profile_image_main">
                  {getOrgData && getOrgData.org_logo ? (
                    <img
                      src={`/upload/${getOrgData.org_logo}`}
                      width="100%"
                      alt="logo"
                    />
                  ) : (
                    <img
                      src={require("../../assets/image/profileImage.png")}
                      width="100%"
                      alt="default-logo"
                    />
                  )}
                </div>
                <div className="mt-2">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={navigateEditOrg}
                    className="education_opr_icon"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </span>
                </div>
              </div>
              <div className="fs-5 fw-semibold">
                <p className="m-0">{getOrgData.org_name}</p>
              </div>
              <div>
                <p>{getOrgData.address}</p>
                {getOrgData && getOrgData.website && (
                  <a
                    href={
                      getOrgData.website.startsWith("http://") ||
                      getOrgData.website.startsWith("https://")
                        ? getOrgData.website
                        : `http://${getOrgData.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {getOrgData.website}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-12">
            <div
              className="background_image_main"
              style={{
                backgroundImage: `url(/upload/${
                  getOrgData && getOrgData.org_bg
                    ? getOrgData.org_bg
                    : "bgCover.jpeg"
                })`,
              }}
            ></div>
            <div className="pofile_left_side_sections p-3 mt-3">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    About
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact"
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Member
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="request-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#request"
                    type="button"
                    role="tab"
                    aria-controls="request"
                    aria-selected="true"
                  >
                    Requests
                  </button>
                </li>
                <li className="mt-2 me-2 position-absolute end-0">
                  {getOrgData && getOrgData.org_shortdesc ? (
                    ""
                  ) : (
                    <span
                      onClick={navigatAddOrg}
                      className="education_opr_icon"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  )}
                </li>
              </ul>
              <div className="tab-content mt-2" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h4 className="mb-3">About</h4>
                  <p
                    className=""
                    dangerouslySetInnerHTML={{
                      __html:
                        getOrgData.org_shortdesc || "<p>Data not available</p>",
                    }}
                  ></p>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <h4 className="mb-3">Overview</h4>
                  <p
                    className=""
                    dangerouslySetInnerHTML={{
                      __html:
                        getOrgData.org_longdesc || "<p>Data not available</p>",
                    }}
                  ></p>
                </div>
                <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <h4 className="mb-3">Member</h4>
                </div>
                <div
                  className="tab-pane fade"
                  id="request"
                  role="tabpanel"
                  aria-labelledby="request-tab"
                >
                  <h4 className="mb-3">Resuest</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orgnaization;
