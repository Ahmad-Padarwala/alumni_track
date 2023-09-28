import React from "react";

const OrgName = () => {
  return (
    <>
      <div className="pofile_left_side_sections p-3 ms-lg-3 mt-3">
        <p className="fs-5 fw-semibold">Oraganization</p>
        <div className="d-flex mb-3">
          <div>
            <img
              src={require("../../assets/image/educationImages.png")}
              alt="education_image"
              width="50px"
            />
          </div>
          <div className="ms-2">
            <p className="fs-6 fw-semibold mb-0">Organization Name</p>
            <p className="mb-0 text-sm">Organization Address</p>
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
            <p className="fs-6 fw-semibold mb-0">Organization Name</p>
            <p className="mb-0 text-sm">Organization Address</p>
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
            <p className="fs-6 fw-semibold mb-0">Organization Name</p>
            <p className="mb-0 text-sm">Organization Address</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrgName;
