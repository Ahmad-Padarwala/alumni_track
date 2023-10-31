import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/Profile.css";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Post = () => {
  const [getAlumniProfile, setGetAlumniProfile] = useState([]);
  const [getProfileForPost, setGetProfileForPost] = useState([]);
  const [getAlumniMaster, setGetAlumniMaster] = useState([]);
  const [userId, setUserId] = useState();
  const [getPostData, setGetPostData] = useState([]);
  const [getUserPostData, setGetUserPostData] = useState([]);
  const [value, setValue] = useState("1");
  const [addPost, setAddPost] = useState({
    post_title: "",
    post_image: null,
    post_video: null,
  });
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(
    Array(getPostData.length).fill(false)
  );
  const [editPost, setEditPost] = useState([]);
  const [editPostImage, setEditPostImage] = useState({
    post_image: null,
  });
  const isAuth = localStorage.getItem("user");
  const navigate = useNavigate();
  const toggleDropdown = (index) => {
    const updatedDropdownState = [...isDropdownVisible];
    updatedDropdownState[index] = !updatedDropdownState[index];
    setDropdownVisible(updatedDropdownState);
  };

  //get alumni profile with id
  const getAlumniProfileData = async (userId) => {
    try {
      const response = await axios.get(
        `${PORT}getAlumniProfileMaster/${userId}`
      );

      if (response.status === 200) {
        setGetAlumniProfile(response.data[0]);
      } else {
        console.error("Failed to fetch alumni profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const setUserIdWithisAuth = (isAuth) => {
    setUserId(isAuth);
  };

  //add post data section start
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddPost((prevPostData) => ({
      ...prevPostData,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAddPost((prevProfileData) => ({
      ...prevProfileData,
      [e.target.name]: file,
    }));
    console.log(file);
  };
  const addPostData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("post_title", addPost.post_title);
    formData.append("post_image", addPost.post_image);
    try {
      const response = await axios.post(
        `${PORT}addPostData/${userId}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Your Post is added succesfully");
        setAddPost({
          post_title: "",
          post_image: null,
          post_video: null,
        });
      } else {
        console.error("Failed to fetch alumni profile");
      }
    } catch (err) {
      console.log(err, "Error in adding post data");
    }
  };
  //mui tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //get all posts
  const getAllPostData = async () => {
    try {
      const response = await axios.get(`${PORT}getPostData`);
      if (response.status === 200) {
        setGetPostData(response.data); // Update the state with response.data
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (err) {
      console.log(err, "error getting post data with userid");
    }
  };
  //get post user name
  const getProfileForPostData = async (userId) => {
    await axios
      .get(`${PORT}getAlumniProfileMaster/${userId}`)
      .then((res) => {
        setGetProfileForPost((prevProfiles) => [...prevProfiles, res.data[0]]);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (getPostData.length > 0) {
      getPostData.forEach(async (post) => {
        await getProfileForPostData(post.user_id);
      });
    } else if (getPostData.length == 0) {
      getPostData.forEach(async () => {
        await setGetProfileForPost([]);
      });
    }
  }, [getPostData]);
  useEffect(() => {
    console.log(getProfileForPost);
  }, [getProfileForPost]);

  //get post data with userid
  const getAlumniPostData = async (id) => {
    try {
      const response = await axios.get(`${PORT}getUserPostDataWithId/${id}`);
      if (response.status === 200) {
        setGetUserPostData(response.data); // Update the state with response.data
      } else {
        console.error("Failed to fetch post data");
      }
    } catch (err) {
      console.log(err, "error getting post data with userid");
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
  //get post data for edit
  const getPostDataforEdit = (id) => {
    axios
      .get(`${PORT}getpostdatawithid/${id}`)
      .then((res) => {
        setEditPost(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //post edit section start
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    const tempURL = URL.createObjectURL(file);

    setEditPost((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));

    setEditPostImage((prevImageData) => ({
      ...prevImageData,
      [event.target.name]: tempURL,
    }));
  };
  const saveEditPost = async (id) => {
    const formData = new FormData();
    if (editPost.post_image) {
      formData.append("post_image", editPost.post_image);
    }
    formData.append("post_title", editPost.post_title);
    await axios
      .put(`${PORT}editUserPostData/${id}`, formData)
      .then((res) => {
        getAlumniProfileData(userId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete post section start
  const handleClickOpen = (education) => {
    setOpen(true);
    setSelectedCategory(education);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePostData = (id) => {
    axios
      .delete(`${PORT}deletePostData/${id}`)
      .then(() => {
        getAllPostData();
        setOpen(false);
        toast.success("your post Delete Successfully !");
      })
      .catch((err) => {
        console.log(err, "error in deleting post data");
      });
  };

  const formatDateForInput = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    }
    return "";
  };

  useEffect(() => {
    if (userId) {
      getAlumniProfileData(userId);
      getAllPostData();
      getalumniMasterData(userId);
      // getAllAlumniProfileData()
    }
  }, [userId, addPost]);
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      setUserIdWithisAuth(isAuth);
    }
  }, [isAuth]);

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
            <div className="col-lg-3 col-12 px-2">
              <div className="pofile_left_side_sections p-0">
                <div
                  className="post_background_image"
                  style={{
                    backgroundImage: `url(/upload/${
                      getAlumniProfile && getAlumniProfile.cover_background
                        ? getAlumniProfile.cover_background
                        : "bgCover.jpeg"
                    })`,
                  }}
                ></div>
                <div className="post_profile_image_main">
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
                <NavLink to="/user-profile">
                  <p className="text-center mt-5 alumni_heading">
                    <span className="alumni_small_title me-1">Welcome</span>
                    {getAlumniMaster && getAlumniMaster.username
                      ? getAlumniMaster.username
                      : ""}
                  </p>
                </NavLink>
              </div>
              <div className="pofile_left_side_sections mt-3">
                <p>Connecters:-</p>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="pofile_left_side_sections p-3">
                <div
                  className="add_post_section"
                  data-bs-toggle="modal"
                  data-bs-target="#addPostModal"
                >
                  <p className="fw-bold">What are you Publish?</p>
                  <div className="d-flex">
                    <div className="me-2 post_two_icons">
                      <i className="fa-solid fa-photo-film"></i>
                    </div>
                    <div className="me-2 post_two_icons">
                      <i className="fa-solid fa-video"></i>
                    </div>
                    <div className="post_btn_main">
                      <button className="post_btn">Post Now</button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        className="pofile_left_side_sections mt-3 p-0"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="All Post" value="1" />
                        <Tab
                          label="Your Posts"
                          value="2"
                          onClick={() => {
                            getAlumniPostData(getAlumniProfile.user_id);
                          }}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1" className="p-0">
                      {getPostData.length > 0 ? (
                        getPostData.map((post, index) => (
                          <div
                            className="pofile_left_side_sections mt-3 p-0"
                            key={post.id}
                          >
                            <div className="d-flex p-2">
                              <div className="post_right_profile_image2">
                                <img
                                  src={`/upload/${
                                    (getProfileForPost[index] &&
                                      getProfileForPost[index]
                                        .profile_picture) ||
                                    "profileImage.png"
                                  }`}
                                  width="100%"
                                  alt="profile"
                                />
                              </div>
                              <div className="ms-2">
                                <p className="alumni_heading mb-0 text-black">
                                  {getProfileForPost[index] &&
                                  getProfileForPost[index].username
                                    ? getProfileForPost[index].username
                                    : "Unknown"}
                                </p>
                                <p className="alumni_small_title">
                                  {post && post.post_date
                                    ? formatDateForInput(post.post_date)
                                    : ""}
                                </p>
                              </div>
                              <div
                                className="three_dotes"
                                onClick={() => toggleDropdown(index)}
                              >
                                <i className="fas fa-ellipsis"></i>
                                {isDropdownVisible[index] && (
                                  <div className="dropdown-content">
                                    <p
                                      className="alumni_small_title mb-1"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editPostModal"
                                      onClick={() => {
                                        getPostDataforEdit(post.id);
                                      }}
                                    >
                                      Edit Post
                                    </p>
                                    <p
                                      className="alumni_small_title m-0"
                                      onClick={() => handleClickOpen(post)}
                                    >
                                      Delete Post
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="mb-0 ms-2">
                              {post && post.post_title}
                            </p>
                            <div className="post_image mt-0 p-0">
                              <img
                                src={`/upload/${post && post.post_image}`}
                                width="100%"
                                alt="profile"
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No posts available</p>
                      )}
                    </TabPanel>
                    <TabPanel value="2" className="p-0">
                      {getUserPostData.map((userPost, index) => {
                        return (
                          <div
                            className="pofile_left_side_sections mt-2 p-0"
                            key={userPost.id}
                          >
                            <div className="d-flex p-2">
                              <div className="post_right_profile_image2">
                                <img
                                  src={`/upload/${
                                    (getAlumniProfile &&
                                      getAlumniProfile.profile_picture) ||
                                    "profileImage.png"
                                  }`}
                                  width="100%"
                                  alt="profile"
                                />
                              </div>
                              <div className="ms-2">
                                <NavLink to="/user-profile">
                                  <p className="alumni_heading mb-0 text-black">
                                    {getAlumniProfile &&
                                    getAlumniProfile.username
                                      ? getAlumniProfile.username
                                      : ""}
                                  </p>
                                </NavLink>
                                <p className="alumni_small_title">
                                  {userPost && userPost.post_date
                                    ? formatDateForInput(userPost.post_date)
                                    : ""}
                                </p>
                              </div>
                              <div
                                className="three_dotes"
                                onClick={() => toggleDropdown(index)}
                              >
                                <i className="fas fa-ellipsis"></i>
                                {isDropdownVisible[index] && (
                                  <div className="dropdown-content">
                                    <p
                                      className="alumni_small_title mb-1"
                                      data-bs-toggle="modal"
                                      data-bs-target="#editPostModal"
                                      onClick={() => {
                                        getPostDataforEdit(userPost.id);
                                      }}
                                    >
                                      Edit Post
                                    </p>
                                    <p
                                      className="alumni_small_title m-0"
                                      onClick={() => handleClickOpen(userPost)}
                                    >
                                      Delete Post
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="ms-2 mb-0">
                              {userPost && userPost.post_title}
                            </p>
                            <div className="post_image mt-0 p-0">
                              <img
                                src={`/upload/${
                                  userPost && userPost.post_image
                                }`}
                                width="100%"
                                alt="profile"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
            <div className="col-lg-3 col-12 px-2">
              <div className="pofile_left_side_sections">
                <p>Populer Profile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add post model */}
      <div
        className="modal fade"
        id="addPostModal"
        tabIndex="-1"
        aria-labelledby="addPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title alumni_heading" id="addpostModalLabel">
                Your Post Section
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                encType="multipart/form-data"
                method="post"
                onSubmit={addPostData}
              >
                <div className="mb-3">
                  <label
                    htmlFor="alumniPostAddress"
                    className="form-label fw-semibold"
                  >
                    Post Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="post_title"
                    id="alumniPostAddress"
                    placeholder="Enter Post Name"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="alumniPostImage"
                    className="form-label fw-semibold"
                  >
                    Post Name:-
                  </label>
                  <input
                    type="file"
                    name="post_image"
                    id="alumniPostImage"
                    className="form-control form-control-sm"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-2">
                  {addPost.post_image ? (
                    <img
                      src={URL.createObjectURL(addPost.post_image)}
                      alt="institute"
                      width="80px"
                    />
                  ) : (
                    ""
                  )}
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
                    type="submit"
                    className="btn btn-primary ms-3"
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

      {/* edit data modal section start */}
      <div
        className="modal fade"
        id="editPostModal"
        tabIndex="-1"
        aria-labelledby="editPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title alumni_heading" id="addpostModalLabel">
                Your Edit Post Section
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
                <div className="mb-3">
                  <label
                    htmlFor="alumniPostAddress"
                    className="form-label fw-semibold"
                  >
                    Post Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="post_title"
                    id="alumniPostAddress"
                    placeholder="Enter Post Name"
                    onChange={handleEditChange}
                    value={editPost.post_title}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniPostImage"
                    className="form-label fw-semibold"
                  >
                    Post Name:-
                  </label>
                  <input
                    type="file"
                    name="post_image"
                    id="alumniPostImage"
                    className="form-control form-control-sm"
                    onChange={handleEditFileChange}
                  />
                </div>
                {editPostImage.post_image ? (
                  <img
                    src={editPostImage.post_image}
                    width="100px"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`/upload/${
                      editPostImage.post_image
                        ? editPostImage.post_image
                        : "bgCover.jpeg"
                    }`}
                    width="100px"
                    alt="default-post"
                    className="mt-2"
                  />
                )}
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
                    onClick={() => {
                      saveEditPost(editPost.id);
                    }}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You Want To Delete this data?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleDeletePostData(selectedCategory.id);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Post;
