import { Heading, Img } from "./..";

export default function AlertNotification1({
  alertMessage = "Elderly Fall Detected!",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex items-center gap-[0.63rem] py-[0.63rem] bg-teal-100_b2 shadow-xs flex-1 rounded-[12px]`}
    >
      {/* Icon or Indicator */}
      <div className="h-[2.38rem] w-[2.38rem] rounded-lg bg-green-300_51" />

      {/* Alert Message Content */}
      <div className="flex flex-1 flex-col items-start justify-center">
        <div className="flex items-start self-stretch">
          {/* Heading with Decorative Dot */}
          <div className="flex flex-1 items-start gap-[0.38rem] self-center">
            <Heading
              size="headings"
              as="h6"
              className="self-center text-[1.00rem] font-semibold text-main_color-primary"
            >
              {alertMessage}
            </Heading>
            <div className="mt-[0.50rem] h-[0.25rem] w-[0.25rem] rounded-sm bg-gray-600_3f" />
          </div>

          {/* Decorative Bar */}
          <div className="ml-[0.38rem] mt-[0.50rem] h-[0.31rem] w-[18%] bg-teal-200_b2" />

          {/* Close Button */}
          <Img
            src="img_close_body.png"
            width={1}
            height={18}
            alt="Close"
            className="ml-[1.75rem] h-[1.13rem] self-end object-cover"
          />
        </div>

        {/* Lower Decorative Bar */}
        <div className="relative mt-[-0.25rem] h-[0.50rem] w-[32%] bg-teal-200_b2" />
      </div>
    </div>
  );
}
