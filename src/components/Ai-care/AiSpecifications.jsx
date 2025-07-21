import React from "react";
import Image from "next/image";
import product from "@/assets/ai-care/aiproduct2.png";

const specifications = [
  { label: "Dimensions", value: "70x70x27mm (Without base)" },
  { label: "Weight", value: "83.1g (Without power adapter)" },
  { label: "Operating Temperature", value: "-10°C - 45°C" },
  { label: "Operating Humidity", value: "5% - 95%" },
  { label: "Mounting Mode", value: "Ceiling / Wall" },
  { label: "Protection Class", value: "IP65" },
  { label: "Power Requirements", value: "5V USB DC, 220V Power Adapter" },
  { label: "Power Consumption", value: "Average: <3W; Instantaneous: <4W" },
  { label: "Communication Interface", value: "2.4G (Wi-Fi)" },
  { label: "Azimuth", value: "140°" },
  { label: "Elevation", value: "120°" },
  { label: "Modulation", value: "FMCW" },
  { label: "Transmitted Power", value: "11dBm" },
  { label: "Number of Antennas", value: "4T4R" },
  { label: "Detection Area", value: "Up to 24m²" },
  { label: "LED Indicator", value: "Blue - Pairing Mode | Red - No Internet" },
];

const AiSpecifications = () => {
  return (
    <section className="w-full flex justify-center items-center px-6 tab:px-3 mx-auto overflow-hidden mb-20">
      <div className="w-full max-w-[1416px] flex items-center justify-center flex-col gap-[68px] relative">
        {/* Title Section */}
        <div className="w-full text-center">
          <h1 className="text-5xl font-bold text-[#16065F] md:text-3xl">
            Specifications
          </h1>
          <h3 className="text-[30px] md:text-2xl">AI Care Guardian</h3>
        </div>

        {/* 2nd div */}
        <div className="flex sm:flex-col items-start justify-start w-full">
          {/* text */}
          <div className="max-w-[864px] sm:max-w-full tab:max-w-[458px]">
            <div className="bg-transparent min-w-[305px] tab:min-w-[205px] hidden sm:block h-[20vh]"></div>
            <h1 className="text-3xl tab:text-base mb-2 font-bold text-[#16065F] sm:text-center">
              Device Information
            </h1>
            <p className="text-[26px] tab:text-sm font-light text-justify sm:text-center">
              Seenyor AI Guardian is equipped with a low-power mmWave radar,
              providing precise detection with minimal energy consumption. This
              advanced radar ensures reliable fall detection, even in low light
              or through obstacles, making it ideal for continuous 24/7
              monitoring.
            </p>
          </div>
          <div className="bg-transparent min-w-[305px] tab:min-w-[205px] h-[40px] sm:hidden"></div>
          <div className="absolute right-[-180px] tab:right-[-80px] sm:hidden top-0 tab:top-16 w-[705px] tab:w-[405px]">
            <Image src={product} alt="product" width={705} height={520} />
          </div>
          <div className="absolute hidden sm:flex top-6 sm:mt-0 xss:mt-8 justify-center">
            <Image src={product} alt="product" width={705} height={520} />
          </div>
        </div>

        {/* Specifications List */}
        <div className="w-full max-w-[1338px] rounded-lg p-6">
          <ul className="grid grid-cols-1 gap-4">
            {specifications.map((spec, index) => (
              <li
                key={index}
                className="flex text-[28px] tab:text-sm sm:text-xs justify-between border-b border-[#2C3142] pb-2 last:border-b-0"
              >
                <span className="text-[#2C3142] font-bold text-gray-700">
                  {spec.label}
                </span>
                <span className="text-[#2C3142] font-medium">{spec.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AiSpecifications;
