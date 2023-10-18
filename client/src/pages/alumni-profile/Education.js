import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const Education = (props) => {
  const [addEducation, setAddEducation] = useState({
    field_study: "",
    institute_name: "",
    study_startDate: "",
    study_endDate: "",
    result: "",
  });
  const [getEducation, setGetEducation] = useState([]);
  const [getEducationEdit, setGetEducationEdit] = useState({
    field_study: "",
    institute_name: "",
    study_startDate: "",
    study_endDate: "",
    result: "",
  });
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const user_id = props.id;

  useEffect(() => {
    getEducationData(user_id);
  }, [user_id]);

  const handleClickOpen = (education) => {
    setOpen(true);
    setSelectedCategory(education);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // get alumni education
  const getEducationData = async (id) => {
    try {
      const response = await axios.get(`${PORT}getEducationWithId/${id}`);
      if (response.status === 200) {
        setGetEducation(response.data);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err, "error in getting education data");
    }
  };

  //add alumni education
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddEducation((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const addAlumniEducation = (e) => {
    e.preventDefault();
    axios
      .post(`${PORT}addeducation/${user_id}`, addEducation)
      .then(() => {
        toast.success("Education add successfully");
        getEducationData(user_id);
        const form = e.target;
        form.reset();
      })
      .catch((error) => {
        console.log("Error adding brand data in Product.js:", error);
      });
  };
  const calculateDateDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    return {
      years: yearDiff,
      months: monthDiff,
    };
  };

  //edit education data
  const openEditModal = (educationId) => {
    fetchEducationDataForEdit(educationId);
  };
  const fetchEducationDataForEdit = async (selectedEducationId) => {
    if (selectedEducationId !== null) {
      try {
        const response = await axios.get(
          `${PORT}getEducationWithIdforedit/${selectedEducationId}`
        );
        if (response.status === 200) {
          setGetEducationEdit(response.data[0]);
        } else {
          console.log("Error fetching education data for edit");
        }
      } catch (err) {
        console.log("Error fetching education data for edit:", err);
      }
    }
  };
  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setGetEducationEdit((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const saveEducationEditData = async () => {
    const id = getEducationEdit.id;
    axios
      .put(`${PORT}editEducationData/${id}`, getEducationEdit)
      .then(() => {
        toast.success("Education Edit successfully");
        getEducationData(user_id);
      })
      .catch((error) => {
        console.log("Error editing brand data in Product.js:", error);
      });
  };

  //delete education data
  const handleEducationDelete = (deleteId) => {
    console.log(deleteId);
    axios
      .delete(`${PORT}deleteEducationData/${deleteId}`)
      .then(() => {
        getEducationData(user_id);
        setOpen(false);
        toast.success("Education Delete Successfully !");
      })
      .catch((error) => {
        console.log(error + "in delete");
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
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
      <div className="pofile_left_side_sections p-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="alumni_heading fw-semibold m-0">Education</p>
          </div>
          <div>
            <NavLink
              to="/user-profile"
              className="education_opr_icon text-primary"
              data-bs-toggle="modal"
              data-bs-target="#addEducationModal"
            >
              <i className="fa-solid fa-plus"></i>
            </NavLink>
          </div>
        </div>
        {getEducation.map((education, index) => (
          <div className="d-flex mt-3 justify-content-between" key={index}>
            <div className="d-flex">
              <div>
                <img
                  src={require("../../assets/image/educationImages.png")}
                  alt="education_image"
                  width="50px"
                />
              </div>
              <div className="ms-2 alumni_small_title">
                <p className="fs-6 fw-semibold mb-0">
                  {education.institute_name}
                </p>
                <p className="mb-0">
                  <span>{education.field_study}</span>
                  <span className="ms-2 education_dates">
                    ({education.result})
                  </span>
                </p>
                <p className="education_dates">
                  <span>{formatDate(education.study_startDate)}</span>
                  <span className="mx-1">-</span>
                  <span>{formatDate(education.study_endDate)}</span>
                  <span className="mx-1">-</span>
                  <span>
                    {
                      calculateDateDifference(
                        education.study_startDate,
                        education.study_endDate
                      ).years
                    }
                  </span>
                  <span className="mx-1">yr</span>
                  <span>
                    {
                      calculateDateDifference(
                        education.study_startDate,
                        education.study_endDate
                      ).months
                    }
                  </span>
                  <span className="mx-1">mon</span>
                </p>
              </div>
            </div>
            <div>
              <NavLink
                to="/user-profile"
                className="education_opr_icon text-success"
                onClick={() => openEditModal(education.id)}
                data-bs-toggle="modal"
                data-bs-target="#editEducationModal"
              >
                <i className="fa-solid fa-pen"></i>
              </NavLink>
              <span>
                <NavLink
                  to="/user-profile"
                  onClick={() => handleClickOpen(education)}
                  className="education_opr_icon text-danger"
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
                        handleEducationDelete(selectedCategory.id);
                      }}
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* add education modal */}
      <div
        className="modal fade"
        id="addEducationModal"
        tabIndex="-1"
        aria-labelledby="addEducationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title alumni_heading"
                id="addEducationModalLabel"
              >
                Your Education Section
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form method="post" className="mb-3" onSubmit={addAlumniEducation}>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="alumnieduinsti"
                    className="form-label fw-semibold"
                  >
                    Institute Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="institute_name"
                    id="alumnieduinsti"
                    placeholder="Enter Your Institute Name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniedufield"
                    className="form-label fw-semibold"
                  >
                    Field of Study:-
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="field_study"
                    id="alumniedufield"
                    placeholder="Enter Your Field of Study"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <div className="w-100">
                    <label
                      htmlFor="educationstart"
                      className="form-label fw-semibold"
                    >
                      Start Date:-
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      name="study_startDate"
                      id="educationstart"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="w-100 ms-3">
                    <label
                      htmlFor="educationend"
                      className="form-label fw-semibold"
                    >
                      End Date:-
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      name="study_endDate"
                      id="educationend"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="educationresult"
                    className="form-label fw-semibold"
                  >
                    Result:-
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="result"
                    id="educationresult"
                    onChange={handleInputChange}
                    placeholder="Enter Your Result"
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
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* edit education modal*/}
      <div
        className="modal fade"
        id="editEducationModal"
        tabIndex="-1"
        aria-labelledby="editEducationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title alumni_heading"
                id="editEducationModalLabel"
              >
                Ahmad Padarwala
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="alumnieduinsti"
                  className="form-label fw-semibold"
                >
                  Institute Name:-
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="institute_name"
                  id="alumnieduinsti"
                  value={getEducationEdit.institute_name}
                  onChange={handleEditInput}
                  placeholder="Enter Your Institute Name"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="alumniedufield"
                  className="form-label fw-semibold"
                >
                  Field of Study:-
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="field_study"
                  id="alumniedufield"
                  value={getEducationEdit.field_study}
                  onChange={handleEditInput}
                  placeholder="Enter Your Field of Study"
                />
              </div>
              <div className="mb-3 d-flex justify-content-between">
                <div className="w-100">
                  <label
                    htmlFor="educationstart"
                    className="form-label fw-semibold"
                  >
                    Start Date:-
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="study_startDate"
                    id="educationstart"
                    onChange={handleEditInput}
                    value={formatDateForInput(getEducationEdit.study_startDate)}
                  />
                </div>
                <div className="w-100 ms-3">
                  <label
                    htmlFor="educationend"
                    className="form-label fw-semibold"
                  >
                    End Date:-
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    name="study_endDate"
                    id="educationend"
                    onChange={handleEditInput}
                    value={formatDateForInput(getEducationEdit.study_endDate)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="educationresult"
                  className="form-label fw-semibold"
                >
                  Result:-
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="result"
                  id="educationresult"
                  placeholder="Enter Your Result"
                  onChange={handleEditInput}
                  value={getEducationEdit.result}
                />
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
                  className="btn btn-primary ms-3"
                  onClick={() => {
                    saveEducationEditData(getEducationEdit.id);
                  }}
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
    </>
  );
};

export default Education;
