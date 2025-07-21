"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import product from "@/assets/ai-care/product2.png";
import img from "@/assets/ai-care/heroImg.png";
import RightMark from "@/assets/ai-care/svg/RightMark";
import stroke from "@/assets/ai-care/stroke.png";
import strokeR from "@/assets/ai-care/strokeR.png";
import cardimg1 from "@/assets/ai-care/cardImg/cardimg1.png";
import cardimg2 from "@/assets/ai-care/cardImg/cardimg2.png";
import cardimg3 from "@/assets/ai-care/cardImg/cardimg3.png";
import cardimg4 from "@/assets/ai-care/cardImg/cardimg4.png";
import cardimg5 from "@/assets/ai-care/cardImg/cardimg5.png";
import cardimg6 from "@/assets/ai-care/cardImg/cardimg6.png";
import cardimg7 from "@/assets/ai-care/cardImg/cardimg8.jpeg";
import line from "@/assets/ai-care/stroke2.png";

const cardData = [
  {
    title: "Automated Fall Detection",
    description:
      "With every step they take, you can rest assured that Seenyor is there to catch them if they fall.",
    features: [
      "Precise fall detection location",
      "Immediate alarm triggering",
      "AI Fall analytics and confirmation",
    ],
    image: cardimg1,
  },
  {
    title: "Safety & Daily Insights",
    description:
      "Your loved one is safe, day and night. Their well-being is supported with continuous insights, so you can feel confident.",
    features: ["Sleep Insights", "Detection of Unusual Activity"],
    image: cardimg2,
  },
  {
    title: "Sleep Insights",
    description:
      "Ensure your loved one's well-being while they rest. Seenyor provides insights into their sleep journey.",
    features: [
      "Insights into Different Sleep Stages",
      "Sleep Score with AI Evaluation",
      "Fall Detection & AI Validation",
    ],
    image: cardimg3,
  },
  {
    title: "Daily Activity Insights",
    description:
      "From morning walks to quiet moments, Seenyor provides valuable insights into their daily movements.",
    features: [
      "Indoor Activity Duration & Still Time",
      "Walking Speed and Distance",
      "Room Visits Count",
    ],
    image: cardimg4,
  },
  {
    title: "AI Insights",
    description:
      "Seenyor processes all data into simple, easy-to-understand updates, giving you a clearer view of your loved one's well-being.",
    features: [
      "Sleep Insights Powered by AI",
      "Activity Insights Powered by AI",
      "Well-being Insights Powered by AI",
    ],
    image: cardimg5,
  },
  {
    title: "Live Location",
    description:
      "Seenyor provides real-time location information, so you'll know if they're safe or in need of help.",
    features: [
      "Position within the Room",
      "Fall Location Detection",
      "AI Posture Insights",
    ],
    image: cardimg6,
  },
  {
    title: "Voice Communication",
    description:
      "Stay connected with your loved one through easy, real-time communication, whether it’s for a quick check-in or to stay in touch throughout the day.",
    features: ["Live Voice Communication", "Instant Calls"],
    image: cardimg7,
  },
];

