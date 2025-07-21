"use client";

import { ArrowDown } from "lucide-react";

const ScrollButton = () => {
  return (
    <div className="md:hidden">
      <ArrowDown
        onClick={() =>
          document
            .getElementById("footer-section")
            .scrollIntoView({ behavior: "smooth" })
        }
        className="h-[2rem] -mt-5 text-white w-[2rem] object-contain mx-auto p-2 rounded-[50%] bg-[#2C3142] cursor-pointer"
      />
    </div>
  );
};

export default ScrollButton;
