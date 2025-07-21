import React from "react";
import product from "@/assets/product.png";
import Image from "next/image";

const AddDeviceCard = ({ uids = [] }) => {
  return (
    <div>
      <div className="bg-[#F6F7F7] w-[650px] md:w-full p-[30px] md:px-[15px] sm:px-2 rounded-[35px] flex flex-col gap-9">
        <h1 className="text-[28px] font-semibold">Your device</h1>
        {uids.map((uid, index) => (
          <div
            key={index}
            className="bg-[#ffffff] w-full flex sm:flex-col flex-row gap-[25px] px-[26px] py-[20px] rounded-[12px]"
          >
            <div className="flex">
              <Image
                src={product} // Assuming 'image' is part of the UID object, if applicable
                width={140}
                height={122}
                className="sm:w-full"
                alt="x"
              />
              <div className="bg-[#F6F7F7] w-[3px] sm:hidden"></div>
            </div>
            <div className="flex flex-col justify-center gap-[30px]">
              <h1 className="text-[20px] font-semibold text-[#1D293F]">
                Seenyor Sensor
              </h1>
              <p className="text-[16px] font-medium text-[#1D293F]">
                {`Device UID: ${uid}`}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDeviceCard;
