import React from "react";
import Image from "next/image";
import act1 from "@/assets/ai-care/act1.png";
import act2 from "@/assets/ai-care/act2.png";
import act3 from "@/assets/ai-care/act3.png";

const cardsData = [
  {
    id: 1,
    image: act1, // Replace with actual image path
    badgeText: "1 IN 5 FACE CRISES",
    title: "Emergencies Don’t Wait",
    description:
      "Urgencies can arise at any moment. Ensure help is available when it’s needed most.",
    footerText: "Every moment matters. Don’t wait.",
  },
  {
    id: 2,
    image: act2, // Replace with actual image path
    badgeText: "1 IN 4 AGEING ADULTS EXPERIENCE A FALL",
    title: "A Single Fall Can Change Everything",
    description:
      "Falls can lead to serious injury, especially if help isn’t nearby in time.",
    footerText: "Act now—ensure their safety today.",
  },
  {
    id: 3,
    image: act3, // Replace with actual image path
    badgeText: "80% OF CAREGIVERS WORRY",
    title: "Caring for Them Is Caring for You",
    description:
      "Keep your loved ones safe and gain peace of mind, even when you’re not around.",
    footerText: "Stop Worrying—Start Ensuring Safety",
  },
];

const AiActNow = () => {
  return (
    <section className="w-full flex justify-center items-center px-6 tab:px-3 py-28 md:py-20 tab:py-10 sm:py-8 mx-auto bg-[#F8E3EC] overflow-hidden">
      <div className="w-full max-w-[1710px] flex flex-col gap-[98px] tab:gap-[60px] sm:gap-[30px]">
        {/* text */}
        <div className="flex flex-col text-center w-full">
          <h1 className="text-5xl tab:text-4xl sm:text-2xl font-bold text-[#EE0066]">
            ACT NOW
          </h1>
          <p className="text-[30px] tab:text-[24px] sm:text-[20px]">
            To Ensure the Well-Being of Your Loved Ones
          </p>
        </div>
        {/* cards */}
        <div className="grid grid-cols-3 md:hidden tab:grid md:grid-cols-2 tab:grid-cols-1 justify-items-center align-items-center gap-[60px] xxl:gap-[40px] md:gap-[30px]">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[30px] sm:rounded-[20px] max-w-[530px] overflow-hidden w-full text-[24px] flex flex-col"
            >
              <Image
                src={card.image}
                alt="card"
                width={520}
                height={335}
                className="w-full rounded-t-[30px] sm:rounded-t-[20px]"
              />
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <button className="bg-[#EE0066] text-[16px] tab:text-[10px] text-white py-2 px-4 rounded-[10px] cursor-default">
                    {card.badgeText}
                  </button>
                  <h1 className="font-bold mt-4 text-[#10005B] sm:text-lg">
                    {card.title}
                  </h1>
                  <p className="font-light mt-2 xxl:text-[20px] md:text-[16px] sm:text-lg">
                    {card.description}
                  </p>
                </div>
                <p className="mt-4 font-semibold xxl:text-[20px] sm:text-lg">
                  {card.footerText}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* for md: */}
        <div className="md:grid tab:hidden hidden grid-cols-3 md:grid-cols-2 tab:grid-cols-1 justify-items-center align-items-center gap-[60px] xxl:gap-[40px] md:gap-[30px]">
          {/* First two cards in 2-column layout for md: */}
          <div className="col-span-3 md:col-span-2 grid md:grid-cols-2 gap-[60px] xxl:gap-[40px] md:gap-[30px] w-full">
            {cardsData.slice(0, 2).map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[30px] sm:rounded-[20px] max-w-[530px] overflow-hidden w-full text-[24px] flex flex-col"
              >
                <Image
                  src={card.image}
                  alt="card"
                  width={520}
                  height={335}
                  className="w-full rounded-t-[30px] sm:rounded-t-[20px]"
                />
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <button className="bg-[#EE0066] text-[16px] tab:text-[10px] text-white py-2 px-4 rounded-[10px]">
                      {card.badgeText}
                    </button>
                    <h1 className="font-bold mt-4 text-[#10005B] sm:text-lg">
                      {card.title}
                    </h1>
                    <p className="font-light mt-2 xxl:text-[20px] md:text-[16px] sm:text-lg">
                      {card.description}
                    </p>
                  </div>
                  <p className="mt-4 font-semibold xxl:text-[20px] sm:text-lg">
                    {card.footerText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining cards in 1-column layout for md: */}
          <div className="md:grid tab:hidden hidden col-span-3 md:col-span-2  md:grid-cols-1  justify-items-center align-items-center gap-[60px] xxl:gap-[40px] md:gap-[30px] w-full">
            {cardsData.slice(2).map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[30px] sm:rounded-[20px] max-w-[442px] overflow-hidden w-full text-[24px] flex flex-col"
              >
                <Image
                  src={card.image}
                  alt="card"
                  width={520}
                  height={335}
                  className="w-full rounded-t-[30px] sm:rounded-t-[20px]"
                />
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <button className="bg-[#EE0066] text-[16px] tab:text-[10px] text-white py-2 px-4 rounded-[10px]">
                      {card.badgeText}
                    </button>
                    <h1 className="font-bold mt-4 text-[#10005B] sm:text-lg">
                      {card.title}
                    </h1>
                    <p className="font-light mt-2 xxl:text-[20px] md:text-[16px] sm:text-lg">
                      {card.description}
                    </p>
                  </div>
                  <p className="mt-4 font-semibold xxl:text-[20px] sm:text-lg">
                    {card.footerText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiActNow;
