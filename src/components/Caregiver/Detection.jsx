import React from "react";
import MonitoringCarousel from "@/components/Carousel/MonitoringCarousel";

const Detection = () => {
  return (
    <div>
      <div className="mb-3 max-w-[1720px] my-0 mx-auto w-full rounded-xl  md:p-5 tab:p-2">
        <p className="tab:hidden  text-[40px] md:text-[2rem] tab:text-2xl font-semibold text-center py-2">
          Advanced Detection Features
        </p>
        <p className="tab:hidden text-center mb-5 text-[37px] md:text-xl tab:text-lg w-full px-5">
          Ensuring safety by monitoring falls, vital signs, and health events.
        </p>

        <button className="hidden cursor-text mx-auto tab:block bg-neutral-950 rounded-2xl  text-white my-0 text-base  px-7 py-[8px] font-bold">
          ADVANCED DETECTION FEATURES
        </button>
        <h3 className="text-2xl hidden tab:block text-[#2C3142] text-center font-bold my-3">
          Ensuring safety by monitoring falls, vital signs, and health events.
        </h3>
        <MonitoringCarousel />
      </div>
    </div>
  );
};

export default Detection;
