import LoaderIconT from "@/assets/LoaderIconT";
import React from "react";

const AddLoader = () => {
  return (
    <div className="flex items-center justify-center bg-[#00000021] z-20 w-full h-screen">
      <div className="w-[800px] md:w-[70%] h-full md:h-[25%] flex flex-col items-center justify-start bg-[#ffffff]">
        {/* Rotating Loader Icon */}
        <div className="animate-spin animate-duration-[2500ms] animate-delay-100">
          <LoaderIconT />
        </div>
        <h1 className="text-[40px] md:text-[30px] sm:text-[20px] font-bold text-[#70b896]">
          Verifying...
        </h1>
      </div>
    </div>
  );
};

export default AddLoader;
