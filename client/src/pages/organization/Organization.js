import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Organization.css";
import axios from "axios";
import PORT from "../../assets/constant/Url";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Orgnaization = () => {
  const [userId, setUserId] = useState("");
  const [getOrgData, setGetOrgData] = useState([]);
  const [alumniRequests, setAlumniRequests] = useState([]);
  const navigate = useNavigate();
  const [alumniProfile, setAlumniProfile] = useState([]);
  const [alumniUserName, setAlumniUserName] = useState([]);
  const [value, setValue] = useState("1");
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

  //mui tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //watch alumni profile
  const handleWatchAlumniProfile = (username, userid) => {
    navigate(`/view-profile/${username}`, {
      state: userid,
    });
  };

  useEffect(() => {
    if (getOrgData.id && alumniRequests.length > 0) {
      const userIds = alumniRequests.map((request) => request.user_id);
      const profilePromises = userIds.map((userId) => {
        return axios.get(`${PORT}getalumniprofilewithid/${userId}`);
      });
      Promise.all(profilePromises)
        .then((profileDataArray) => {
          setAlumniProfile(profileDataArray[0].data);
        })
        .catch((err) => {
          console.log(err);
        });
      const userId = alumniRequests.map((request) => request.user_id);
      const profilePromise = userId.map((userId) => {
        return axios.get(`${PORT}getalumniMasterWithId/${userId}`);
      });
      Promise.all(profilePromise)
        .then((profileDataArray) => {
          setAlumniUserName(profileDataArray[0].data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getOrgData.id, alumniRequests]);
  return (
    <>
      <div className="container" style={{ padding: "80px 0px 40px 0px" }}>
        <div className="row">
          <div className="col-lg-4 col-12 px-2">
            <div className="pofile_left_side_sections">
              <div className="d-flex justify-content-between">
                <div className="profile_image_main my-3">
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
                    className="education_opr_icon text-success"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </span>
                </div>
              </div>
              <div className="fs-5 fw-semibold">
                <p className="m-0 alumni_heading">{getOrgData.org_name}</p>
              </div>
              <div>
                <p className="alumni_small_title">{getOrgData.address}</p>
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
            <div className="pofile_left_side_sections mt-3">dcjdsnjc</div>
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
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Home" value="1" />
                      <Tab label="About" value="2" />
                      <Tab label="Members" value="3" />
                      <Tab label="Requests" value="4" />
                    </TabList>
                  </Box>
                  <span className="add_org_desc_btn">
                    {getOrgData && getOrgData.org_shortdesc ? (
                      ""
                    ) : (
                      <span
                        onClick={navigatAddOrg}
                        className="education_opr_icon text-primary"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    )}
                  </span>
                  <TabPanel value="1">
                    <h4 className="mb-2 alumni_heading">About</h4>
                    <p
                      className="alumni_small_title"
                      dangerouslySetInnerHTML={{
                        __html:
                          getOrgData.org_shortdesc ||
                          "<p>Data not available</p>",
                      }}
                    ></p>
                  </TabPanel>
                  <TabPanel value="2">
                    <h4 className="mb-2 alumni_heading">Overview</h4>
                    <p
                      className="alumni_small_title"
                      dangerouslySetInnerHTML={{
                        __html:
                          getOrgData.org_longdesc ||
                          "<p>Data not available</p>",
                      }}
                    ></p>
                  </TabPanel>
                  <TabPanel value="3">
                    <h4 className="mb-2 alumni_heading">Members</h4>
                  </TabPanel>
                  <TabPanel value="4">
                    <h4 className="mb-2 alumni_heading">Requests</h4>
                    {alumniProfile.length > 0
                      ? alumniProfile.map((alumni, index) => (
                          <div
                            className="d-flex justify-content-between mb-3"
                            key={alumni.id}
                          >
                            <div
                              className="d-flex"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleWatchAlumniProfile(
                                  alumniUserName[index].username,
                                  alumniUserName[index].id
                                );
                              }}
                            >
                              <div className="org-display-image">
                                {alumni && alumni.profile_picture ? (
                                  <img
                                    src={`./upload/${alumni.profile_picture}`}
                                    alt="orgimage"
                                    width="50px"
                                  />
                                ) : (
                                  <img
                                    src={require("../../assets/image/educationImages.png")}
                                    width="60px"
                                    alt="default-profile"
                                  />
                                )}
                              </div>
                              <div className="ms-2">
                                <p className="m-0 alumni_heading">
                                  {alumniUserName[index] &&
                                    alumniUserName[index].username}
                                </p>
                                <p className="mb-0 alumni_small_title">
                                  {alumni.address}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span
                                style={{ cursor: "pointer" }}
                                className="education_opr_icon text-success"
                              >
                                <i className="fa-solid fa-check"></i>
                              </span>
                              <span
                                style={{ cursor: "pointer" }}
                                className="education_opr_icon text-danger"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </span>
                            </div>
                          </div>
                        ))
                      : ""}
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orgnaization;
