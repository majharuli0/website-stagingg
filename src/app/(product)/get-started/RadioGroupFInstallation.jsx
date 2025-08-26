import React from "react";

const RadioButtonGroup = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="flex items-center space-x-6">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="option"
          value="yes"
          className="hidden"
          checked={selectedOption === 1}
          onChange={() => setSelectedOption(1)}
        />
        <span
          className={`w-8 h-8 border-2 rounded-full flex items-center justify-center 
            ${
              selectedOption === 1 ? "border-primary" : "border-gray-300"
            } transition duration-150`}
          style={{ borderWidth: selectedOption === 1 ? "8px" : "2px" }}
        >
          {selectedOption === 1 && (
            <span className="w-4 h-4 bg-white rounded-full" />
          )}
        </span>
        <span className="ml-2 text-lg font-semibold">Yes</span>
      </label>

      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="option"
          value="no"
          className="hidden"
          checked={selectedOption === 0}
          onChange={() => setSelectedOption(0)}
        />
        <span
          className={`w-8 h-8 border-2 rounded-full flex items-center justify-center 
            ${
              selectedOption === "no" ? "border-gray-300" : "border-primary"
            } transition duration-150`}
          style={{ borderWidth: selectedOption === 0 ? "8px" : "2px" }}
        >
          {selectedOption === 0 && (
            <span className="w-4 h-4 bg-white rounded-full" />
          )}
        </span>
        <span className="ml-2 text-lg font-semibold">No</span>
      </label>
    </div>
  );
};

export default RadioButtonGroup;
