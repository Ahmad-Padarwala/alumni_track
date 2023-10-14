import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkDetail = (props) => {
  const user_id = props.id;
  const [getWorkDetail, setGetWorkDetail] = useState([]);
  const [addWorkData, setAddWorkData] = useState({
    job_title: "",
    compeny_name: "",
    compeny_location: "",
    job_startDate: "",
    job_endDate: "",
  });
  const [editWorkData, setEditWorkData] = useState({
    job_title: "",
    compeny_name: "",
    compeny_location: "",
    job_startDate: "",
    job_endDate: "",
  });
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleClickOpen = (education) => {
    setOpen(true);
    setSelectedCategory(education);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getWorkDetailData(user_id);
  }, [user_id]);

  const getWorkDetailData = (id) => {
    axios
      .get(`${PORT}getworksData/${id}`)
      .then((res) => {
        setGetWorkDetail(res.data);
      })
      .catch((err) => {
        console.log(err, "error in getting workDetailData");
      });
  };

  //add work detai data section start
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddWorkData((prevWorkData) => ({
      ...prevWorkData,
      [name]: value,
    }));
  };

  const handleAddWorkData = (e) => {
    e.preventDefault();
    const workData = {
      job_title: addWorkData.job_title,
      compeny_name: addWorkData.compeny_name,
      compeny_location: addWorkData.compeny_location,
      job_startDate: addWorkData.job_startDate,
      job_endDate: addWorkData.job_endDate,
    };
    axios
      .post(`${PORT}addWorksData/${user_id}`, workData)
      .then(() => {
        getWorkDetailData(user_id);
        const form = e.target;
        form.reset();
        toast.success("Work Detail Succesfullly Added !");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  //edit data section start
  const geteditWorkDetailData = (id) => {
    axios
      .get(`${PORT}geteditworksData/${id}`)
      .then((res) => {
        setEditWorkData(res.data[0]);
      })
      .catch((err) => {
        console.log(err, "error in getting workDetailData");
      });
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditWorkData((prevWorkData) => ({
      ...prevWorkData,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    const formData = new FormData();
    formData.append("id", editWorkData.id);
    formData.append("job_title", editWorkData.job_title);
    formData.append("compeny_name", editWorkData.compeny_name);
    formData.append("compeny_location", editWorkData.compeny_location);
    formData.append("job_startDate", editWorkData.job_startDate);
    formData.append("job_endDate", editWorkData.job_endDate);
    axios
      .put(`${PORT}editWorkssData/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        getWorkDetailData(user_id);
        if (response.status === 200) {
          toast.success("Work Detail Succesfullly Edit !");
        } else {
          console.log("Error updating skill data in skill.js: ", response);
        }
      })
      .catch((error) => {
        console.log("Error updating skill data in skill.js: ", error);
      });
  };

  //delete data section start
  const handleDeleteWorksData = (id) => {
    axios
      .delete(`${PORT}deleteWorksData/${id}`)
      .then(() => {
        getWorkDetailData(user_id);
        setOpen(false);
        toast.success("Work Detail Succesfullly Deleted !");
      })
      .catch((err) => {
        console.log(err, "error in deleting skill data");
      });
  };

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
      <div className="pofile_left_side_sections px-3 pt-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="fs-5 fw-semibold">Work Detail</p>
          </div>
          <div>
            <NavLink
              to="/user-profile"
              className="education_opr_icon"
              data-bs-toggle="modal"
              data-bs-target="#addWorkDteailModal"
            >
              <i className="fa-solid fa-plus"></i>
            </NavLink>
          </div>
        </div>
        {getWorkDetail.map((worksData) => {
          return (
            <div key={worksData.id} className="d-flex mb-2">
              <div>
                <img
                  src={require("../../assets/image/educationImages.png")}
                  alt="education_image"
                  width="50px"
                />
              </div>
              <div className="ms-2">
                <p className="fs-6 fw-semibold mb-0">{worksData.job_title}</p>
                <p className="mb-0 text-sm">{worksData.compeny_name}</p>
                {worksData.job_startDate && worksData.job_endDate && (
                  <p>
                    {new Date(worksData.job_startDate).toLocaleString(
                      "default",
                      { month: "long" }
                    )}{" "}
                    {new Date(worksData.job_startDate).getFullYear()} -{" "}
                    {new Date(worksData.job_endDate).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(worksData.job_endDate).getFullYear()}
                  </p>
                )}
              </div>
              <span className="ms-auto">
                <NavLink
                  to="/user-profile"
                  className="education_opr_icon"
                  data-bs-toggle="modal"
                  data-bs-target="#editWorkDteailModal"
                  onClick={() => {
                    geteditWorkDetailData(worksData.id);
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </NavLink>
                <NavLink
                  to="/user-profile"
                  onClick={() => handleClickOpen(worksData)}
                  className="education_opr_icon"
                >
                  <i className="fa-solid fa-trash"></i>
                </NavLink>
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
                        handleDeleteWorksData(selectedCategory.id);
                      }}
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </span>
            </div>
          );
        })}

        {/* add work detail section start */}
        <div
          className="modal fade"
          id="addWorkDteailModal"
          tabIndex="-1"
          aria-labelledby="addEducationModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addPofileModalLabel">
                  Your Work Detail Section
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form method="post" onSubmit={handleAddWorkData}>
                  <div className="mb-3">
                    <label
                      htmlFor="workDetailJobTitle"
                      className="form-label fw-semibold"
                    >
                      Job Title:-
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="job_title"
                      id="workDetailJobTitle"
                      placeholder="Enter Your Job Title"
                      onChange={handleAddInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="workDetailCompenyName"
                      className="form-label fw-semibold"
                    >
                      Compeny Name:-
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="compeny_name"
                      id="workDetailCompenyName"
                      placeholder="Enter Your Compeny Name"
                      onChange={handleAddInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="workDetailLocation"
                      className="form-label fw-semibold"
                    >
                      Compeny Location:-
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="compeny_location"
                      id="workDetailLocation"
                      onChange={handleAddInputChange}
                      placeholder="Enter Your Compeny Location"
                    />
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <div className="w-100">
                      <label
                        htmlFor="workDtailstart"
                        className="form-label fw-semibold"
                      >
                        Start Date:-
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="job_startDate"
                        id="workDtailstart"
                        onChange={handleAddInputChange}
                      />
                    </div>
                    <div className="w-100 ms-3">
                      <label
                        htmlFor="workDtailend"
                        className="form-label fw-semibold"
                      >
                        End Date:-
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="job_endDate"
                        id="workDtailend"
                        onChange={handleAddInputChange}
                      />
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

        {/* edit work detail section start */}
        <div
          className="modal fade"
          id="editWorkDteailModal"
          tabIndex="-1"
          aria-labelledby="addEducationModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p className="fs-5">Your Edit Work Detail Section</p>
                <div className="mb-3">
                  <label
                    htmlFor="workDetailJobTitle"
                    className="form-label fw-semibold"
                  >
                    Job Title:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="job_title"
                    id="workDetailJobTitle"
                    onChange={handleEditInputChange}
                    value={editWorkData && editWorkData.job_title}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="workDetailCompenyName"
                    className="form-label fw-semibold"
                  >
                    Compeny Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="compeny_name"
                    id="workDetailCompenyName"
                    onChange={handleEditInputChange}
                    value={editWorkData && editWorkData.compeny_name}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="workDetailLocation"
                    className="form-label fw-semibold"
                  >
                    Compeny Location:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="compeny_location"
                    id="workDetailLocation"
                    onChange={handleEditInputChange}
                    value={editWorkData && editWorkData.compeny_location}
                  />
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <div className="w-100">
                    <label
                      htmlFor="workDtailstart"
                      className="form-label fw-semibold"
                    >
                      Start Date:-
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="job_startDate"
                      id="workDtailstart"
                      format="dd-MM-yyyy"
                      onChange={handleEditInputChange}
                      value={
                        editWorkData && editWorkData.job_startDate
                          ? new Date(editWorkData.job_startDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                  </div>
                  <div className="w-100 ms-3">
                    <label
                      htmlFor="workDtailend"
                      className="form-label fw-semibold"
                    >
                      End Date:-
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="job_endDate"
                      id="workDtailend"
                      format="dd-MM-yyyy"
                      onChange={handleEditInputChange}
                      value={
                        editWorkData && editWorkData.job_endDate
                          ? new Date(editWorkData.job_endDate)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="d-flex float-end">
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleEdit(editWorkData && editWorkData.id);
                    }}
                    className="btn btn-primary ms-3"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkDetail;
