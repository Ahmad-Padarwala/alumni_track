import React, { useState, useEffect } from "react";
import PORT from "../../assets/constant/Url";
import axios from "axios";

const Education = (props) => {
  const [getEducation, setGetEducation] = useState([]);

  const user_id = props.id;

  useEffect(() => {
    getEducationData(user_id);
  }, [user_id]);

  // get alumni education
  const getEducationData = async (id) => {
    try {
      const response = await axios.get(`${PORT}getEducationWithId/${id}`);
      if (response.status === 200) {
        setGetEducation(response.data);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err, "error in getting education data");
    }
  };

  const calculateDateDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    return {
      years: yearDiff,
      months: monthDiff,
    };
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="alumni_heading fw-semibold m-0">Education</p>
          </div>
        </div>
        {getEducation.map((education, index) => (
          <div className="d-flex mt-3 justify-content-between" key={index}>
            <div className="d-flex">
              <div>
                <img
                  src={require("../../assets/image/educationImages.png")}
                  alt="education_image"
                  width="50px"
                />
              </div>
              <div className="ms-2 alumni_small_title">
                <p className="fs-6 fw-semibold mb-0">
                  {education.institute_name}
                </p>
                <p className="mb-0">
                  <span>{education.field_study}</span>
                  <span className="ms-2 education_dates">
                    ({education.result})
                  </span>
                </p>
                <p className="education_dates">
                  <span>{formatDate(education.study_startDate)}</span>
                  <span className="mx-1">-</span>
                  <span>{formatDate(education.study_endDate)}</span>
                  <span className="mx-1">-</span>
                  <span>
                    {
                      calculateDateDifference(
                        education.study_startDate,
                        education.study_endDate
                      ).years
                    }
                  </span>
                  <span className="mx-1">yr</span>
                  <span>
                    {
                      calculateDateDifference(
                        education.study_startDate,
                        education.study_endDate
                      ).months
                    }
                  </span>
                  <span className="mx-1">mon</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Education;
