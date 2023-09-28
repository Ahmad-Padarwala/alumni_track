import React from "react";
import { NavLink } from "react-router-dom";

const WorkDetail = () => {
  return (
    <>
      <div className="pofile_left_side_sections px-3 pt-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="fs-5 fw-semibold">Work Detail</p>
          </div>
          <div>
            <NavLink to="/user-profile" className="education_opr_icon">
              <i className="fa-solid fa-plus"></i>
            </NavLink>
            <NavLink to="/user-profile" className="education_opr_icon">
              <i className="fa-solid fa-pen"></i>
            </NavLink>
          </div>
        </div>
        <div className="d-flex mb-2">
          <div>
            <img
              src={require("../../assets/image/educationImages.png")}
              alt="education_image"
              width="50px"
            />
          </div>
          <div className="ms-2">
            <p className="fs-6 fw-semibold mb-0">Job Title</p>
            <p className="mb-0 text-sm">Company Name</p>
            <p>Job Start date - Job End Date</p>
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
            <p className="fs-6 fw-semibold mb-0">Job Title</p>
            <p className="mb-0 text-sm">Company Name</p>
            <p>Job Start date - Job End Date</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkDetail;
