import React from "react";
import msgbg from "@/assets/ai-care/msgBg1.png";
import arrow from "@/assets/ai-care/svg/arrow.svg";
import msgbgmob from "@/assets/ai-care/msgBg1mob.png";
import Image from "next/image";
import icon1 from "@/assets/ai-care/Icn/AiIcn1.png";
import icon2 from "@/assets/ai-care/Icn/AiIcn2.png";
import icon3 from "@/assets/ai-care/Icn/AiIcn3.png";

const challenges = [
  {
    icon: icon1,
    text: "Ensuring continuous safety and supervision can be difficult.",
  },
  {
    icon: icon2,
    text: "Delayed assistance can increase risks.",
  },
  {
    icon: icon3,
    text: "Wearable devices require frequent charging and maintenance",
  },
];

const MsgBg1 = () => {
  return (
    <div className="px-6 tab:px-4 max-w-[1700px] w-full">
      <div className="text-center mb-6">
        <h1 className="text-[48px] tab:text-[30px] sm:text-[25px] italic font-bold md:text-4xl">
          Common Challenges
        </h1>
        <h1 className="text-[30px] md:text-3xl tab:text-[26px] sm:text-[24px]">
          of Ageing Adults
        </h1>
      </div>
      <div
        className="max-w-[1700px] w-full bg-cover bg-center px-4 py-10 md:py-8 tab:py-6 pb-8 shadow-md rounded-3xl relative"
        // style={{ backgroundImage: `url(${msgbg.src})` }}
      >
        <Image
          src={arrow}
          alt={`arrow-bottom`}
          // width={80}
          // height={80}
          className="absolute left-[50%] -translate-x-[50%] -bottom-[27px] "
        />
        {/* <div class="w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-transparent border-b-8 border-b-white shadow-md"></div> */}
        <div className="text-center flex flex-col gap-10">
          <div className="flex px-10 justify-between gap-4 tab:flex-col items-center tab:gap-8">
            {challenges.map((challenge, index) => (
              <div className="flex items-center" key={index}>
                <div className="max-w-[390px] w-full flex flex-col gap-5 items-center justify-center">
                  <Image
                    src={challenge.icon}
                    alt={`icon${index + 1}`}
                    width={80}
                    height={80}
                  />
                  <h4 className="text-[22px] sm:text-[18px] text-center px-10">
                    {challenge.text.split(" ").map((word, i) =>
                      word === "difficult." ||
                      word === "increase" ||
                      word === "risks." ||
                      word === "frequent" ||
                      word === "charging" ||
                      word === "maintenance." ? (
                        <span key={i} className="font-bold">
                          {word}{" "}
                        </span>
                      ) : (
                        word + " "
                      )
                    )}
                  </h4>
                </div>
                {/* Conditionally render the divider */}
                {index !== challenges.length - 1 && (
                  <div className="w-[2.5px] h-[200px] rounded-full bg-[#CBCBCB]/70 tab:hidden"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MsgBg1;
