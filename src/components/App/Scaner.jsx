import PlayBtn from "@/assets/app/svg/PlayBtn";
import AppleBtn from "@/assets/app/svg/AppleBtn";
import Link from "next/link";
import Image from "next/image";
import QR from "@/assets/app/qrScanner.png";

const Scaner = () => {
  return (
    <div className="mt-[70px] md:mt-10 sm:mt-6 w-full min-h-[332px] xxl:py-7 md:py-6 tab:py-2 px-6 rounded-[40px] p-10 text-white flex justify-center items-center">
      <div className="w-full max-w-[1720px] bg-gradient-to-r from-[#304670] via-[#272A32] to-[#2C3142] flex md:flex-col md:gap-8 justify-between items-center xxl:py-7 md:py-6 tab:py-2 rounded-[40px] p-14 ">
        <div className="flex flex-col md:items-center gap-10">
          <div className="md:text-center">
            <h1 className="text-[48px]  md:text-3xl tab:text-xl font-bold">
              Download our App now !
            </h1>
            <p className="text-[20px] md:text-base sm:text-sm font-medium max-w-[563px]">
              Experience seamless care for your loved ones with our
              user-friendly app. Download now for unparalleled ease and peace of
              mind.
            </p>
          </div>
          <div className="flex gap-3 md:scale-90">
            <Link
              href="https://apps.apple.com/pl/app/seenyor/id6503249681"
              className="sm:"
              target="_blank"
            >
              <AppleBtn />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.seenyor.application&hl=env"
              target="_blank"
            >
              <PlayBtn />
            </Link>
          </div>
        </div>
        <div className="md:scale-90">
          <Image src={QR} alt="" width={348} height={248} />
        </div>
      </div>
    </div>
  );
};

export default Scaner;
