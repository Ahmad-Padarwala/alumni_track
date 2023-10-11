import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

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
    if (!addSkillData.skill_name || !addSkillData.skill_level) {
      console.error("Skill Name and Skill Level are required.");
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
      })
      .catch((err) => {
        console.log(err, "error in deleting skill data");
      });
  };

  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="fs-5 fw-semibold">Skills</p>
          </div>
          <div>
            <NavLink
              to="/user-profile"
              className="education_opr_icon"
              data-bs-toggle="modal"
              data-bs-target="#addskillModal"
            >
              <i className="fa-solid fa-plus"></i>
            </NavLink>
            <NavLink
              to="/user-profile"
              className="education_opr_icon"
              data-bs-toggle="modal"
              data-bs-target="#editskillModal"
            >
              <i className="fa-solid fa-pen"></i>
            </NavLink>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between px-3">
          {getSkillData.map((skillData) => {
            return (
              <div className="d-flex flex-wrap" key={skillData.id}>
                <div>{skillData.skill_name}</div>
                <div>{skillData.skill_level}%</div>
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
              <h1 className="modal-title fs-5" id="addPofileModalLabel">
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
                    className="form-control"
                    name="skill_name"
                    id="alumniProfileAddress"
                    placeholder="Enter Your Skill Name"
                    onChange={hendleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileContact"
                    className="form-label fw-semibold"
                  >
                    Skill level:-
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="skill_level"
                    id="alumniProfileContact"
                    placeholder="Enter Your Skill level in Number."
                    onChange={hendleInputChange}
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
            <div className="modal-body">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addEducationModalLabel">
                  Your Skill Section
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
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
                    {getSkillData.map((skillsData) => {
                      return (
                        <tr key={skillsData.id} className="text-align-center">
                          <td>{skillsData.id}</td>
                          <td>{skillsData.skill_name}</td>
                          <td>{skillsData.skill_level}</td>
                          <td>
                            <NavLink
                              to="/user-profile"
                              onClick={() => {
                                handleEditSkillData(skillsData.id);
                              }}
                              className="education_opr_icon"
                              data-bs-toggle="modal"
                              data-bs-target="#editskillsModal"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </NavLink>
                            <span>
                              <NavLink
                                to="/user-profile"
                                onClick={() => handleClickOpen(skillsData)}
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
                                      handleDeleteSkillData(
                                        selectedCategory.id
                                      );
                                    }}
                                    autoFocus
                                  >
                                    Delete
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form encType="multipart/form-data" method="post">
                <p className="fs-5">Your Skill Section</p>
                <div className="mb-3">
                  <label
                    htmlFor="alumniProfileAddress"
                    className="form-label fw-semibold"
                  >
                    Skill Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                  <input
                    type="number"
                    className="form-control"
                    name="skill_level"
                    id="alumniProfileContact"
                    value={editSkillData && editSkillData.skill_level}
                    onChange={hendleEditInputChange}
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
    </>
  );
};

export default Skill;
