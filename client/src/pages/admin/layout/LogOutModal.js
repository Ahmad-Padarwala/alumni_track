import React from "react";

const Modal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="logout_model align-items-center justify-content-center z-50">
      <div className="logout_model_inneer">
        <p className="text-secondary">Are you sure you want to log out?</p>
        <div className="mt-4 d-flex justify-content-end">
          <button
            className="btn btn-outline-primary btn-sm mx-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="btn btn-success btn-sm mx-2" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
