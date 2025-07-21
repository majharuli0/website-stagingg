"use client";

import React, { useState } from "react";
import Image from "next/image";
import hero from "@/assets/ai-care/heroImage.png";
import bg from "@/assets/ai-care/heroBg.png";
import mobbg from "@/assets/ai-care/mobbg.png";
import logo from "@/assets/ai-care/logo.png";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import ReactPlayer with SSR disabled
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const AiHero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingMobile, setIsPlayingMobile] = useState(false);

  const handleThumbnailClick = () => {
    setIsPlaying(true); // Start playing the video on desktop when the thumbnail is clicked
    setIsPlayingMobile(false); // Pause mobile video if it's playing
  };

  const handleThumbnailClickMobile = () => {
    setIsPlayingMobile(true); // Start playing the video on mobile when the thumbnail is clicked
    setIsPlaying(false); // Pause desktop video if it's playing
  };

  return (
    <>
      {/* Desktop Section */}
      <section className="relative tab:hidden w-full max-h-[805px] tab:max-h-auto overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 -top-80">
          <Image
            src={bg}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        <div className="flex tab:flex-col gap-4 items-start justify-between px-6 tab:justify-center w-full tab:px-3 mx-auto min-h-[700px] h-[500px] max-w-[1700px] tab:gap-14 relative z-10">
          {/* Text Section */}
          <div className="flex flex-col gap-8 w-[50%] tab:w-full items-start justify-start mt-32 tab:text-center h-full">
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-[3.2vw] xxl:text-[3.4vw] tab:text-[40.5vw] sm:text-4xl text-[#10005B]">
                Protect Your Parents
              </h1>
              <h6 className="font-medium text-[1.5vw] xxl:text-[1.7vw] tab:text-[1.458vw]">
                with 24/7 professional Monitoring
              </h6>
              <div className="flex items-center">
                <Link
                  href="#"
                  className="bg-[#EF086B] px-16 py-5 rounded-xl text-[1.458vw] font-bold text-white text-center text-nowrap"
                  onClick={handleThumbnailClick}
                >
                  Learn How
                </Link>
              </div>
              <p className="text-sm italic">*This is NOT a medical device.</p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center rounded-2xl overflow-hidden mt-14 relative w-[700px] h-[455px]">
            {/* Poster Image for Desktop */}
            {!isPlaying && (
              <div
                className="absolute w-[700px] h-[455px] cursor-pointer z-20"
                onClick={handleThumbnailClick}
              >
                <Image
                  src={hero} // Thumbnail image
                  alt="Video Thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                  {/* Play Button with Animation */}
                  <span className="relative flex size-16">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EF086B] opacity-75"></span>
                    <span className="relative inline-flex size-16 rounded-full bg-[#EF086B] items-center justify-center pl-1">
                      <svg
                        stroke="currentColor"
                        fill="white"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="25px"
                        width="25px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M96 52v408l320-204L96 52z"></path>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            )}

            {/* Video Player for Desktop */}
            {isPlaying && (
              <div className="absolute inset-0 z-10">
                <ReactPlayer
                  url="https://youtu.be/4YBe3Tei1C8"
                  playing={true}
                  width="700px"
                  height="455px"
                  config={{
                    youtube: {
                      playerVars: { autoplay: 1 },
                    },
                  }}
                  className="object-cover tab:rounded-b-[60px] sm:rounded-b-[40px]"
                />
              </div>
            )}
            <div className="absolute w-[700px] h-[455px] cursor-pointer bg-[#000] z-0"></div>
          </div>
        </div>
      </section>

      {/* Mobile Section */}
      <section className="relative w-full overflow-hidden hidden tab:block px-4 sm:px2 h-fit mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={mobbg}
            alt="Mobile Background"
            width={800}
            height={600}
            className="h-[600px] sm:h-[600px] xss:h-[570px]"
          />
        </div>

        <div className="relative flex tab:flex-col tab:justify-center w-full px-6 tab:px-3 mx-auto h-fit max-w-[1610px] tab:gap-14 z-10">
          <div className="flex flex-col gap-8 w-full items-center tab:pt-20 sm:pt-[14.958vh] justify-start tab:text-center h-full">
            <div className="w-full flex justify-center items-center tab:hidden">
              <Image src={logo} alt="logo" width={130} height={110} />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-bold text-7xl tab:text-[8.469vw] sm:text-[8.646vw] text-[#10005B]">
                Protect Your Parents
              </h1>
              <h6 className="font-medium text-[32px] tab:text-[3.458vw] sm:text-[4.046vw]">
                with 24/7 professional Monitoring
              </h6>
              <div className="flex justify-center w-full">
                <Link
                  href="#"
                  className="bg-[#EF086B] px-6 py-3 rounded-lg text-[3vw] font-bold text-white max-w-[275px] text-center"
                  onClick={handleThumbnailClickMobile}
                >
                  Learn How
                </Link>
              </div>
              <p className="text-sm italic">*This is NOT a medical device.</p>
            </div>
          </div>

          <div className="flex justify-center rounded-2xl overflow-hidden relative w-full aspect-video">
            {/* Poster Image for Mobile */}
            {!isPlayingMobile && (
              <div
                className="absolute w-full h-full cursor-pointer z-20"
                onClick={handleThumbnailClickMobile}
              >
                <Image
                  src={hero} // Thumbnail image
                  alt="Video Thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                  <span className="relative flex items-center justify-center size-16">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EF086B] opacity-75"></span>
                    <span className="relative inline-flex size-16 rounded-full bg-[#EF086B] items-center justify-center pl-1">
                      <svg
                        stroke="currentColor"
                        fill="white"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="25px"
                        width="25px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M96 52v408l320-204L96 52z"></path>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            )}

            {/* Video Player for Mobile */}
            {isPlayingMobile && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <ReactPlayer
                  url="https://youtu.be/4YBe3Tei1C8"
                  playing={true}
                  width="700px"
                  height="455px"
                  config={{
                    youtube: {
                      playerVars: { autoplay: 1 },
                    },
                  }}
                  className="object-cover tab:rounded-b-[60px] sm:rounded-b-[40px]"
                />
              </div>
            )}
            <div className="absolute w-full h-full cursor-pointer bg-[#000] z-0"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiHero;
