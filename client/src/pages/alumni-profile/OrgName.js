import React, { useEffect, useState } from "react";
import PORT from "../../assets/constant/Url";
import axios from "axios";

const OrgName = () => {
  const [getAllOrg, setGetAllOrg] = useState([]);
  useEffect(() => {
    getOrganizationData();
  }, []);
  const getOrganizationData = () => {
    axios
      .get(`${PORT}getorganizations`)
      .then((res) => {
        setGetAllOrg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <p className="fs-5 fw-semibold">Oraganization</p>
        {getAllOrg.map((organization) => {
          return (
            <div className="d-flex mb-3" key={organization.id}>
              <div className="org-display-image">
                {organization && organization.org_logo ? (
                  <img
                    src={`./upload/${organization.org_logo}`}
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
                <p className="mb-0 text-sm">{organization.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default OrgName;
