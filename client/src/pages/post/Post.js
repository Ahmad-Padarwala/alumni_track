import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/Profile.css";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [getAlumniProfile, setGetAlumniProfile] = useState([]);
  const [userId, setUserId] = useState();
  const [getPostData, setGetPostData] = useState([]);
  const [addPost, setAddPost] = useState({
    post_title: "",
    post_image: null,
    post_video: null,
  });
  const [editPost, setEditPost] = useState([]);
  const [editPostImage, setEditPostImage] = useState({
    post_image: null,
  });
  const isAuth = localStorage.getItem("user");
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  //using ref for gallary
  const inputRef = useRef(null);
  const handleImageClick = () => {
    inputRef.current.click();
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

  useEffect(() => {
    if (userId) {
      getAlumniProfileData(userId);
      getAllPostData();
    }
  }, [userId, addPost, getPostData]);
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
                <p className="text-center mt-5 alumni_heading">
                  <span className="alumni_small_title me-1">Welcome</span>
                  {getAlumniProfile && getAlumniProfile.username
                    ? getAlumniProfile.username
                    : ""}
                </p>
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
              {getPostData.length > 0 ? (
                getPostData.map((post) => (
                  <div className="pofile_left_side_sections mt-3" key={post.id}>
                    <div className="d-flex">
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
                      <div>
                        <p className="mt-2 ms-1 fw-bold fs-5">Patel Amil</p>
                      </div>
                      <div className="three_dotes" onClick={toggleDropdown}>
                        <i className="fas fa-ellipsis"></i>
                        {isDropdownVisible && (
                          <div className="dropdown-content">
                            <p
                              className="alumni_small_title"
                              data-bs-toggle="modal"
                              data-bs-target="#editPostModal"
                              onClick={() => {
                                getPostDataforEdit(post.id);
                              }}
                            >
                              Edit Post
                            </p>
                            <p className="alumni_small_title">Delete Post</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-4 ms-2">{post && post.post_title}</p>
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
                <div>
                  <div className="mb-2">
                    {addPost.post_image ? (
                      <img
                        src={URL.createObjectURL(addPost.post_image)}
                        alt="institute"
                        width="100px"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="gelary_image" onClick={handleImageClick}>
                  <img
                    src={require("../../assets/image/galarry.png")}
                    alt="galaryImage"
                  />
                  <input
                    type="file"
                    ref={inputRef}
                    name="post_image"
                    onChange={handleImageChange}
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

                {editPostImage.post_image ? (
                  <img
                    src={editPostImage.post_image}
                    width="100px"
                    className="mt-2"
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
                <div className="gelary_image" onClick={handleImageClick}>
                  <img
                    src={require("../../assets/image/galarry.png")}
                    alt="galaryImage"
                  />
                  <input
                    type="file"
                    ref={inputRef}
                    name="post_image"
                    onChange={handleEditFileChange}
                    style={{ display: "none" }}
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
    </>
  );
};

export default Post;
