import React from "react";

const SysPopUp = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Enter Your Email</h2>
        <input
          type="email"
          placeholder="Write your e-mail here"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={onClose}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
