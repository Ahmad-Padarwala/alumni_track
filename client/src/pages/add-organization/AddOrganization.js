import axios from "axios";
import React, { useState } from "react";
import CKEditor from "react-ckeditor-component";
import PORT from "../../assets/constant/Url";
import { useLocation, NavLink, useNavigate } from "react-router-dom";

const AddOrganization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const org_id = location.state;
  const [addOrgDesc, setAddOrgDesc] = useState({
    org_shortdesc: "",
    org_longdesc: "",
  });

  const handleShortChange = (content) => {
    setAddOrgDesc((prevData) => ({
      ...prevData,
      org_shortdesc: content,
    }));
  };
  const handleLongChange = (content) => {
    setAddOrgDesc((prevData) => ({
      ...prevData,
      org_longdesc: content,
    }));
  };
  const saveDescriptionData = () => {
    axios
      .put(`${PORT}addorgdescription/${org_id}`, addOrgDesc)
      .then(() => {
        navigate("/organization");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <h2>Add Your Organization Info</h2>
          <div className="p-3 shadow-sm">
            <form>
              <div className="mb-3">
                <label className="mb-1">Enter Short Description</label>
                <CKEditor
                  content={addOrgDesc.org_shortdesc}
                  events={{
                    change: (evt) => handleShortChange(evt.editor.getData()),
                  }}
                  name="org_shortdesc"
                  config={{ enterMode: 2, shiftEnterMode: 1 }}
                />
              </div>
              <div className="mb-3">
                <label className="mb-1">Enter Long Description</label>
                <CKEditor
                  content={addOrgDesc.org_longdesc}
                  events={{
                    change: (evt) => handleLongChange(evt.editor.getData()),
                  }}
                  name="org_longdesc"
                  config={{ enterMode: 2, shiftEnterMode: 1 }}
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
                  onClick={saveDescriptionData}
                  className="btn btn-success"
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

export default AddOrganization;
