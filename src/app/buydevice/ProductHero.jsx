"use client";
import { Button, Heading, Img, Text } from "../../components";

export default function ProductHero() {
  return (
    <div className="container-xss md:w-[100%] flex flex-col gap-[5.00rem] md:gap-[3.75rem] md:px-[0rem] sm:gap-[2.50rem]">
      <div className="flex items-start gap-[2.50rem] md:flex-col md:text-center">
        <div className="flex w-full flex-col items-start gap-[0.88rem] md:items-center">
          <Button
            size="sm"
            variant="outline"
            leftIcon={
              <Img
                src="img_frame.svg"
                width={20}
                height={20}
                alt="Frame"
                className="my-[0.13rem] h-[1.25rem] w-[1.25rem]"
              />
            }
            className="min-w-[10.88rem] gap-[0.50rem] rounded-[20px] px-[0.75rem] font-medium"
          >
            Buy Device
          </Button>
          <div className="flex flex-col items-center self-stretch">
            <Heading
              size="heading6xl"
              as="h1"
              className="w-full capitalize text-[#1d293f] text-3xl md:2xl tab:xl"
            >
              Customize your elderly care system
            </Heading>
            <Text
              as="p"
              className="w-full text-md font-normal capitalize leading-[1.69rem] text-[#6c7482] md:text[14px]  sm:text-[14px]"
            >
              Personalize your system with Fall Detectors and Advanced Sleep
              Monitoring Sensors, and rest assured, you can effortlessly
              incorporate additional devices as required.
            </Text>
          </div>
        </div>
        <div className="flex w-full justify-center self-center px-[3.50rem] md:px-[1.25rem]">
          <Img
            src="img_pin_12_converted.png"
            width={238}
            height={264}
            alt="Pin 12 Converted"
            className="h-[16.50rem] w-[44%] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
