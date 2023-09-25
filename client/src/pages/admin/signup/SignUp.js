import React, { useEffect, useState } from "react";
import axios from "axios";
import PORT from "../../../assets/constant/Url";

const SignUp = () => {
  const [getSignUpdata, stGetSignUpData] = useState([]);
  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    axios
      .get(`${PORT}alumni-master`)
      .then((response) => {
        stGetSignUpData(response.data);
      })
      .catch((err) => {
        console.log(err, "error getting signup data in admin");
      });
  };
  return (
    <>
      <section className="dashboard relative px-6 py-3 bg-dark shadow-md">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="relative flex items-center w-50 ml-auto">
                  <input
                    type="text"
                    placeholder="Search Data"
                    className="form-control rounded-md px-3 py-2 pr-5"
                  />
                  <i className="fa fa-search text-gray-600 position-absolute end-0 top-50 translate-middle-y"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container dashboard mt-5 ms-0">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <i className="fa fa-clock py-1 px-2 bg-primary rounded cursor-pointer text-white fs-2"></i>
              <span className="fw-bold fs-3 ms-2 pt-1">Sign Up Data</span>
            </div>

            <table class="table table-striped mt-3">
              <thead>
                <tr>
                  <th className="fw-bold">Id</th>
                  <th className="fw-bold">Email Id</th>
                  <th className="fw-bold">Password</th>
                  <th className="fw-bold">User Name</th>
                </tr>
              </thead>
              <tbody>
                {getSignUpdata.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-red">
                      Data is not available.
                    </td>
                  </tr>
                ) : (
                  getSignUpdata.map((signup) => {
                    return (
                      <tr key={signup.id}>
                        <td className="py-6">{signup.id}</td>
                        <td className="py-6">{signup.email}</td>
                        <td className="py-6">{signup.password}</td>
                        <td className="py-6">{signup.username}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
