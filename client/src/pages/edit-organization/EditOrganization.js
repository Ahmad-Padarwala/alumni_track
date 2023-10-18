import axios from "axios";
import React, { useEffect, useState } from "react";
import CKEditor from "react-ckeditor-component";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PORT from "../../assets/constant/Url";

const EditOrganization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const org_id = location.state;
  const [getOrgData, setGetOrgData] = useState([]);
  const [editProfileImageData, setEditProfileImageData] = useState({
    profile_picture: null,
    cover_background: null,
  });
  useEffect(() => {
    getOrganizationData(org_id);
  }, [org_id]);
  const getOrganizationData = (org_id) => {
    axios
      .get(`${PORT}getOrganizationforedit/${org_id}`)
      .then((res) => {
        setGetOrgData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setGetOrgData((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    const tempURL = URL.createObjectURL(file);

    setGetOrgData((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));

    setEditProfileImageData((prevImageData) => ({
      ...prevImageData,
      [event.target.name]: tempURL,
    }));
  };
  const handleShortChange = (content) => {
    setGetOrgData((prevData) => ({
      ...prevData,
      org_shortdesc: content,
    }));
  };
  const handleLongChange = (content) => {
    setGetOrgData((prevData) => ({
      ...prevData,
      org_longdesc: content,
    }));
  };
  const saveEditOrganization = async () => {
    const formData = new FormData();
    if (getOrgData.org_logo) {
      formData.append("org_logo", getOrgData.org_logo);
    }

    if (getOrgData.org_bg) {
      formData.append("org_bg", getOrgData.org_bg);
    }

    formData.append("org_name", getOrgData.org_name);
    formData.append("org_shortdesc", getOrgData.org_shortdesc);
    formData.append("org_longdesc", getOrgData.org_longdesc);
    formData.append("address", getOrgData.address);
    formData.append("website", getOrgData.website);

    await axios
      .put(`${PORT}editorganization/${org_id}`, formData)
      .then((res) => {
        navigate("/organization");
        window.scrollTo({ top: "0", behavior: "smooth" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container" style={{ padding: "80px 0px 40px 0px" }}>
        <div className="row">
          <h3>Edit Your Organization Info</h3>
          <div className="p-3 pofile_left_side_sections">
            <form>
              <div className="mb-3">
                <label className="mb-1">Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="org_name"
                  onChange={handleEditChange}
                  value={getOrgData.org_name}
                  placeholder="Enter Your Organization Name"
                />
              </div>
              <div className="mb-3">
                <label className="mb-1">Logo</label>
                <input
                  type="file"
                  className="form-control form-control-sm"
                  name="org_logo"
                  onChange={handleEditFileChange}
                />
                {editProfileImageData.org_logo ? (
                  <img
                    src={editProfileImageData.org_logo}
                    width="60px"
                    className="mt-2"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`/upload/${
                      getOrgData.org_logo ? getOrgData.org_logo : "coverBg.png"
                    }`}
                    width="60px"
                    alt="default-profile"
                    className="mt-2"
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="mb-1">Background Image</label>
                <input
                  type="file"
                  className="form-control form-control-sm"
                  name="org_bg"
                  onChange={handleEditFileChange}
                />
                {editProfileImageData.org_bg ? (
                  <img
                    src={editProfileImageData.org_bg}
                    width="70px"
                    className="mt-2"
                    alt="profile"
                  />
                ) : (
                  <img
                    src={`/upload/${
                      getOrgData.org_bg ? getOrgData.org_bg : "coverBg.png"
                    }`}
                    width="70px"
                    alt="default-profile"
                    className="mt-2"
                  />
                )}
              </div>
              <div className="mb-3">
                <label className="mb-1">Enter Short Description</label>
                <CKEditor
                  name="org_shortdesc"
                  content={getOrgData.org_shortdesc}
                  config={{ enterMode: 2, shiftEnterMode: 1 }}
                  events={{
                    change: (evt) => handleShortChange(evt.editor.getData()),
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="mb-1">Enter Long Description</label>
                <CKEditor
                  name="org_longdesc"
                  content={getOrgData.org_longdesc}
                  config={{ enterMode: 2, shiftEnterMode: 1 }}
                  events={{
                    change: (evt) => handleLongChange(evt.editor.getData()),
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleEditChange}
                  value={getOrgData.address}
                  className="form-control form-control-sm"
                  placeholder="Enter Your Organization Address"
                />
              </div>
              <div className="mb-3">
                <label className="mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  onChange={handleEditChange}
                  value={getOrgData.website}
                  className="form-control form-control-sm"
                  placeholder="Enter Your Organization Website"
                />
              </div>
              <div className="float-end">
                <NavLink
                  to="/organization"
                  type="button"
                  className="btn btn-danger me-2"
                >
                  Cancel
                </NavLink>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={saveEditOrganization}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrganization;
