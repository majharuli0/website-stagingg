import React from "react";
import Image from "next/image";
import act1 from "@/assets/ai-care/ser1.png";
import act2 from "@/assets/ai-care/ser2.png";
import act1mob from "@/assets/ai-care/tab/ser1mob.png";
import act2mob from "@/assets/ai-care/tab/ser2mob.png";

const AiServices = () => {
  const cardsData = [
    {
      id: 1,
      image: act1, // Replace with actual image path
      title: "Professional Installation",
      description:
        "Ensure a seamless setup of your monitoring system with our expert installation service, tailored to fit your home and needs.",
      footerText: "Safety starts with the right setup.",
    },
    {
      id: 2,
      image: act2, // Replace with actual image path
      title: "Professional Monitoring",
      description:
        "Enjoy peace of mind with our 24/7 monitoring by trained professionals, delivering immediate and rapid responses for continuous safety.",
      footerText: "24/7 monitoring for ultimate safety.",
    },
  ];
  const cardsDataTab = [
    {
      id: 1,
      image: act1mob, // Replace with actual image path
      title: "Professional Installation",
      description:
        "Ensure a seamless setup of your monitoring system with our expert installation service, tailored to fit your home and needs.",
      footerText: "Safety starts with the right setup.",
    },
    {
      id: 2,
      image: act2mob, // Replace with actual image path
      title: "Professional Monitoring",
      description:
        "Enjoy peace of mind with our 24/7 monitoring by trained professionals, delivering immediate and rapid responses for continuous safety.",
      footerText: "24/7 monitoring for ultimate safety.",
    },
  ];
  return (
    <section className="w-full flex justify-center items-center px-6 tab:px-3 mx-auto overflow-hidden">
      <div className="w-full max-w-[1710px] flex flex-col gap-[98px] md:gap-[80px] tab:gap-[60px] sm:gap-[30px]">
        {/* text */}
        <div className="w-full text-center">
          <h1 className="text-5xl text-[#16065F] md:text-3xl font-bold">
            Peace of Mind
          </h1>
          <h1 className="text-[30px] md:text-2xl">Services</h1>
        </div>
        {/* cards */}
        <div className="grid tab:hidden grid-cols-2 gap-[60px] xxl:gap-[40px] md:gap-[30px] tab:gap-5">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="bg-[#ECECEC] rounded-[30px] sm:rounded-[20px] max-w-[825px] w-full text-[24px] tab:text-[18px] flex flex-col"
            >
              <Image
                src={card.image}
                alt="card"
                width={824}
                height={348}
                className="h-auto w-auto rounded-t-[30px] sm:rounded-t-[20px] bg-cover bg-center bg-no-repeat"
              />
              <div className="p-5 tab:p-3 tab:text-center flex flex-col justify-between flex-grow">
                <h1 className="font-bold mt-4 text-[#10005B]">{card.title}</h1>
                <p className="font-light xxl:text-[20px] mt-2">
                  {card.description}
                </p>
                <p className="mt-4 xxl:text-[22px]">{card.footerText}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab cards */}

        <div className="hidden tab:flex sm:flex-col items-center justify-center gap-[60px] tab:gap-5">
          {cardsDataTab.map((card) => (
            <div
              key={card.id}
              className="bg-[#ECECEC] rounded-[30px] max-w-[825px] w-full text-[24px] tab:text-[18px] tab:min-h-[500px] sm:max-h-[600px]"
            >
              <Image
                src={card.image}
                alt="card"
                width={334}
                height={227}
                className="w-full h-auto rounded-t-[30px] bg-cover bg-center bg-no-repeat"
              />
              <div className="p-5 tab:p-3 tab:text-center flex flex-col justify-between h-[45%] tab:h-[40%]">
                <h1 className="font-bold mt-4 text-[#10005B]">{card.title}</h1>
                <p className="font-light mt-2">{card.description}</p>
                <p className="mt-4">{card.footerText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiServices;
