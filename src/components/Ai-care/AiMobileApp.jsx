"use client";

import React, { useState } from "react";
import Image from "next/image";
import mob1 from "@/assets/ai-care/mobileapp/mob1.png";
import mob2 from "@/assets/ai-care/mobileapp/mob2.png";
import mob3 from "@/assets/ai-care/mobileapp/mob3.png";
import mob4 from "@/assets/ai-care/mobileapp/mob4.png";
import mob5 from "@/assets/ai-care/mobileapp/mob5.png";
import mob9 from "@/assets/ai-care/mobileapp/mob9.png";
import mob7 from "@/assets/ai-care/mobileapp/mob7.png";
import mob8 from "@/assets/ai-care/mobileapp/mob8.png";
import "@/components/Ai-care/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const appScreens = [
  { title: "Overview Page", image: mob1 },
  { title: "Location", image: mob2 },
  { title: "Sleep Insights", image: mob3 },
  { title: "Sleep Events", image: mob4 },
  // { title: "Pulse Rate", image: mob5 },
  { title: "Wellness Score", image: mob9 },
  // { title: "Breathing Rate", image: mob7 },
  { title: "Daytime Activity", image: mob8 },
];

const AiMobileApp = () => {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    const totalSlides = swiper.slides.length;
    const currentSlide = swiper.realIndex + 1; // Swiper uses 0-based index
    const newProgress = (currentSlide / totalSlides) * 100;
    setProgress(newProgress);
    setActiveIndex(swiper.realIndex); // Update the active index
  };

  return (
    <section className="w-full flex justify-center items-center px-6 sm:px-0 py-16 bg-[#E4E3F8] overflow-hidden ">
      <div className="w-full max-w-[1710px] flex flex-col gap-[98px] md:gap-[80px] tab:gap-[60px] sm:gap-[30px] justify-center items-center">
        <div className="text-center">
          <h1 className="text-5xl md:text-3xl font-bold text-[#16065F]">
            Mobile App
          </h1>
          <p className="text-[30px] md:text-xl sm:text-[22px]">
            For Full Control
          </p>
        </div>

        <div className="grid sm:hidden grid-cols-3 gap-20 max-w-[1200px] tab:gap-6 justify-items-center items-center">
          {appScreens.map((screen, index) => (
            <div
              key={index}
              className="flex w-fit flex-col items-center gap-4 "
            >
              <h2 className="text-2xl md:text-[14px] font-light italic">
                {screen.title}
              </h2>
              <Image
                src={screen.image}
                alt={screen.title}
                width={300}
                height={650}
              />
            </div>
          ))}
        </div>

        <div className="relative w-full hidden sm:block overflow-hidden">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2} // Display 3 slides at once
            coverflowEffect={{
              rotate: -15,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: 0,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSlideChange={handleSlideChange}
            className="mySwiper"
          >
            {appScreens.map((screen, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex flex-col items-center transition-transform duration-300"
                  style={{
                    opacity: activeIndex === index ? 1 : 0.7, // Decrease opacity for non-active slides
                    transition: "opacity 0.5s ease-in-out", // Smooth opacity transition
                  }}
                >
                  <h2 className="text-[12px] font-light italic">
                    {screen.title}
                  </h2>
                  <div
                    className="transition-transform duration-300"
                    style={{
                      transform: "scale(0.9)",
                    }}
                  >
                    <Image
                      src={screen.image}
                      alt={screen.title}
                      width={200}
                      height={400}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Pagination */}
          <div className="w-full h-2 px-2 justify-center items-center hidden sm:flex mt-4">
            <div className="w-[90%] h-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#16065f9f] rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiMobileApp;
