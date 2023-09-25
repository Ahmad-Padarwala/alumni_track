import React from "react";
import "../../assets/css/Home.css";

const HeroSection = () => {
  return (
    <>
      <div className="container-fluid Hero_Main">
        <div className="container Hero_Main ">
          <div className=" hero_text">
            <p className="hero_Header ">track your alumni member here</p>
            <p className="hero_detail">
              bus repellendus totam in, repellat officia voluptas soluta laborum
              ab ipsa odio est labore? Esse facerLorem ipsum dolor sit amet
              consectetur adipisicing elit. Ad, quod nemo omnis modi, laudantium
              necessitatie iure consequatur assumenda sit itaque
            </p>
          </div>
          <div className="text-center hero_img">
            <img src={require("../../assets/image/heroImage1.png")} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
