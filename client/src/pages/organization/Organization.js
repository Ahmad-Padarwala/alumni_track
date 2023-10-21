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
  const [alumniProfiles, setAlumniProfiles] = useState([]);
  // const [alumniUserName, setAlumniUserName] = useState([]);
  const [value, setValue] = useState("1");
  const isAuth = localStorage.getItem("organization");

  //get org data with id
  const getOrgDataWithId = (userId) => {
    console.log("getOrgDataWithId");
    axios
      .get(`${PORT}getOrganizationWithId/${userId}`)
      .then((response) => {
        setGetOrgData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //add org data
  const navigatAddOrg = () => {
    navigate("/add-organization", { state: getOrgData.id });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  //edit org data
  const navigateEditOrg = () => {
    navigate("/edit-organization", { state: getOrgData.id });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  // get req alumni
  const getAlumniReq = (org_id) => {
    console.log("getAlumniReq");
    axios
      .get(`${PORT}getrequestedalumni/${org_id}`)
      .then((res) => {
        setAlumniRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get alumni profile data
  const getAlumniProfileData = async (userId) => {
    console.log("getAlumniProfileData");
    await axios
      .get(`${PORT}getalumniprofilewithid/${userId}`)
      .then((res) => {
        setAlumniProfiles((prevProfiles) => [...prevProfiles, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get alumni master data
  // const getalumniMasterData = async (id) => {
  //   try {
  //     const response = await axios.get(`${PORT}getalumniMasterWithId/${id}`);
  //     if (response.status === 200) {
  //       setAlumniUserName(response.data);
  //       return response.data;
  //     } else {
  //       console.log("Failed to fetch alumni master data");
  //       return null;
  //     }
  //   } catch (err) {
  //     console.log(err, "error in getting alumni master data");
  //     return null;
  //   }
  // };

  //mui tabs

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //watch alumni profile
  // const handleWatchAlumniProfile = (username, userid) => {
  //   navigate(`/view-profile/${username}`, {
  //     state: userid,
  //   });
  // };

  useEffect(() => {
    console.log("1");
    if (!isAuth) {
      navigate("/user-profile");
    } else {
      handleSetUserId(isAuth);
      getOrgDataWithId(isAuth);
    }
  }, []);

  const handleSetUserId = (isAuth) => {
    setUserId(isAuth);
  };

  useEffect(() => {
    if (getOrgData.id) {
      getAlumniReq(getOrgData.id);
    }
  }, [getOrgData]);

  useEffect(() => {
    console.log("alumini profiles data");
    console.log(alumniProfiles);
  }, [alumniProfiles]);

  useEffect(() => {
    if (alumniRequests.length > 0) {
      alumniRequests.forEach(async (request) => {
        await getAlumniProfileData(request.user_id);
      });
    }
  }, [alumniRequests]);

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
                    <h4 className="mb-3 alumni_heading">
                      A person you have asked to join your organization as a
                      member.
                    </h4>
                    {alumniProfiles.map((alumni, index) => {
                      return (
                        <div className="d-flex justify-content-between mb-3">
                          <div className="d-flex" style={{ cursor: "pointer" }}>
                            <div className="org-display-image">
                              {alumniProfiles.profile_picture ? (
                                <img
                                  src={`./upload/${alumniProfiles.profile_picture}`}
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
                              <p className="m-0 alumni_heading">user Name</p>
                              <p className="mb-0 alumni_small_title">
                                {alumni[0].address
                                  ? alumni[0].address
                                  : "address"}
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
                      );
                    })}
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
