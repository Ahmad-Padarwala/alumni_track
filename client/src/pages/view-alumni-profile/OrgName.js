import React, { useEffect, useState } from "react";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrgName = (props) => {
  const [getUserOrg, setGetUserOrg] = useState([]);
  const navigate = useNavigate();
  const isAuth = props.userId;

  const getOrganizationData = (userId) => {
    axios
      .get(`${PORT}getOrganizationWithId/${userId}`)
      .then((res) => {
        setGetUserOrg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //view org account
  const viewYourOrgAcc = () => {
    navigate("/organization");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    if (isAuth) {
      getOrganizationData(isAuth);
      localStorage.setItem("organization", isAuth);
    }
  }, [isAuth]);
  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <p className="alumni_heading fw-semibold">Your oraganization</p>
        {getUserOrg.map((organization) => {
          return (
            <div
              className="d-flex mb-3"
              style={{ cursor: "pointer" }}
              onClick={viewYourOrgAcc}
              key={organization.id}
            >
              <div className="org-display-image">
                {organization && organization.org_logo ? (
                  <img
                    src={`../upload/${organization.org_logo}`}
                    alt="orgimage"
                    width="50px"
                  />
                ) : (
                  <img
                    src={require("../../assets/image/educationImages.png")}
                    width="60px"
                    alt="default-profile"
                  />
                )}
              </div>
              <div className="ms-2">
                <p className="fs-6 fw-semibold mb-0">{organization.org_name}</p>
                <p className="mb-0 alumni_small_title">
                  {organization.address}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pofile_left_side_sections p-3 mt-3">
        <p className="alumni_heading fw-semibold">Joined oraganization</p>
      </div>
    </>
  );
};

export default OrgName;
