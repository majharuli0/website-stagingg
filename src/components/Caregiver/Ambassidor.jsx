import Icon1 from "@/assets/caregiver/Icon1";
import Icon2 from "@/assets/caregiver/Icon2";
import Icon3 from "@/assets/caregiver/Icon3";
import React from "react";

const Ambassidor = () => {
  const cards = [
    {
      icn: Icon1,
      title: "Save Lives While Earning",
      text: "Make a difference in your community by providing life-saving technology to those who need it most",
    },
    {
      icn: Icon2,
      title: "Zero Upfront Costs",
      text: "No financial risk – start selling without paying for inventory upfront.",
    },
    {
      icn: Icon3,
      title: "Ongoing Residual Income",
      text: " Earn not just from sales but from continued service subscriptions.",
    },
    {
      icn: Icon1,
      title: "Professional Installation Services",
      text: "Every device comes with expert installation, ensuring happy customers.",
    },
    {
      icn: Icon1,
      title: "Effortless Inventory Management",
      text: "We handle the logistics so you can focus on building your business.",
    },
  ];

  return (
    <section className="font-poppins w-full flex flex-col items-center justify-center py-5">
      <div className="container max-w-[1672px] flex flex-col gap-[80px] justify-center items-center px-4 md:gap-[40px]">
        <h1 className="text-10 text-[#59B58A] font-bold leading-[176%] text-center md:text-[32px] md:leading-[140%]">
          Why Become a Seenyor Certified Ambassador?
        </h1>
        {/* Card */}
        <div className="flex gap-[60px] flex-wrap justify-center md:gap-[30px] sm:gap-[20px]">
          {cards.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-[10px] w-[505px] shadow-md rounded-[10px] p-[30px] justify-center items-center md:w-[350px] sm:w-[300px] xss:w-full"
            >
              <item.icn />
              <h1 className="text-[24px] font-semibold text-center md:text-[20px] sm:text-[18px]">
                {item.title}
              </h1>
              <p className="text-[20px] font-medium text-center text-[#545454] md:text-[18px] sm:text-[16px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ambassidor;
