import RegisterHero from "@/components/register-device/RegisterHero";
import React from "react";
import Image from "next/image";
import bg from "@/assets/register/register_bg.png";

const page = () => {
  return (
    <div className="w-full flex flex-col justify-between !h-[90svh] mt-8">
      <RegisterHero />
      <Image
        src={bg}
        alt="bg"
        className="w-full h-fit"
        width={1920}
        height={500}
      />
    </div>
  );
};

export default page;
