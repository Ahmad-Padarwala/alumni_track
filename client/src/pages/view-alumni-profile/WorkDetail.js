import React, { useEffect, useState } from "react";
import PORT from "../../assets/constant/Url";
import axios from "axios";

const WorkDetail = (props) => {
  const user_id = props.id;
  const [getWorkDetail, setGetWorkDetail] = useState([]);

  useEffect(() => {
    getWorkDetailData(user_id);
  }, [user_id]);

  const getWorkDetailData = (id) => {
    axios
      .get(`${PORT}getworksData/${id}`)
      .then((res) => {
        setGetWorkDetail(res.data);
      })
      .catch((err) => {
        console.log(err, "error in getting workDetailData");
      });
  };

  return (
    <>
      <div className="pofile_left_side_sections px-3 pt-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="alumni_heading fw-semibold">Work Detail</p>
          </div>
        </div>
        {getWorkDetail.map((worksData) => {
          return (
            <div key={worksData.id} className="d-flex mb-2">
              <div>
                <img
                  src={require("../../assets/image/educationImages.png")}
                  alt="education_image"
                  width="50px"
                />
              </div>
              <div className="ms-2">
                <p className="fs-6 fw-semibold mb-0">{worksData.job_title}</p>
                <p className="mb-0 alumni_small_title">
                  {worksData.compeny_name}
                </p>
                {worksData.job_startDate && worksData.job_endDate && (
                  <p className="alumni_small_title">
                    {new Date(worksData.job_startDate).toLocaleString(
                      "default",
                      { month: "long" }
                    )}{" "}
                    {new Date(worksData.job_startDate).getFullYear()} -{" "}
                    {new Date(worksData.job_endDate).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(worksData.job_endDate).getFullYear()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WorkDetail;
