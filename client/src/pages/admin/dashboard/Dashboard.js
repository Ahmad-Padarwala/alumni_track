import React from "react";
import "../../../../src/assets/css/admin/style.css";

const Dashboard = () => {
  return (
    <>
      <div className="px-5 dashboard relative">
        <div className="overview mt-8">
          <div className="title d-flex align-items-center">
            <i className="far fa-clock py-1 px-2 bg-primary rounded-md cursor-pointer text-white h2"></i>
            <span className="font-weight-bold ml-3 h2 pt-1">Dashboard</span>
          </div>
          <div className="d-flex justify-content-between flex-wrap mt-5">
            <div className="boxes d-flex flex-column align-items-center">
              <i className="fas fa-c"></i>
              <span>Blog Category</span>
              <span>Blog Category</span>
            </div>
            <div className="boxes d-flex flex-column align-items-center">
              <i className="fas fa-p"></i>
              <span>Total Blogs</span>
              <span>Total Blogs</span>
            </div>
            <div className="boxes d-flex flex-column align-items-center">
              <i className="fas fa-p"></i>
              <span>Publish Blogs</span>
              <span>Publish Blogs</span>
            </div>
            <div className="boxes boxe1 d-flex flex-column align-items-center">
              <i className="fas fa-p"></i>
              <span>Book Category</span>
              <span>Book Category</span>
            </div>
            <div className="boxes boxe1 d-flex flex-column align-items-center">
              <i className="fas fa-p"></i>
              <span>Book Posts</span>
              <span>Book Posts</span>
            </div>
            <div className="boxes boxe1 d-flex flex-column align-items-center">
              <i className="fas fa-p"></i>
              <span>Name Category</span>
              <span>Name Category</span>
            </div>
            <div className="boxes boxe1 d-flex flex-column align-items-center">
              <i className="fas fa-p"></i>
              <span>Names Post</span>
              <span>Names Post</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
