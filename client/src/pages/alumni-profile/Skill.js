import React from "react";
import { NavLink } from "react-router-dom";

const Skill = () => {
  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="fs-5 fw-semibold">Skills</p>
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
        <div className="border-bottom mb-3 pb-2">
          <span className="skill_name">Web Development</span>
        </div>
        <div className="border-bottom mb-3 pb-2">
          <span className="skill_name">Web Development</span>
        </div>
      </div>
    </>
  );
};

export default Skill;
