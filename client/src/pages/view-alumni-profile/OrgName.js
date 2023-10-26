import React, { useEffect, useState } from "react";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrgName = (props) => {
  const [getUserOrg, setGetUserOrg] = useState([]);
  const [joinedOrgAss, setJoinedOrgAss] = useState([]);
  const [joinedOrgInfo, setJoinedOrgInfo] = useState([]);
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

  //get joined org associate
  const getJoinedOrgAss = async (user_id) => {
    axios
      .get(`${PORT}getJoinedOrgWithId/${user_id}`) // 1 is status
      .then((res) => {
        setJoinedOrgAss(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get joined org info
  const getJoinedOrgInfo = async (org_id) => {
    console.log(org_id);
    axios
      .get(`${PORT}getJoinedOrgInfoWithId/${org_id}`)
      .then((res) => {
        setJoinedOrgInfo((prevProfiles) => [...prevProfiles, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //view org account
  const viewYourOrgAcc = (id) => {
    navigate(`/view-organization/${id}`, {
      state: { id: id },
    });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  //watch org account
  const viewOrgProfile = (id) => {
    navigate(`/view-organization/${id}`, {
      state: { id: id },
    });
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  useEffect(() => {
    if (isAuth) {
      getOrganizationData(isAuth);
      localStorage.setItem("organization", isAuth);
      getJoinedOrgAss(isAuth);
    }
  }, [isAuth]);
  useEffect(() => {
    if (joinedOrgAss.length > 0) {
      joinedOrgAss.forEach(async (request) => {
        await getJoinedOrgInfo(request.org_id);
      });
    }
  }, [joinedOrgAss]);
  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <p className="alumni_heading fw-semibold">Your oraganization</p>
        {getUserOrg.map((organization) => {
          return (
            <div
              className="d-flex mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => {
                viewYourOrgAcc(organization.id);
              }}
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
        <div className="MuiTabPanel-root">
          {joinedOrgInfo.map((organization) => {
            return (
              <div
                key={organization.id}
                className="d-flex mb-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  viewOrgProfile(organization[0].id);
                }}
              >
                <div className="org-display-image">
                  {organization && organization[0].org_logo ? (
                    <img
                      src={`../upload/${organization[0].org_logo}`}
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
                  <p className="fs-6 fw-semibold mb-0">
                    {organization[0].org_name}
                  </p>
                  <p className="mb-0 alumni_small_title">
                    {organization[0].address}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrgName;
