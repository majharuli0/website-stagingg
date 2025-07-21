import React from "react";
import Image from "next/image";
import Bgimg from "@/assets/app/IntelligentApp.png";
import BgimgMo from "@/assets/app/IntelligentAppMo.png";
import { CheckCircle } from "lucide-react";

const Intelligent = () => {
  const features = [
    "Real-Time Monitoring",
    "Intelligent Alerts",
    "Activity Tracking",
    "User-Friendly Interface",
    "Customizable Settings",
  ];

  return (
    <div className="w-full mt-[70px] md:mt-10 sm:mt-6 max-w-[1720px] xxl:py-7 md:py-6 tab:py-2 px-6 relative flex md:flex-col items-center justify-center font-poppins">
      <Image
        src={Bgimg}
        alt=""
        width={1720}
        height={700}
        className="absolute md:hidden px-6 min-h-[500px] max-h-[900px]"
      />
      <Image
        src={BgimgMo}
        alt=""
        width={1720}
        height={1000}
        className="absolute hidden md:block px-6 tab:h-[400px] max-h-[900px]"
      />
      <div className=" w-full h-[500px] flex justify-center items-center z-10 rounded-3xl text-white">
        <div className="relative w-full md:text-center flex flex-col sm:items-start sm:justify-start gap-6 z-10 px-[50px]">
          <h2 className="text-[40px] md:text-[30px] sm:text-[25px] font-bold">
            Elevate Elderly Monitoring <br /> With Our{" "}
            <span className="text-green-400">Intelligent App</span>
          </h2>
          <ul className="space-y-3 text-lg flex flex-col gap-6 md:gap-4 sm:gap-0">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex sm:items-start gap-3 text-xl md:text-base md:justify-center sm:justify-start"
              >
                <CheckCircle className="text-green-400" size={20} /> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Intelligent;
