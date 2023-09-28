import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PORT from "../../assets/constant/Url";
import axios from "axios";

const Education = () => {
  const [addEducation, setAddEducation] = useState({
    field_study: "",
    institute_name: "",
    study_startDate: "",
    study_endDate: "",
    result: "",
  });
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
      .post(`${PORT}addeducation`, addEducation)
      .then(() => {
        console.log("object");
      })
      .catch((error) => {
        console.log("Error adding brand data in Product.js:", error);
      });
  };
  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="fs-5 fw-semibold">Education</p>
          </div>
          <div>
            <NavLink
              to="/user-profile"
              className="education_opr_icon"
              data-bs-toggle="modal"
              data-bs-target="#addEducationModal"
            >
              <i className="fa-solid fa-plus"></i>
            </NavLink>
            <NavLink
              to="/user-profile"
              className="education_opr_icon"
              data-bs-toggle="modal"
              data-bs-target="#addEducationModal"
            >
              <i className="fa-solid fa-pen"></i>
            </NavLink>
          </div>
        </div>

        <div className="d-flex mb-3">
          <div>
            <img
              src={require("../../assets/image/educationImages.png")}
              alt="education_image"
              width="50px"
            />
          </div>
          <div className="ms-2">
            <p className="fs-6 fw-semibold mb-0">Gokul Global University</p>
            <p className="mb-0 text-sm">
              BCA, Computer Programming, Specific Application
            </p>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <img
              src={require("../../assets/image/educationImages.png")}
              alt="education_image"
              width="50px"
            />
          </div>
          <div className="ms-2">
            <p className="fs-6 fw-semibold mb-0">Gokul Global University</p>
            <p className="mb-0 text-sm">
              BCA, Computer Programming, Specific Application
            </p>
          </div>
        </div>
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
              <h1 className="modal-title fs-5" id="addEducationModalLabel">
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
              <p className="fs-5">Your Profile Section</p>
              <div className="mb-3">
                <label
                  htmlFor="alumnieduinsti"
                  className="form-label fw-semibold"
                >
                  Institute Name:-
                </label>
                <input
                  type="text"
                  className="form-control"
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
                  className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                  className="form-control"
                  name="result"
                  id="educationresult"
                  onChange={handleInputChange}
                  placeholder="Enter Your Result"
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
                  onClick={addAlumniEducation}
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
    </>
  );
};

export default Education;
