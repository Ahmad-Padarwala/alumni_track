import React from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-8 col-12 p-0">
            <div className="pofile_left_side_sections pb-4">
              <div>
                <img
                  src={require("../../assets/image/coverBg.png")}
                  width="100%"
                  alt="coverBg"
                />
              </div>
              <div className="profile_image_main">
                <img
                  src={require("../../assets/image/profileImage.png")}
                  width="140px"
                  alt="profile"
                />
              </div>
              <div className="px-3">
                <div className="mt-5 fs-4 fw-semibold">
                  <p>Padarwala Ahmad</p>
                </div>
                <div>
                  <span>Alumni member Address</span>
                  <NavLink
                    to="/profile"
                    className="text-primary fw-semibold ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#contactModal"
                  >
                    Contact Info
                  </NavLink>
                </div>
                <div className="mt-2">
                  <button
                    className="alumni_req_btn fw-semibold"
                    data-bs-toggle="modal"
                    data-bs-target="#joinalumniModal"
                  >
                    Join Alumni
                  </button>
                </div>
              </div>
            </div>
            <div className="pofile_left_side_sections p-3 mt-2">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fs-5 fw-semibold">Education</p>
                </div>
                <div>
                  <NavLink to="/profile" className="education_opr_icon">
                    <i className="fa-solid fa-plus"></i>
                  </NavLink>
                  <NavLink to="/profile" className="education_opr_icon">
                    <i className="fa-solid fa-pen"></i>
                  </NavLink>
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
                  <p className="mb-0 text-sm">BCA, Computer Programming, Specific Application</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="contactModalLabel">
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
              <div className="d-flex justify-content-between">
                <p className="fs-5">Contact Info</p>
                <NavLink to="/profile">
                  <i className="fa-solid fa-pen text-dark"></i>
                </NavLink>
              </div>
              <div className="d-flex mb-3">
                <div className="mt-2">
                  <i className="fa-solid fa-phone fs-5"></i>
                </div>
                <div className="ms-2">
                  <p className="mb-0 fw-semibold fs-6">Phone</p>
                  <p className="mb-0">7383294925</p>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="mt-2">
                  <i className="fa-regular fa-envelope fs-5"></i>
                </div>
                <div className="ms-2">
                  <p className="mb-0 fw-semibold fs-6">Email</p>
                  <NavLink
                    to="mailto:ahmadpadarwala4@gmail.com"
                    className="mb-0 text-primary"
                  >
                    ahmadpadarwala4@gmail.com
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JoinAlumni Modal */}
      <div
        className="modal fade"
        id="joinalumniModal"
        tabIndex="-1"
        aria-labelledby="joinalumniModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="joinalumniModal">
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
              <div>
                <p className="fs-5">
                  Send a request to the organization you want to join
                </p>
              </div>
              <div>
                <select
                  className="form-select form-select"
                  aria-label="select example"
                  defaultValue="0"
                >
                  <option value="0">Select Organization</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mt-3 float-end">
                <button className="alumni_req_btn">Send Request</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
