import React, { useEffect, useState } from "react";
import PORT from "../../assets/constant/Url";
import axios from "axios";

const Skill = (props) => {
  const [getSkillData, setGetSkillData] = useState([]);
  const user_id = props.id;

  useEffect(() => {
    getAlumniSkillData(user_id);
  }, [user_id]);

  // get alumni skill
  const getAlumniSkillData = async (id) => {
    try {
      const response = await axios.get(`${PORT}getskillsData/${id}`);
      if (response.status === 200) {
        setGetSkillData(response.data);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err, "error in getting education data");
    }
  };
  return (
    <>
      <div className="pofile_left_side_sections p-3 mt-3">
        <div className="d-flex justify-content-between">
          <div>
            <p className="alumni_heading fw-semibold">Skills</p>
          </div>
        </div>

        <div className="d-flex flex-wrap px-3">
          {getSkillData.map((skillData) => {
            return (
              <div className="main_skill_progress" key={skillData.id}>
                <div
                  role="progressbarr"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ "--value": skillData.skill_level }}
                ></div>
                <p className="alumni_small_title">{skillData.skill_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Skill;
