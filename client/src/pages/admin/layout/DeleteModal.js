import React from "react";

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center z-50`}
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
        <p className="text-gray-500">
          Are you sure you want to delete this data?
        </p>
        <div className="mt-4 relative justify-end">
          <button onClick={onClose} className="absolute -right-2 -top-24">
            <i className="fa-solid fa-xmark text-xl text-gray-500 "></i>
          </button>
          <button
            onClick={onDelete}
            className="float-right text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
