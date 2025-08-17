import React from "react";
import Image from "next/image";
import image from "@/assets/app/featuresMobile.png";

const Features = () => {
  return (
    <div className="w-full mt-[70px] md:mt-10 sm:mt-6 max-w-[1720px] xxl:py-7 md:py-6 tab:py-2 px-6 flex flex-col gap-10 items-center justify-center font-poppins">
      <div className="w-full text-center flex flex-col items-center justify-center gap-[6px]">
        <h1 className="text-[40px] md:text-2xl tab:text-2xl font-bold">
          App Features
        </h1>
        <p className="max-w-[817px] text-[#6C7482] text-xl md:text-base sm:text-sm">
          Effortlessly enhance elderly care with our app&apos;s intuitive
          features, providing insightful activity analysis, device and room
          management, family coordination, and real-time senior monitoring.
        </p>
      </div>
      <div>
        <Image
          src={image}
          alt="features"
          width={1720}
          height={700}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Features;
