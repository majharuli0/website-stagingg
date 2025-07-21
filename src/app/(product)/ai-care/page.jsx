import AiActivities from "@/components/Ai-care/AiActivities";
import AiActNow from "@/components/Ai-care/AiActNow";
import AiCards from "@/components/Ai-care/AiCards";
import AiHero from "@/components/Ai-care/AiHero";
import AiMobileApp from "@/components/Ai-care/AiMobileApp";
import AiNotifications from "@/components/Ai-care/AiNotifications";
import AiServices from "@/components/Ai-care/AiServices";
import AiSpecifications from "@/components/Ai-care/AiSpecifications";
import MsgBg1 from "@/components/Ai-care/MsgBg1";
import React from "react";

const page = () => {
  return (
    <section className="flex justify-center items-center w-full tab:gap-14 overflow-x-hidden">
      <div className="w-full font-poppins flex flex-col gap-24 tab:gap-20 sm:gap-14">
        <div className="flex flex-col gap-0 items-center">
          <AiHero />
          <MsgBg1 />
        </div>
        <AiCards />
        <AiNotifications />
        <div>
          <AiActivities />
          <AiActNow />
        </div>
        <AiServices />
        <AiMobileApp />
        <AiSpecifications />
      </div>
    </section>
  );
};

export default page;
