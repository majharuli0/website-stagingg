"use client"
import { Heading } from "../Heading";
import { Img } from "../Img1";

export default function UserProfile({
  coolingOffText,
  monthlyChargeText,
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-center w-full max-w-md sm:max-w-full mx-auto px-4 sm:px-6 lg:px-8 gap-6 sm:gap-8`}
    >
      <div className="flex items-center gap-3 sm:gap-4 w-full">
        <Img
          src="img_star_fall_2_svgrepo_com.svg"
          width={24}
          height={24}
          alt="Star Fall 2 Svgrepo Com"
          className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0"
        />
        <Heading
          size="text3xl"
          as="p"
          className="text-xl sm:text-sm md:text-xl font-medium capitalize text-white"
        >
          {coolingOffText}
        </Heading>
      </div>
      <div className="flex items-start gap-3 sm:gap-4 w-full">
        <Img
          src="img_star_fall_2_svgrepo_com.svg"
          width={24}
          height={34}
          alt="Close"
          className="h-8 w-6 sm:h-10 sm:w-8 flex-shrink-0"
        />
        <Heading
          size="text3xl"
          as="p"
          className="text-xl sm:text-lg md:text-xl font-medium capitalize leading-normal sm:leading-relaxed text-white"
        >
          {monthlyChargeText}
        </Heading>
      </div>
    </div>
  );
}