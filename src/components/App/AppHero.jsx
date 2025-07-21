import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImg from "@/assets/app/appHero.png";
import PlayBtn from "@/assets/app/svg/PlayBtn";
import AppleBtn from "@/assets/app/svg/AppleBtn";
import icn from "@/assets/app/app-store.png";

const AppHero = () => {
  return (
    <div className="w-full max-w-[1720px] xxl:py-7 py-10 md:py-6 tab:py-2 px-6 sm:px-2 flex md:flex-col items-center justify-between font-poppins">
      <div className="max-w-[55%] md:max-w-full flex flex-col gap-[25px]">
        <div className="flex flex-col md:items-center md:text-center gap-[15px]">
          <button className="font-medium bg-[#70B896] text-[#ffffff] w-[160px] h-[40px] rounded-full flex items-center justify-center gap-2">
            <Image src={icn} alt="" width={20} height={20} />
            Seenyor App
          </button>
          <h1 className="font-bold capitalize text-[48px] md:text-[30px] sm:text-[25px]">
            Making Elderly Care easier than ever with Our seenyor app
          </h1>
          <p className="text-xl md:text-base sm:text-sm">
            Elevate elderly care effortlessly with Seenyor Care App. Monitor
            vital signs, track activities, and receive real-time alerts for a
            seamless and comprehensive approach to well-being. Caregiving made
            simple!
          </p>
        </div>
        <div className="flex gap-3 flex-col  md:items-center md:text-center w-full">
          <h6 className="text-[20px] font-semibold leading-[124%]">
            Get The App
          </h6>
          <div className="flex gap-3">
            <Link
              href="https://apps.apple.com/pl/app/seenyor/id6503249681"
              target="_blank"
            >
              <AppleBtn />
            </Link>
            <Link
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.seenyor.application&hl=env"
            >
              <PlayBtn />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-start">
        <Image src={HeroImg} alt="hero" width={800} height={500} />
      </div>
    </div>
  );
};

export default AppHero;
