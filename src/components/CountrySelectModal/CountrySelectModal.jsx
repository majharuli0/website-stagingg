"use client";
import React from "react";
import { COUNTRIES } from "./countries.js";
import CountrySelector from "./Selector";
import { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
export default function CountryModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSelectedCountry = sessionStorage.getItem("countrySelected");
      if (!hasSelectedCountry) {
        setShowModal(true);
      }
    }
  }, []);

  const handleSelect = (country) => {
    sessionStorage.setItem("countrySelected", "true");
    if (country === "AU") {
      window.location.href = "https://seenyor.com.au";
    } else {
      window.location.href = "https://seenyor.com";
    }
  };
  const myRef = React.createRef();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState("AU");
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 scrollbar-none overflow-y-hidden">
      <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl text-center max-w-md w-full mx-4 transform transition-all duration-300 scale-100 ">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Select Your Region
        </h2>
        {/* <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSelect("Australia")}
            className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <span className="mr-2 text-2xl">🇦🇺</span>
            Australia
          </button>
          <button
            onClick={() => handleSelect("Other")}
            className="flex items-center justify-center bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            <span className="mr-2 text-2xl">🌍</span>
            Other
          </button>
        </div> */}
        {/* <ReactCountryDropdown
          onSelect={(country) => console.log(country.name)}
        /> */}
        <CountrySelector
          id={"countries"}
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={(val) => setCountry(val)}
          selectedValue={COUNTRIES.find((option) => option.value === country)}
        />
        <button
          disabled={!country}
          onClick={() => handleSelect(country)}
          className="flex items-center justify-center bg-primary text-white disabled:opacity-55 hover:bg-primary/90 px-6 py-2.5 mt-2 w-full rounded-lg transition-colors duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
