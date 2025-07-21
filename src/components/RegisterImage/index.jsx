import { Img } from ".."
import AlertNotification from "../AlertNotification"

function index() {
  return (
    <div className="flex w-[42%] flex-col items-start md:w-full md:px-[1.25rem] md:hidden">
    <div className="w-[80%] bg-green-50 md:w-full md:h-[20%]">
      <div className="mt-[3.13rem] flex flex-col gap-[2.50rem]">
        <div className="flex flex-col items-center gap-[2.63rem]">
          <Img
            src="img_group_1_text.svg"
            width={166}
            height={34}
            alt="Group 1"
            className="h-[2.13rem] w-[32%] object-contain"
          />
          <div className="ml-[13.13rem] flex flex-col gap-[1.75rem] self-stretch md:ml-0">
            <AlertNotification />
            <AlertNotification className="ml-[4.25rem] md:ml-0" />
          </div>
        </div>
        <div>
          <div className="mx-[1.50rem] flex flex-col items-center md:mx-0">
            <div className="group140_border relative z-[2] h-[14.00rem] w-[50%] rounded-[112px] p-[0.63rem] md:h-auto">
              <div className="frame1000008724_border mt-[0.38rem] flex w-[34%] flex-col items-center gap-[1.88rem] rounded-[10px] bg-white p-[0.38rem] shadow-sm">
                <Img
                  src="img_settings.svg"
                  width={8}
                  height={6}
                  alt="Settings"
                  className="mt-[0.38rem] h-[0.38rem]"
                />
                <div className="flex w-[62%] items-center justify-center gap-[0.38rem] md:w-full">
                  <div className="h-[0.06rem] w-[0.06rem] rounded-[50%] border-[0.2px] border-solid border-gray-200_02 bg-blue-300" />
                  <div className="h-[0.50rem] w-[0.50rem] rounded border-[0.6px] border-solid border-blue_gray-100 bg-gradient2" />
                  <div className="h-[0.06rem] w-[0.06rem] rounded-[50%] border-[0.2px] border-solid border-gray-200_02 bg-blue-300" />
                </div>
              </div>
              <div className="ellipse69_border absolute bottom-0 left-0 right-0 top-0 m-auto h-[8.63rem] w-[8.63rem] rounded-[68px]" />
            </div>
            <div className="relative mt-[-7.25rem] self-stretch">
              <div className="flex flex-col gap-[1.88rem]">
                <Img
                  src="img_group_1000008418.png"
                  width={74}
                  height={104}
                  alt="Group 1000008418"
                  className="ml-[1.50rem] h-[6.50rem] w-[16%] object-contain md:ml-0"
                />
                <div className="flex items-center">
                  <Img
                    src="img_group_1000008413.svg"
                    width={94}
                    height={130}
                    alt="Group 1000008413"
                    className="relative z-[1] mb-[2.38rem] h-[8.13rem] w-[20%] self-end object-contain"
                  />
                  <Img
                    src="img_group_1000008417.svg"
                    width={282}
                    height={266}
                    alt="Group 1000008417"
                    className="relative ml-[-1.50rem] h-[16.63rem] w-[58%] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          ,
          <div className="relative z-[3] mt-[-3.75rem] bg-gradient">
            <Img 
              src="img_frame_1000008722.svg"
              width={500}
              height={136}
              alt="Frame 1000008722"
              className="h-[8.50rem] w-full md:h-auto"
            />
          </div>
          ,
        </div>
      </div>
    </div>
  </div>
  )
}

export default index