"use client";

import React, { useState } from "react";
import Loader from "@/components/SystemBuild/Loader";
import Link from "next/link";
import DeviceCard from "./DeviceCard";

const DeviceInfo = () => {
  const [deviceUid, setDeviceUid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Custom validation: Check if the input is empty
    if (!deviceUid.trim()) {
      setErrorMessage("Please enter your Device UID."); // Custom error message
      return;
    }

    setErrorMessage(""); // Clear the error if input is valid

    // Simulate loading state
    setLoading(true);

    // Simulate an asynchronous operation (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      setVerified(true); // Mark as verified
    }, 2000); // Simulate 2 seconds of loading time
  };

  return (
    <>
      {/* Show Loader if loading */}
      {loading && <Loader />}

      {!loading && (
        <div className="container font-poppins text-[#1D293F] items-center justify-center flex flex-col gap-[60px] mt-40 mb-10">
          {/* Header */}
          <h1 className="text-[35px] md:text-[26px] font-bold">
            Device Information
          </h1>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#F6F7F7] w-[800px] rounded-[35px] flex flex-col items-center justify-center px-10"
            noValidate // Prevents browser from showing default validation
          >
            {/* Input Field */}
            <div className="w-full mb-5 p-[30px] flex flex-col gap-[30px]">
              <h3 className="text-[28px] font-semibold">Verify your device</h3>
              <div className="flex w-full items-end gap-[16px]">
                <div className="w-full flex flex-col gap-3">
                  <label className="text-[20px] font-semibold">
                    Device UID
                  </label>
                  <input
                    id="device-uid"
                    name="deviceUid"
                    type="text"
                    value={deviceUid}
                    onChange={(e) => setDeviceUid(e.target.value)}
                    placeholder="ex: 4678469JDUE7DBFE8N"
                    className="w-full h-[60px] px-4 rounded-[10px] bg-slate-200/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61C7AA] focus:shadow-inner transition-shadow duration-300 ease-in-out"
                  />
                </div>
                {/* Verify Button */}
                <button
                  type="submit"
                  className="bg-[#70B896] active:scale-95 text-white text-[18px] h-[60px] w-[150px] rounded-[10px] hover:bg-[#4FAF8D]"
                >
                  Verify
                </button>
              </div>
              {/* Error Message */}
              {errorMessage && (
                <p className="text-red-500 text-[14px]">{errorMessage}</p>
              )}
            </div>
          </form>

          {/* Display success message after verification */}
          {verified && (
            <p className="text-green-500 text-[18px] font-bold">
              Device UID Verified Successfully!
            </p>
          )}

          {/* Card */}
          <DeviceCard />
          {/* {devices.map((device, index) => (
            <DeviceCard
              key={index}
              image={device.image}
              id={device.id}
              number={device.number}
              qty={device.qty}
            />
          ))} */}

          {/* Navigation Button */}
          <button className="w-[800px] active:scale-95 bg-gradient-to-r from-[#A2CDB9] to-[#5BAE87] text-white text-[18px] px-8 py-3 rounded-[15px]">
            Next
          </button>

          <div className="flex items-center gap-1">
            {/* Sign-In Link */}
            <p className="text-[18px] text-center text-[#6C7482]">
              Already I have an account.{" "}
            </p>
            <Link
              href="#"
              className="text-[#70B896] font-semibold text-[18px] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceInfo;