const Card = ({ title, description, features, image, reverse }) => {
  return (
    <div
      className={`bg-white relative p-8 sm:p-4 rounded-[30px] sm:rounded-[20px] w-full flex sm:flex-col items-center gap-[88px] tab:gap-[60px] sm:gap-[30px] ${
        reverse ? "flex-row-reverse w-full" : ""
      }`}
    >
      <Image
        src={image}
        alt={title}
        width={710}
        height={340}
        className="h-[17.708vw] sm:w-full sm:h-auto rounded-[20px]"
      />
      <div
        className={`${
          reverse
            ? "absolute top-auto sm:hidden left-[0%] max-w-[47vw] tab:max-w-[45.969vw] w-full h-[28.646vw] tab:h-[40vw] bg-[#ffffff]/70 rounded-[30px] z-0"
            : "absolute top-auto sm:hidden right-[0%] max-w-[47vw] tab:max-w-[45.969vw] w-full h-[28.646vw] tab:h-[40vw] bg-[#ffffff]/70 rounded-[30px] z-0"
        }`}
      ></div>
      {/* text */}
      <div
        className={`max-w-[727px] relative ${
          reverse ? " ml-10 tab:ml-0 sm:ml-0" : " ml-10 tab:ml-0 sm:ml-0"
        }`}
      >
        <div className="z-10">
          <h3 className="text-[1.458vw] tab:text-[2.1vw] sm:text-[4vw] text-[#10005B] font-bold mb-2">
            {title}
          </h3>
          <p className="text-[1.458vw] tab:text-[1.65vw] sm:text-[4vw] font-light">
            {description} <br />
            <br />
          </p>
          <ul className="text-[1.458vw] tab:text-[1.65vw] sm:text-[4vw]">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <RightMark className="w-5 tab:w-3 h-5 tab:h-3" /> {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const MobileCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === cardData.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex flex-col justify-center items-center min-h-[80vh] xss:min-h-[68vh]">
      <div className="relative w-full h-full flex justify-center items-center mt-[60px]">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="absolute w-full flex justify-center"
            initial={{
              opacity: index === currentIndex ? 0 : 0.5,
              scale: index === currentIndex ? 0.8 : 0.6,
              zIndex: index === currentIndex ? 2 : 1,
            }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              scale: index === currentIndex ? 1 : 0.8,
              zIndex: index === currentIndex ? 3 : 1,
            }}
            exit={{ opacity: 0, scale: 0.8, zIndex: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Card {...card} />
          </motion.div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-[-20px] flex space-x-5">
        {cardData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index
                ? "bg-[#ff7fb7] scale-125 w-10 h-3 rounded-xl"
                : "bg-gray-400"
            } transition-all duration-300 ease-in-out hover:scale-110`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const AiCards = () => {
  return (
    <section>
      <div className="w-full flex flex-col justify-center items-center text-center">
        <h1 className="text-[48px] tab:text-[6.469vw] sm:text-[6.646vw] text-[#EE0066]">
          We Offer <span className="font-bold">Peace of Mind</span>
        </h1>
        <h6 className="text-[30px] tab:text-[4vw] sm:text-[4vw]">
          No Wearables, Just Reliable Safety
        </h6>
        <div className="max-w-[1710px] w-full flex sm:flex-col justify-between items-center mt-24 tab:mt-16 sm:mt-10 mb-10">
          <div className="min-w-[700px] md:min-w-[440px] tab:min-w-[350px] sm:hidden h-[50px] bg-transparent"></div>
          <p className="max-w-[860px] text-[28px] md:text-[26px] tab:text-lg text-start md:pr-1 sm:px-5 sm:text-center">
            Non-intrusive technology ensures comfort and ease while providing
            continuous <span className="font-bold">Fall Detection</span> and{" "}
            <span className="font-bold">valuable</span> insights into daily
            activity.
            <br />
            <br />
            <span className="font-bold">Effortlessly</span> stay informed about
            your loved one&apos;s well-being, whether they&apos;re resting or
            moving around the home, day or night.
          </p>
          <div className="hidden sm:block min-w-[700px] tab:min-w-[300px] h-[240px] bg-transparent"></div>
        </div>
      </div>
      <div className="bg-[#F8E3EC] flex justify-center w-full mx-auto min-h-screen sm:min-h-full py-40 md:py-20 tab:py-10">
        <div className="max-w-[1710px] sm:max-w-full w-full relative">
          <div className="bg-white w-[626px] md:w-[400px] md:h-[400px] tab:w-[300px] h-[626px] tab:h-[300px] rounded-full flex justify-center sm:hidden items-center absolute top-[-530px] left-10 sm:left-[12vw] md:top-[-400px] tab:top-[-300px]">
            <Image
              src={product}
              alt="product"
              width={557}
              height={557}
              className="w-[557px] md:w-[370px] tab:w-[288px]"
            />
          </div>
          <div className="hidden sm:flex w-full justify-center items-center relative">
            <div className="bg-white rounded-full w-[320px] h-[320px] flex justify-center items-center absolute top-[-270px]">
              <Image
                src={product}
                alt="product"
                width={557}
                height={557}
                className="w-[557px] tab:w-[288px]"
              />
            </div>
          </div>
          <div className="mt-20 md:mt-0 tab:mt-0 sm:mt-6 max-w-[700px] md:max-w-[480px] tab:max-w-[380px] sm:max-w-full flex sm:hidden justify-center items-center">
            <Image
              src={line}
              alt="line"
              width={5}
              height={114}
              className="h-[114px] md:h-[75px] tab:h-[51px] sm:h-8"
            />
          </div>

          {/* Cards Section */}
          <div>
            <div className="max-w-[1700px] w-full mx-auto p-6 sm:p-0 sm:px-3 flex sm:hidden flex-col justify-center items-center">
              {cardData.map((card, index) => (
                <div key={index}>
                  <Card key={index} {...card} reverse={index % 2 == 0} />
                  {/* stroke */}
                  {index < cardData.length - 1 && (
                    <div className="flex items-center justify-center">
                      {index % 2 === 0 ? (
                        <>
                          <Image
                            src={stroke}
                            alt="stroke"
                            width={845}
                            height={117}
                            className="m-[3.333vw] md:m-[2.083vw] tab:m-[4.23vw] w-[46.094vw] sm:hidden"
                          />
                          <Image
                            src={line}
                            alt="line"
                            width={5}
                            height={10}
                            className="h-8 hidden sm:block"
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            src={strokeR}
                            alt="stroke"
                            width={845}
                            height={117}
                            className="m-[3.333vw] md:m-[2.083vw] tab:m-[4.23vw] w-[46.094vw] sm:hidden"
                          />
                          <Image
                            src={line}
                            alt="line"
                            width={5}
                            height={10}
                            className="h-8 hidden sm:block"
                          />
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* mobile carousle */}

            <div className="max-w-[1700px] w-full mx-auto p-6 sm:p-0 sm:px-3 hidden sm:flex flex-col justify-center items-center">
              <MobileCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiCards;
