import { Heading } from "@/components/ui";

export default function UserProfile2({
  userMultiplier = "1x",
  userFeature = "Fall Detector",
  userPrice = "$34.55",
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
          className="text-[1.25rem] font-bold text-secodary"
        >
          {userMultiplier}
        </Heading>
        <div className="ml-[0.25rem] h-[0.31rem] w-[0.31rem] rounded-sm bg-border" />
        <Heading
          size="headinglg"
          as="h5"
          className="ml-[0.25rem] text-[1.25rem] font-semibold text-text"
        >
          {userFeature}
        </Heading>
      </div>
      <Heading
        size="headinglg"
        as="h5"
        className="text-[1.25rem] font-bold text-text"
      >
        {userPrice}
      </Heading>
    </div>
  );
}
