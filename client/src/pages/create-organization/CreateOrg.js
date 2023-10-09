import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const CreateOrg = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="container-fluid create_org_top">
        <div className="container py-2">
          <div className="row">
            <NavLink className="text-primary" to="/organization">
              <i className="fa-solid fa-arrow-left me-2"></i>Back
            </NavLink>
            <div className="d-flex mt-2">
              <div>
                <img
                  src={require("../../assets/image/institute.png")}
                  alt="organization"
                  width="70px"
                />
              </div>
              <div className="ms-3 mt-3">
                <p className="m-0 create_org_text">
                  Let’s get started with a few details about your educational
                  institute. After creating the page, you can request to get
                  additional education features like the Alumni tool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5 create_org_form_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <form method="post">
                <div className="bg-white p-3 rounded">
                  <div className="form-group mb-2">
                    <label htmlFor="orgEmail">Email*</label>
                    <input
                      type="email"
                      className="form-control mt-1"
                      id="orgEmail"
                      placeholder="Add your Email Addres"
                      name="email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="orgpassword">Password*</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control mt-1"
                      id="orgpassword"
                      placeholder="Add your Password"
                      name="password"
                    />
                    <span
                      className="password_icon create_pass_icon"
                      style={{ cursor: "pointer" }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye-slash"></i>
                      ) : (
                        <i className="fa-solid fa-eye"></i>
                      )}
                    </span>
                  </div>

                  <div className="form-group mb-2">
                    <label htmlFor="orgname">Name*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="orgname"
                      placeholder="Add your organization`s name"
                      name="name"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="orgwebsite">website</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="orgwebsite"
                      aria-describedby="emailHelp"
                      placeholder="Begin with http://, https:// or www."
                      name="email"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="orgaddress">Address*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="orgaddress"
                      placeholder="Add your organization`s address"
                      name="email"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="orglogo">Logo</label>
                    <input
                      type="file"
                      className="form-control mt-1"
                      id="orglogo"
                      name="email"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="orgdescription">Description</label>
                    <br />
                    <textarea
                      className="p-2 rounded"
                      id="orgdescription"
                      cols="55"
                      rows="3"
                      name="description"
                      placeholder="ex: An information services firm helping small businesses succeed."
                    ></textarea>
                  </div>
                </div>
                <button className="float-end create_page_btn">
                  Create Page
                </button>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="bg-white p-3 rounded">
                <div>
                  <p className="m-0 fw-semibold">Your page preview</p>
                </div>
                <div className="org_main_form_section p-4">
                  <div className="bg-white p-3 rounded">
                    <div className="mb-2">
                      <img
                        src={require("../../assets/image/institute.png")}
                        alt="institue"
                        width="100px"
                      />
                    </div>
                    <p className="fw-semibold fs-5">Organization Name</p>
                    <p className="m-0">About</p>
                    <p>Your Description</p>
                    <p style={{ cursor: "pointer" }}>www.yourwebsite.com</p>
                    <button className="btn btn-primary" disabled>
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrg;
