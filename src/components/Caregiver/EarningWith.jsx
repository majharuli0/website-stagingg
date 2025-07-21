import Image from "next/image";
import groupImg from "@/assets/caregiver/imgs/Group.png";
import Line from "@/assets/caregiver/Line";
import SmallCircle from "@/assets/caregiver/SmallCircle";

function EarningWith() {
  return (
    <div className="w-full flex flex-col gap-16 items-center overflow-hidden bg-[#7E87FC] p-20 relative md:p-12 sm:p-8">
      <h1 className="text-[40px] font-bold text-[#ffffff] text-center md:text-[32px] sm:text-[28px]">
        Save Lives While Earning with Seenyor
      </h1>

      <div className="absolute w-full flex justify-start md:hidden">
        <Line />
      </div>
      <div className="absolute w-full h-full flex items-end justify-start p-8 md:hidden">
        <SmallCircle />
      </div>
      <div className="absolute w-full h-full flex items-end justify-end py-8 px-32 sm:px-12 md:hidden">
        <SmallCircle />
      </div>

      <div className="flex items-center bg-cover gap-20 z-10 md:flex-col md:gap-12">
        <Image
          src={groupImg}
          width={900}
          height={600}
          alt="x"
          className="w-[805px] md:w-full bg-cover xss:w-full"
        />
        <div className="w-[827px] md:w-full flex flex-col gap-8">
          <h4 className="text-[32px] font-semibold text-[#ffffff] flex flex-col gap-6 md:text-[28px] sm:text-[24px]">
            At Seenyor, we empower caregivers like you to make an impact. Join
            us and enjoy:
            <ul className="ml-4 list-inside">
              <li className="before:content-['»'] before:mr-4">
                No Upfront Costs
              </li>
              <li className="before:content-['»'] before:mr-4">
                Hassle-Free Inventory Management
              </li>
              <li className="before:content-['»'] before:mr-4">
                Professional Installation Services
              </li>
            </ul>
            <p className="text-[24px] md:text-[20px] sm:text-[18px]">
              Turning your passion into profit has never been easier. Together,
              let’s save lives and support the people who matter most.
            </p>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default EarningWith;
