import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Organization.css";
import axios from "axios";
import PORT from "../../assets/constant/Url";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orgnaization = () => {
  const [userId, setUserId] = useState("");
  const [getOrgData, setGetOrgData] = useState([]);
  const [alumniRequests, setAlumniRequests] = useState([]);
  const navigate = useNavigate();
  const [alumniProfiles, setAlumniProfiles] = useState([]);
  const [value, setValue] = useState("1");
  const isAuth = localStorage.getItem("organization");
  const [acceptedRequest, setAcceptedRequest] = useState([]);
  const [acceptedAlumniProfile, setAcceptedAlumniProfile] = useState([]);

  //delete and accept alumni req
  const [selectedAction, setSelectedAction] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleClickOpen = (action, education) => {
    setOpen(true);
    setSelectedCategory(education);
    setSelectedAction(action);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //get org data with id
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
    axios
      .get(`${PORT}getrequestedalumni/${org_id}/0`) // 0 is status
      .then((res) => {
        setAlumniRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get alumni profile data
  const getAlumniProfileData = async (userId) => {
    await axios
      .get(`${PORT}getAlumniProfileMaster/${userId}`)
      .then((res) => {
        setAlumniProfiles((prevProfiles) => [...prevProfiles, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //delete alumni request
  const deleteAlumniRequest = async (id) => {
    try {
      await axios.delete(`${PORT}deleteAlumniRequest/${id}`);
      setOpen(false);
      toast.success("Request deleted successfully!");
      setAlumniProfiles([]);
      getAlumniReq(getOrgData.id);
      setAcceptedAlumniProfile([]);
      getAcceptedRequest(getOrgData.id);
    } catch (err) {
      console.log(err);
    }
  };

  //accept alumni request
  const acceptAlumniRequest = async (id) => {
    try {
      await axios.put(`${PORT}acceptAlumniRequest/${id}`);
      setOpen(false);
      toast.success("Request accepted!");
      setAlumniProfiles([]);
      getAlumniReq(getOrgData.id);
      setAcceptedAlumniProfile([]);
      getAcceptedRequest(getOrgData.id);
    } catch (err) {
      console.log(err);
    }
  };

  //get accepted alumni requst
  const getAcceptedRequest = async (org_id) => {
    axios
      .get(`${PORT}getrequestedalumni/${org_id}/1`) // 1 is status
      .then((res) => {
        setAcceptedRequest(res.data);
        console.log(res.data);
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

  useEffect(() => {
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
      getAcceptedRequest(getOrgData.id);
    }
  }, [getOrgData]);

  useEffect(() => {
    if (alumniRequests.length > 0) {
      alumniRequests.forEach(async (request) => {
        await getAlumniProfileData(request.user_id);
      });
    } else if (alumniRequests.length == 0) {
      alumniRequests.forEach(async (request) => {
        await setAlumniProfiles([]);
      });
    }
  }, [alumniRequests]);

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
                                  src={`./upload/${alumni[0].profile_picture}`}
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
                          <div>
                            <span
                              style={{ cursor: "pointer" }}
                              className="education_opr_icon text-danger"
                              onClick={() => {
                                handleClickOpen("delete", alumni[0].user_id);
                              }}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </TabPanel>
                  <TabPanel value="4">
                    <h4 className="mb-3 alumni_heading">
                      A person you have asked to join your organization as a
                      member.
                    </h4>
                    {alumniProfiles.map((alumni, index) => {
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
                                  src={`./upload/${alumni[0].profile_picture}`}
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
                          <div>
                            <span
                              style={{ cursor: "pointer" }}
                              className="education_opr_icon text-success"
                              onClick={() => {
                                handleClickOpen("accept", alumni[0].user_id);
                              }}
                            >
                              <i className="fa-solid fa-check"></i>
                            </span>
                            <span
                              style={{ cursor: "pointer" }}
                              className="education_opr_icon text-danger"
                              onClick={() => {
                                handleClickOpen("delete", alumni[0].user_id);
                              }}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectedAction === "accept"
            ? "Do you want to accept this request?"
            : "Do you want to delete this request?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (selectedAction === "accept") {
                acceptAlumniRequest(selectedCategory);
              } else if (selectedAction === "delete") {
                deleteAlumniRequest(selectedCategory);
              }
            }}
            autoFocus
          >
            {selectedAction === "accept" ? "Accept" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Orgnaization;
