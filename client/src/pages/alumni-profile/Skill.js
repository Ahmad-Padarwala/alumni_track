import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../assets/constant/Url";
import axios from "axios";

const Skill = (props) => {
  const [getSkillData, setGetSkillData] = useState([]);
  const user_id = props.id;

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
              data-bs-target="#addSkillModal"
            >
              <i className="fa-solid fa-plus"></i>
            </NavLink>
          </div>
        </div>
        {getSkillData.map((skill) => {
          return (
            <div className="border-bottom mb-3 pb-2" key={skill.id}>
              <span className="skill_name">{skill.skill_name}</span>
            </div>
          );
        })}
      </div>

      {/* add education modal */}
      <div
        className="modal fade"
        id="addSkillModal"
        tabIndex="-1"
        aria-labelledby="addSkillModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addSkillModalLabel">
                Ahmad Padarwala
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form method="post" className="mb-3">
              <div className="modal-body">
                <p className="fs-5">Your Profile Section</p>
                <div className="mb-3">
                  <label
                    htmlFor="alumnieduinsti"
                    className="form-label fw-semibold"
                  >
                    Skill Name:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="institute_name"
                    id="alumnieduinsti"
                    placeholder="Enter Your Skill Name"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alumniedufield"
                    className="form-label fw-semibold"
                  >
                    Skill Level:-
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="field_study"
                    id="alumniedufield"
                    placeholder="Enter Your Skill Level"
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
    </>
  );
};

export default Skill;
