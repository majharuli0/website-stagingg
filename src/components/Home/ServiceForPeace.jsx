import Image from "next/image";
import React from "react";
const services = [
  {
    id: 1,
    imgSrc: "/images/home/installation.webp",
    title: "Professional Installation",
    description:
      "Ensure a seamless setup of your monitoring system with our expert installation service, tailored to fit your home and needs.",
    footerText: "Safety starts with the right setup.",
  },
  {
    id: 2,
    imgSrc: "/images/home/monitoring.webp",
    title: "Professional Monitoring",
    description:
      "Enjoy peace of mind with our 24/7 monitoring by trained professionals, delivering immediate alerts and rapid responses for continuous safety.",
    footerText: "24/7 monitoring for ultimate safety.",
  },
  {
    id: 3,
    imgSrc: "/images/home/consulting.webp",
    title: "Free Consultations",
    description:
      "Take advantage of our free consultations to discuss your specific requirements and receive personalized recommendations for optimal care solutions.",
    footerText: "Find your perfect system with our Experts.",
  },
];

const ServiceForPeace = () => {
  return (
    <div className="my-0 mb-40 sm:mb-5 mx-auto w-full rounded-xl bg-[#F3F4F6] tab:bg-white">
      <div className="max-w-[1320px] md:p-3 sm:p-3  mx-auto w-full">
        <p className="tab:hidden text-[40px] md:text-[1.8rem] tab:text-[1.6rem] pt-8 font-semibold text-center py-2">
          Services for Peace of Mind
        </p>
        <p className="tab:hidden text-center text-[30px] md:text-xl tab:text-lg max-w-7xl mx-auto sm:text-lg">
          From professional installation to ongoing monitoring, we ensure that
          you and your loved ones receive the highest level of support and peace
          of mind.
        </p>

        <button className="hidden cursor-text mx-auto tab:block bg-neutral-950 rounded-2xl  text-white my-0 text-base  px-7 py-[8px] font-bold">
          SERVICES FOR
        </button>
        <h3 className="text-2xl hidden tab:block text-[#2C3142] text-center font-bold my-3">
          Peace of Mind
        </h3>

        {/* cards */}
        <div className="flex justify-between items-center w-full tab:flex-col my-5 gap-6 md:gap-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="h-[520px] md:h-[450px] w-full -mb-40 tab:mb-0 tab:h-[650px] sm:h-[450px] overflow-hidden relative bg-[#EEEFEF] shadow-md shadow-slate-200 rounded-md"
            >
              {/* Image Section */}
              <figure>
                <Image
                  src={service.imgSrc}
                  alt={service.title}
                  height={300}
                  width={200}
                  quality={100}
                  className="object-cover h-[258px] tab:h-auto md:h-[146px] tab-h-auto w-full"
                />
              </figure>

              {/* Body Section */}
              <div className="p-3 md:p-2">
                <h3 className="text-[22px] md:text-[14px] py-3 font-semibold">
                  {service.title}
                </h3>
                <p className="text-[16px] md:text-sm">{service.description}</p>
              </div>

              {/* Footer Text */}
              <p className="text-sm md:text-xs absolute bottom-5 left-3">
                {service.footerText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceForPeace;
