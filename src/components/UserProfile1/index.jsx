"use client"
import { Heading } from "../Heading";
export default function UserProfile1({
  userMultiplier, 
  userFeature,
  userBalance,
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-center flex-1`}
    >
      <div className="flex flex-1 items-center">
        <Heading
          size="headinglg"
          as="h5"
          className="text-[1.25rem] font-bold text-secodary sm:text-[1.06rem] xss:text-[0.80rem]"
        >
          {userMultiplier}
        </Heading>
        <div className="ml-[0.25rem] h-[0.31rem] w-[0.31rem] rounded-sm bg-border" />
        <Heading
          size="headinglg"
          as="h5"
          className="ml-[0.25rem] text-[1.25rem] font-semibold text-text sm:text-[1.06rem]"
        >
          {userFeature}
        </Heading>
      </div>
      <Heading
        size="headinglg"
        as="h5"
        className="text-[1.25rem] font-bold text-text sm:text-[1.06rem]"
      >
        <span>${userBalance}&nbsp;</span>
        <span className="font-normal">AUD</span>
      </Heading>
    </div>
  );
}
