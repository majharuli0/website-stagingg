import React from "react";
import Image from "next/image";
import bg from "@/assets/ai-care/ActivitiesBg.png";
import icn1 from "@/assets/ai-care/Icn/aicn1.png";
import icn2 from "@/assets/ai-care/Icn/aicn2.png";
import icn3 from "@/assets/ai-care/Icn/aicn3.png";
import icn4 from "@/assets/ai-care/Icn/aicn4.png";
import icn5 from "@/assets/ai-care/Icn/aicn5.png";
import icn6 from "@/assets/ai-care/Icn/aicn6.png";
import icn7 from "@/assets/ai-care/Icn/aicn7.png";
import icn8 from "@/assets/ai-care/Icn/aicn8.png";
import icn9 from "@/assets/ai-care/Icn/aicn9.png";

// Activity Data
const activities = [
  {
    icon: icn1,
    title: "Room Entry",
    description: "When someone enters the room.",
  },
  {
    icon: icn2,
    title: "Room Exit",
    description: "When someone exits the room.",
  },
  {
    icon: icn3,
    title: "Device Offline",
    description: "If the device is offline.",
  },
  {
    icon: icn4,
    title: "Device Online",
    description: "When the device is back online.",
  },
  {
    icon: icn5,
    title: "Poor Signal",
    description: "If a poor Wi-Fi signal is detected.",
  },
  {
    icon: icn6,
    title: "Bad Angle",
    description: "When the device is installed incorrectly.",
  },
  {
    icon: icn6,
    title: "Angle Recovered",
    description: "When the device is re-installed correctly.",
  },
  {
    icon: icn8,
    title: "Return to Bed",
    description: "When a user returns to the bed.",
  },
  {
    icon: icn9,
    title: "Number of persons",
    description: "When the number of people in the room changes.",
  },
  {
    icon: icn5,
    title: "Good Signal",
    description: "When the Wi-Fi signal is restored.",
  },
];

const AiActivities = () => {
  return (
    <>
      <section
        className="w-full flex tab:hidden justify-center px-6 tab:px-3 pt-28 mx-auto relative overflow-hidden"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "1038px",
        }}
      >
        <div className="w-full max-w-[1910px] flex flex-col items-center justify-center gap-[98px] tab:gap-[30px] sm:gap-[20px] relative text-[#fff]">
          {/* Heading */}
          <div className="w-full text-center">
            <h1 className="font-bold text-5xl md:text-3xl sm:text-2xl">
              <span className="text-[#EF086B]">10+</span> Activities
            </h1>
            <h6 className="text-[30px] tab:text-[20px] sm:text-[18px] text-[#fff]">
              Complete Visibility and Peace of Mind
            </h6>
          </div>

          {/* Activity Cards */}
          <div className="grid grid-cols-5 sm:grid-cols-2 gap-24 text-center ">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 max-w-[345px] w-full"
              >
                <Image
                  src={activity.icon}
                  alt={activity.title}
                  width={40}
                  height={40}
                  className="w-[40px] tab:w-[20px] sm:w-[18px] h-[40px] tab:h-[20px] sm:h-[18px] object-cover bg-cover bg-center"
                />
                <div className="text-[28px] xxl:text-[24px] tab:text-[16px] sm:text-[14px]">
                  <h1 className="font-bold">{activity.title}</h1>
                  <p className="xxl:text-[20px] md:text-[14px] sm:text-[10px]">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* for mobile */}

      <section
        className="w-full hidden tab:flex justify-center px-6 tab:px-3 pt-28 mx-auto  relative overflow-hidden"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "476px",
        }}
      >
        <div className="w-full max-w-[1710px] flex flex-col items-center justify-center gap-[98px] tab:gap-[60px] sm:gap-[0px] relative text-[#fff]">
          {/* Heading */}
          <div className="w-full text-center">
            <h1 className="font-bold text-5xl md:text-3xl sm:text-2xl">
              <span className="text-[#EF086B]">10+</span> Activities
            </h1>
            <h6 className="text-[30px] tab:text-[20px] sm:text-[18px] text-[#fff]">
              Complete Visibility and Peace of Mind
            </h6>
          </div>

          {/* Activity Cards */}
          <div className="grid grid-cols-5 sm:grid-cols-2 gap-24 tab:gap-5 sm:gap-5 sm:py-10 text-center ">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 max-w-[345px] w-full"
              >
                <Image
                  src={activity.icon}
                  alt={activity.title}
                  width={40}
                  height={40}
                  className="w-[40px] tab:w-[18px] sm:w-[15px] h-[40px] tab:h-[18px] sm:h-[15px] object-cover bg-cover bg-center"
                />
                <div className="text-[28px] tab:text-[14px] sm:text-[12px]">
                  <h1 className="font-bold">{activity.title}</h1>
                  <p className="sm:text-[12px]">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AiActivities;
