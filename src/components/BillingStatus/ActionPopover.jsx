import React, { useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react"; // Ensure this import is present

export default function ActionPopover({ options, isOpen, onToggle }) {
  const popoverRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        if (iconRef.current && iconRef.current.contains(event.target)) {
          onToggle(); // Open the popover if the icon is clicked
        } else {
          onToggle(); // Close the popover if clicked outside
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  return (
    <div className="flex items-center relative">
      <a
        ref={iconRef}
        className="flex items-center text-gray-500 cursor-pointer z-0"
        onClick={onToggle}
      >
        <EllipsisVertical size={20} />
      </a>
      {isOpen && (
        <div
          ref={popoverRef}
          className="z-50 absolute top-full right-5 m-1 bg-white border border-gray-300 rounded shadow-lg max-w-fit"
        >
          {options.map((option, index) => (
            <button
              key={index}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                option.onClick();
                onToggle();
              }}
            >
              <div className="flex items-center gap-2 text-nowrap">
                {option.icon}
                {option.label}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
