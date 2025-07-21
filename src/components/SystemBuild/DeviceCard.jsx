import React from "react";
import Image from "next/image";
import product from "@/assets/product.png";

const DeviceCard = ({ number, id, handleRemoveDevice }) => {
  return (
    <div>
      <div className="bg-[#ffffff] w-full  flex sm:flex-col flex-row gap-[25px] px-[10px] py-[10px] rounded-[12px]">
        <div className="flex sm:hidden">
          <Image
            src={product}
            width={140}
            height={122}
            className="sm:w-full "
            alt="x"
          />
          <div className=" bg-[#F6F7F7] w-[3px] sm:hidden"></div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col justify-center gap-[16px]">
            <h1 className="text-[20px] font-semibold text-[#1D293F]">
              Seenyor Sensor
            </h1>
            <div className="flex gap-[30px] text-[#6C7482] text-[16px] font-medium">
              <h4>{`UID: ${id}`}</h4>
            </div>
          </div>
          <span
            className="font-medium text-sm px-6 text-red-600 cursor-pointer"
            onClick={() => handleRemoveDevice(id)}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
