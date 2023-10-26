import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/Organization.css";
import axios from "axios";
import PORT from "../../assets/constant/Url";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Orgnaization = () => {
  const [getOrgData, setGetOrgData] = useState([]);
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const location = useLocation();
  const isAuth = location.state.id;
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [acceptedAlumniProfile, setAcceptedAlumniProfile] = useState([]);

  //get org data with id
  const getOrgDataWithId = (userId) => {
    axios
      .get(`${PORT}getOrganizationforedit/${userId}`)
      .then((response) => {
        setGetOrgData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //get accepted alumni requst
  const getAcceptedRequest = async (org_id) => {
    axios
      .get(`${PORT}getrequestedalumni/${org_id}/1`) // 1 is status
      .then((res) => {
        setAcceptedRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //accepted alumni profile
  const getAcceptedAlumniProfile = async (userId) => {
    await axios
      .get(`${PORT}getAlumniProfileMaster/${userId}`)
      .then((res) => {
        setAcceptedAlumniProfile((prevProfiles) => [...prevProfiles, res.data]);
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
  const handleWatchAlumniProfile = (userid) => {
    navigate(`/view-profile/${userid}`, {
      state: { id: userid, alumniId: isAuth },
    });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  //watch org account
  const viewOrgProfile = (id) => {
    navigate(`/view-organization/${id}`, {
      state: { id: id },
    });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };
  useEffect(() => {
    if (!isAuth) {
      navigate("/user-profile");
    } else {
      getOrgDataWithId(isAuth);
    }
  }, []);

  useEffect(() => {
    if (getOrgData.id) {
      getAcceptedRequest(getOrgData.id);
    }
  }, [getOrgData]);

  useEffect(() => {
    if (acceptedRequest.length > 0) {
      acceptedRequest.forEach(async (request) => {
        await getAcceptedAlumniProfile(request.user_id);
      });
    } else if (acceptedRequest.length == 0) {
      setAcceptedAlumniProfile([]);
    }
  }, [acceptedRequest]);

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
                    </TabList>
                  </Box>
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
                    {acceptedAlumniProfile.map((alumni) => {
                      return (
                        <div className="d-flex justify-content-between mb-3">
                          <div
                            className="d-flex"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleWatchAlumniProfile(alumni[0].user_id);
                            }}
                          >
                            <div className="org-display-image">
                              {alumni[0].profile_picture ? (
                                <img
                                  src={`../upload/${alumni[0].profile_picture}`}
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
                                {" "}
                                {alumni[0].username
                                  ? alumni[0].username
                                  : "Unknown"}
                              </p>
                              <p className="mb-0 alumni_small_title">
                                {alumni[0].address
                                  ? alumni[0].address
                                  : "address"}
                              </p>
                            </div>
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
