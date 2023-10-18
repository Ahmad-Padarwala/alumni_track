import React from "react";
import { NavLink } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Man2TwoToneIcon from "@mui/icons-material/Man2TwoTone";

const Dashboard = () => {
  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <NavLink to="/admin">Home</NavLink>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section className="section dashboard">
          <div className="row">
            {/* <!-- Left side columns --> */}
            <div className="col-lg-8">
              <div className="row">
                {/* <!-- Sales Card --> */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <NavLink className="icon" to="/admin">
                        <i>
                          <MoreHorizIcon />
                        </i>
                      </NavLink>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">Student</h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i>
                            <Man2TwoToneIcon />
                          </i>
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Sales Card --> */}

                {/* <!-- Revenue Card --> */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <NavLink className="icon" to="/admin">
                        <i>
                          <MoreHorizIcon />
                        </i>
                      </NavLink>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">School/College</h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i>
                            <Man2TwoToneIcon />
                          </i>
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Revenue Card --> */}

                {/* <!-- Customers Card --> */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="filter">
                      <NavLink className="icon" to="/admin">
                        <i>
                          <MoreHorizIcon />
                        </i>
                      </NavLink>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">Companies</h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i>
                            <Man2TwoToneIcon />
                          </i>
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Customers Card --> */}
              </div>
            </div>
            {/* <!-- End Left side columns --> */}

            {/* <!-- Right side columns --> */}
            <div className="col-lg-4">
              {/* <!-- Recent Activity --> */}
              <div className="card">
                <div className="filter">
                  <NavLink className="icon" to="/admin">
                    <i>
                      <MoreHorizIcon />
                    </i>
                  </NavLink>
                </div>

                <div className="card-body">
                  <h5 className="card-title">
                    Recent Activity <span>| Today</span>
                  </h5>

                  <div className="activity">
                    <div className="activity-item d-flex">
                      <div className="activite-label">32 min</div>
                      <i className="fa-solid fa-circle activity-badge text-success align-self-start"></i>
                      <div className="activity-content">
                        Quia quae rerum
                        <a href="#" className="fw-bold text-dark">
                          explicabo officiis
                        </a>
                        beatae
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">56 min</div>
                      <i className="fa-solid fa-circle activity-badge text-danger align-self-start"></i>
                      <div className="activity-content">
                        Voluptatem blanditiis blanditiis eveniet
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">2 hrs</div>
                      <i className="fa-solid fa-circle activity-badge text-primary align-self-start"></i>
                      <div className="activity-content">
                        Voluptates corrupti molestias voluptatem
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">1 day</div>
                      <i className="fa-solid fa-circle activity-badge text-info align-self-start"></i>
                      <div className="activity-content">
                        Tempore autem saepe
                        <a href="#" className="fw-bold text-dark">
                          occaecati voluptatem
                        </a>
                        tempore
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">2 days</div>
                      <i className="fa-solid fa-circle activity-badge text-warning align-self-start"></i>
                      <div className="activity-content">
                        Est sit eum reiciendis exercitationem
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">4 weeks</div>
                      <i className="fa-solid fa-circle activity-badge text-muted align-self-start"></i>
                      <div className="activity-content">
                        Dicta dolorem harum nulla eius. Ut quidem quidem sit
                        quas
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}
                  </div>
                </div>
              </div>
              {/* <!-- End Recent Activity --> */}
            </div>
            {/* <!-- End Right side columns --> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
