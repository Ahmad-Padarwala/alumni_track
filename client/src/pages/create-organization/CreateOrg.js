import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PORT from "../../assets/constant/Url";
import axios from "axios";

const CreateOrg = () => {
  const location = useLocation();
  const user_id = location.state;
  const [addOrgData, serAddOrgData] = useState({
    org_name: "",
    org_logo: null,
    org_description: "",
    address: "",
    website: "",
  });

  //add organization data
  const handleinputchange = (e) => {
    const { name, value } = e.target;
    serAddOrgData((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handlefilechange = (e) => {
    const file = e.target.files[0];
    serAddOrgData((prevProfileData) => ({
      ...prevProfileData,
      [e.target.name]: file,
    }));
    console.log(addOrgData);
  };
  const addOrganizationData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("org_name", addOrgData.org_name);
    formData.append("org_logo", addOrgData.org_logo);
    formData.append("org_description", addOrgData.org_description);
    formData.append("address", addOrgData.address);
    formData.append("website", addOrgData.website);

    try {
      await axios.post(`${PORT}addorganization-info/${user_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      toast.warning("Enter All Details");
      console.error("Error adding Alumniprofile data in Profile.js:", error);
    }
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
              <form method="post" onSubmit={addOrganizationData}>
                <div className="bg-white p-3 rounded">
                  <div className="form-group mb-2">
                    <label htmlFor="orgname">Name*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="orgname"
                      placeholder="Add your organization`s name"
                      name="org_name"
                      onChange={handleinputchange}
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
                      name="website"
                      onChange={handleinputchange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="orgaddress">Address*</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      id="orgaddress"
                      placeholder="Add your organization`s address"
                      name="address"
                      onChange={handleinputchange}
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="orglogo">Logo</label>
                    <input
                      type="file"
                      className="form-control mt-1"
                      id="orglogo"
                      name="org_logo"
                      onChange={handlefilechange}
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
                      name="org_description"
                      placeholder="ex: An information services firm helping small businesses succeed."
                      onChange={handleinputchange}
                    ></textarea>
                  </div>
                </div>
                <button className="float-end create_page_btn" type="submit">
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
                      {addOrgData.org_logo ? (
                        <img
                          src={`/upload/${addOrgData.org_logo}`}
                          alt="institue"
                          width="100px"
                        />
                      ) : (
                        <img
                          src={require("../../assets/image/institute.png")}
                          alt="institue"
                          width="100px"
                        />
                      )}
                    </div>
                    <p className="fw-semibold fs-5 m-0">
                      {addOrgData.org_name
                        ? addOrgData.org_name
                        : "Your Organization"}
                    </p>
                    <p style={{ cursor: "pointer" }}>
                      {addOrgData.website
                        ? addOrgData.website
                        : "www.yourwebsite.com"}
                    </p>
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
