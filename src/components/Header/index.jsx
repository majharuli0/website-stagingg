"use client";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heading, Img } from "./..";
import { useAuth } from "@/context/AuthContext";

export default function Header({ ...props }) {
  const pathname = usePathname();

  return (
    <header
      {...props}
      className={`${props.className} flex w-full md:hidden sm:flex-col justify-between items-center gap-[1.25rem] pt-2 px-6`}
    >
      <div className="mx-auto flex w-full items-center justify-center md:flex-col md:px-[1.25rem]">
        {/* Wrap Img with Link to make it clickable */}

        <Img
          src="img_group_1.svg"
          width={158}
          height={32}
          alt="Frame 1000008413"
          className="flex object-contain md:w-full hover:opacity-80 transition-opacity duration-300 cursor-pointer"
          onClick={() => {
            window.open("/");
          }}
        />

        <ul className="relative flex flex-wrap gap-[2.13rem] md:ml-0 px-[12rem]">
          <li>
            <Link href="/">
              <Heading
                as="p"
                className="text-[1rem] font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Heading>
            </Link>
          </li>
          <li>
            <Link href="https://seenyor.com/devices">
              <Heading
                as="p"
                className="text-[1rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
              >
                Device
              </Heading>
            </Link>
          </li>
          <li>
            <Link href="https://seenyor.com/alerts">
              <Heading
                as="p"
                className="text-[1rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
              >
                Alerts
              </Heading>
            </Link>
          </li>
          <li>
            <Link href="https://seenyor.com/nursing-home">
              <Heading
                as="p"
                className="text-[1rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
              >
                Nursing Home
              </Heading>
            </Link>
          </li>
          <li>
            <Link href="https://seenyor.com/ai-monitoring">
              <Heading
                as="p"
                className="text-[1rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
              >
                AI Monitoring
              </Heading>
            </Link>
          </li>
          <li>
            <Link href="https://seenyor.com/app">
              <Heading
                as="p"
                className="text-[1rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
              >
                App
              </Heading>
            </Link>
          </li>
          <li>
            <Link href="/buydevice">
              <Heading
                as="p"
                className={`text-[1rem] font-bold !text-[#6c7482] transition-colors duration-200 ${
                  pathname === "/buydevice" ? "!text-[rgb(29,41,63)]" : ""
                }`}
              >
                Buy Device
              </Heading>
            </Link>
          </li>
        </ul>

        <Link href="/account" className="relative group">
          <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-200 align-middle">
            <Avatar.Image
              className="size-full rounded-[inherit] object-cover"
              src="images/avater.png"
              alt="avatar"
            />
            <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-blue-200 text-[15px] font-medium text-violet11">
              A
            </Avatar.Fallback>
          </Avatar.Root>
        </Link>
      </div>
    </header>
  );
}
