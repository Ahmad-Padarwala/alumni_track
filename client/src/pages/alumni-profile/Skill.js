import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "@mui/material/Slider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Skill = (props) => {
  const [getSkillData, setGetSkillData] = useState([]);
  const user_id = props.id;
  const [addSkillData, setAddSkillData] = useState({
    skill_name: "",
    skill_level: "",
  });
  const [editSkillData, setEditSkillData] = useState({
    skill_name: "",
    skill_level: "",
  });
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleClickOpen = (education) => {
    setOpen(true);
    setSelectedCategory(education);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAlumniSkillData(user_id);
  }, [user_id]);

  // get alumni skill
  const getAlumniSkillData = async (id) => {
    try {
      const response = await axios.get(`${PORT}getskillsData/${id}`);
      if (response.status === 200) {
        setGetSkillData(response.data);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err, "error in getting education data");
    }
  };

  //add skill data section
  const hendleInputChange = (e) => {
    const { name, value } = e.target;
    setAddSkillData((prevSkillData) => ({
      ...prevSkillData,
      [name]: value,
    }));
  };
  const saveAddSkillData = (e) => {
    e.preventDefault();
    if (!addSkillData.skill_name) {
      toast.error("Skill Name is required.");
      return;
    }
    if (!addSkillData.skill_level) {
      toast.error("Skill Level is required.");
      return;
    }
    const skillData = {
      skill_name: addSkillData.skill_name,
      skill_level: addSkillData.skill_level,
    };
    axios
      .post(`${PORT}addSkillsData/${user_id}`, skillData)
      .then(() => {
        getAlumniSkillData(user_id);
        const form = e.target;
        form.reset();
        toast.success("Skill Add Successfully !");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  //edit data section start
  const handleEditSkillData = (id) => {
    axios
      .get(`${PORT}getSkillDataForEdit/${id}`)
      .then((res) => {
        setEditSkillData(res.data[0]);
      })
      .catch((err) => {
        console.log(err, "Error in gettin data for edit skill data");
      });
  };
  const hendleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditSkillData((prevSkillData) => ({
      ...prevSkillData,
      [name]: value,
    }));
  };
  const handleSaveEditData = (id) => {
    const formData = new FormData();
    formData.append("id", editSkillData.id);
    formData.append("skill_name", editSkillData.skill_name);
    formData.append("skill_level", editSkillData.skill_level);
    axios
      .put(`${PORT}editSkillsData/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        getAlumniSkillData(user_id);
        if (response.status === 200) {
          toast.success("Skill Edit Successfully !");
        } else {
          console.log("Error updating skill data in skill.js: ", response);
        }
      })
      .catch((error) => {
        console.log("Error updating skill data in skill.js: ", error);
      });
  };

  //delete skill data section start
  const handleDeleteSkillData = (id) => {
    axios
      .delete(`${PORT}deleteSkillData/${id}`)
      .then(() => {
        getAlumniSkillData(user_id);
        setOpen(false);
        toast.success("Skill Delete Successfully !");
      })
      .catch((err) => {
        console.log(err, "error in deleting skill data");
      });
  };

  //view edit skill data
  const getPaginatedSkillData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return getSkillData.slice(startIndex, endIndex);
  };

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
      <div className="pofile_left_side_sections p-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="alumni_heading fw-semibold">Skills</p>
          </div>
          <div>
            <NavLink
              to="/user-profile"
              className="education_opr_icon text-primary"
              data-bs-toggle="modal"
              data-bs-target="#addskillModal"
            >
              <i className="fa-solid fa-plus"></i>
            </NavLink>
            <NavLink
              to="/user-profile"
              className="education_opr_icon text-success"
              data-bs-toggle="modal"
              data-bs-target="#editskillModal"
            >
              <i className="fa-solid fa-pen"></i>
            </NavLink>
          </div>
        </div>

        <div className="d-flex flex-wrap px-3">
          {getSkillData.map((skillData) => {
            return (
              <div className="main_skill_progress" key={skillData.id}>
                <div
                  role="progressbarr"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ "--value": skillData.skill_level }}
                ></div>
                <p className="alumni_small_title">{skillData.skill_name}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* add model */}
      <div
        className="modal fade"
        id="addskillModal"
        tabIndex="-1"
        aria-labelledby="addPofileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title alumni_heading"
                id="addPofileModalLabel"
              >
                Your Skill Section
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
                onSubmit={saveAddSkillData}
              >
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileAddress"
                    className="form-label fw-semibold"
                  >
                    Skill Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="skill_name"
                    id="alumniProfileAddress"
                    placeholder="Enter Your Skill Name"
                    onChange={hendleInputChange}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="alumniProfilelevel"
                    className="form-label fw-semibold"
                  >
                    Skill Level:-{addSkillData.skill_level}
                  </label>
                  <Slider
                    name="skill_level"
                    value={addSkillData.skill_level}
                    onChange={hendleInputChange}
                    valueLabelDisplay="auto"
                    aria-label="Skill Level"
                    min={0}
                    max={100}
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

      {/* edit view skill model */}
      <div
        className="modal fade"
        id="editskillModal"
        tabIndex="-1"
        aria-labelledby="addPofileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title alumni_heading"
                id="addEducationModalLabel"
              >
                Your Skill Section
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form encType="multipart/form-data" method="post">
                <table className="table">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Skill_name</th>
                      <th>Skill_level</th>
                      <th>Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedSkillData().map((skillsData) => {
                      return (
                        <tr
                          key={skillsData.id}
                          className="text-align-center alumni_small_title"
                        >
                          <td>{skillsData.id}</td>
                          <td>{skillsData.skill_name}</td>
                          <td>{skillsData.skill_level}</td>
                          <td>
                            <NavLink
                              to="/user-profile"
                              onClick={() => {
                                handleEditSkillData(skillsData.id);
                              }}
                              className="education_opr_icon text-success"
                              data-bs-toggle="modal"
                              data-bs-target="#editskillsModal"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </NavLink>
                            <span>
                              <NavLink
                                to="/user-profile"
                                onClick={() => handleClickOpen(skillsData)}
                                className="education_opr_icon text-danger"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </NavLink>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(getSkillData.length / itemsPerPage)}
                    color="primary"
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                  />
                </Stack>
                <div className="d-flex float-end">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* edit skill section */}
      <div
        className="modal fade"
        id="editskillsModal"
        tabIndex="-1"
        aria-labelledby="addPofileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title alumni_heading"
                id="addEducationModalLabel"
              >
                Your Skill Section
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form encType="multipart/form-data" method="post">
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileAddress"
                    className="form-label fw-semibold"
                  >
                    Skill Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="skill_name"
                    id="alumniProfileAddress"
                    value={editSkillData && editSkillData.skill_name}
                    onChange={hendleEditInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileContact"
                    className="form-label fw-semibold"
                  >
                    Skill level:-
                  </label>
                  <Slider
                    name="skill_level"
                    value={editSkillData && editSkillData.skill_level}
                    onChange={hendleEditInputChange}
                    valueLabelDisplay="auto"
                    aria-label="Skill Level"
                    min={0}
                    max={100}
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
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      handleSaveEditData(editSkillData && editSkillData.id);
                    }}
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
              handleDeleteSkillData(selectedCategory.id);
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

export default Skill;
