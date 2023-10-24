import React, { useEffect, useState } from "react";
import PORT from "../../assets/constant/Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";

const OrgName = (props) => {
  const [getUserOrg, setGetUserOrg] = useState([]);
  const [deleteCode, setDeleteCode] = useState("");
  const navigate = useNavigate();
  const isAuth = props.userId;

  //open delete modal
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleClickOpen = (education) => {
    setOpen(true);
    setSelectedCategory(education);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
    localStorage.setItem("organization", isAuth);
    navigate("/organization");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //delete org
  const deleteOrgAccount = (orgId) => {
    setDeleteCode(document.getElementById("deletecode").value);
    if (deleteCode == 1234) {
      axios
        .put(`${PORT}deleteOrgAccount/${orgId}`)
        .then((res) => {
          setOpen(false);
          getOrganizationData(isAuth);
          toast.success("Your Organization Delete Successfully!");
          localStorage.removeItem("organization");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Fill The Correct Number!");
    }
  };

  useEffect(() => {
    if (isAuth) {
      getOrganizationData(isAuth);
    }
  }, [isAuth]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="pofile_left_side_sections p-3 mt-3">
        <p className="alumni_heading fw-semibold">Your oraganization</p>
        {getUserOrg.map((organization) => {
          return (
            <div className="d-flex justify-content-between">
              <div
                key={organization.id}
                className="d-flex mb-3"
                style={{ cursor: "pointer" }}
                onClick={viewYourOrgAcc}
              >
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
                  <p className="fs-6 fw-semibold mb-0">
                    {organization.org_name}
                  </p>
                  <p className="mb-0 alumni_small_title">
                    {organization.address}
                  </p>
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="border-0 bg-transparent"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul className="dropdown-menu acc_delete_drop">
                  <span
                    onClick={() => handleClickOpen(organization)}
                    to="/"
                    className="text-danger"
                  >
                    Delete
                  </span>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pofile_left_side_sections p-3 mt-3">
        <p className="alumni_heading fw-semibold">Joined oraganization</p>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You Want To Delete Your Account ?"}
        </DialogTitle>
        <div className="px-4">
          <p
            className="alumni_small_title mb-2"
            style={{
              color: deleteCode !== "1234" ? "red" : "black",
            }}
          >
            Please Write:- 1234
          </p>
          <TextField
            label="Number"
            type="number"
            id="deletecode"
            value={deleteCode}
            onChange={(e) => setDeleteCode(e.target.value)}
          />
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              deleteOrgAccount(selectedCategory.id);
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrgName;
