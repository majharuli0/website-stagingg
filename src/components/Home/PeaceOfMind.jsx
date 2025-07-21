import React from "react";
import { ClockIcon } from "@radix-ui/react-icons";
import { Img } from "..";
import Image from "next/image";

const monitoringData = [
  {
    id: 1,
    imgSrc: "/images/breath.svg",
    title: "Breathing Rate",
    subtitle: "Monitoring",
  },
  {
    id: 2,
    imgSrc: "/images/heart.svg",
    title: "Heart Rate",
    subtitle: "Monitoring",
  },
  { id: 3, imgSrc: "/images/fall.svg", title: "Fall", subtitle: "Monitoring" },
  {
    id: 4,
    imgSrc: "/images/sleep.svg",
    title: "Sleep",
    subtitle: "Monitoring",
  },
  {
    id: 5,
    imgSrc: "/images/activity.svg",
    title: "Activity",
    subtitle: "Monitoring",
  },
];
const PeaceOfMind = () => {
  return (
    <div className="max-w-[1720px] my-0 mx-auto w-full  rounded-xl">
      <p className="tab:hidden text-[40px] md:text-[1.8rem] tab:text-[1.6rem] text-[#FF6633] font-semibold text-center py-2">
        Peace of Mind Made Easy – No fuss, no wearables
      </p>
      <p className="tab:hidden text-center text-[30px] md:text-xl tab:text-lg">
        Effortless Peace of Mind with 24/7 Protection – No Wearables, Just
        Reliable Safety
      </p>

      <span className="hidden mx-auto tab:block max-w-[240px] bg-neutral-950 rounded-2xl  text-white my-0 text-base  px-4 py-[8px] font-bold">
        NO FUSS, NO WEARABLES
      </span>
      <h3 className="text-2xl hidden tab:block text-[#2C3142] text-center font-bold mt-3">
        Peace of Mind Made Easy
      </h3>

      <div className="flex justify-between md:flex-col gap-7 py-10 tab:pb-0">
        <div className="w-1/2 md:w-full bg-[#EAEAEA]">
          <div className="text-center">
            <ClockIcon className="mx-auto mt-5" height={35} width={35} />
            <h3 className="text-3xl md:text-2xl font-semibold pt-2">
              24/7 Protection
            </h3>
            <p className=" text-xl md:text-lg px-2">
              Non-intrusive, without the hassle of wearable devices.
            </p>
          </div>
          <div className="h-[500px] md:h-[420px] w-full relative">
            <Image
              src="/images/home/test 223.webp"
              height={500}
              width={500}
              quality={100}
              alt="patience"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 px-5 md:px-2 flex justify-center gap-3 md:gap-2 tab:grid tab:grid-cols-3 tab:gap-3 w-[90%] tab:w-auto sm:w-full">
              {monitoringData.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F1F2F4] border border-[#D8D9D7] py-3 text-center w-[19%] md:w-[6.5rem] tab:w-full"
                >
                  <>
                    <Image
                      src={item.imgSrc}
                      width={156}
                      height={32}
                      alt={item.title}
                      className="w-12 h-12 p-3 mx-auto "
                    />
                    <p className="font-semibold text-[12px] xxl:text-[10px]">
                      {item.title}
                    </p>
                    <p className="text-[12px] xxl:text-[10px]">
                      {item.subtitle}
                    </p>
                  </>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 md:w-full bg-[#EAEAEA] tab:pb-3">
          <div className="text-center">
            <ClockIcon className="mx-auto mt-5" height={35} width={35} />
            <h3 className="text-3xl md:text-2xl font-semibold pt-2">
              24/7 Monitoring
            </h3>
            <p className="text-lg tab:px-6">
              with AI-driven insights for smarter protection.
            </p>
          </div>
          <div className="h-[500px] md:h-auto w-full px-5">
            <div className="flex tab:hidden justify-between w-full gap-3 py-5">
              <div className="w-1/2 flex flex-col gap-2">
                <Image
                  src="/images/home/monitoring1.png"
                  height={200}
                  width={300}
                  alt="patience"
                  className="h-[219px] w-[382px] md:h-full md:w-auto"
                />
                <Image
                  src="/images/home/monitoring3.png"
                  height={200}
                  width={300}
                  alt="patience"
                  className="h-[219px] w-[382px] md:h-full md:w-auto"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src="/images/home/monitoring2.png"
                  height={300}
                  width={300}
                  alt="patience"
                  className="h-[451px] md:h-auto w-full object-cover"
                />
              </div>
            </div>
            <div className=" hidden tab:flex flex-col gap-4 w-full py-5">
              <Image
                src="/images/home/monitoring2.png"
                height={300}
                width={300}
                alt="patience"
                className="h-auto w-full object-cover"
              />
              <Image
                src="/images/home/monitoring1.png"
                height={200}
                width={300}
                alt="patience"
                className="h-auto w-full object-cover"
              />
              <Image
                src="/images/home/monitoring3.png"
                height={200}
                width={300}
                alt="patience"
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="text-xs text-center">*This is NOT a Medical device</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeaceOfMind;
