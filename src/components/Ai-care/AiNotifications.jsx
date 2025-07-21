import React from "react";
import Image from "next/image";
import heroimg from "@/assets/ai-care/ntfctBG.png";

const AiNotifications = () => {
  return (
    <section className="w-full flex justify-center items-center px-6 tab:px-3 mx-auto">
      <div className="w-full max-w-[1710px] flex flex-col items-center justify-center gap-[98px] tab:gap-[60px] sm:gap-[30px]">
        {/* text */}
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-5xl tab:text-4xl sm:text-2xl text-[#EE0066]">
            <span className="font-bold">04 Dedicated </span>Notifications
          </h1>
          <h6 className="text-[30px] tab:text-[24px] sm:text-[20px]">
            For every situation
          </h6>
        </div>
        {/* image */}
        <Image
          src={heroimg}
          alt="notification"
          width={1515}
          height={1014}
          className="w-full max-w-[1515px] max-h-[1080px]"
        />
      </div>
    </section>
  );
};

export default AiNotifications;
