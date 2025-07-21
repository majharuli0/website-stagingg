"use client";
import { Heading, Img } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import * as Avatar from "@radix-ui/react-avatar";

import { ArrowDown } from "lucide-react";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
export default function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { getUserDetailsById } = useUserService();
  const { isLogin } = useAuth();
  // Toggle dropdown open or close
  const handleToggle = () => {
    setIsServicesOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // mobile submenu

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      fetchUserDetails(storedUserId);
    }
  }, []);

  const fetchUserDetails = async (id) => {
    try {
      const userDetails = await getUserDetailsById(id);
      localStorage.setItem(
        "user_add",
        JSON.stringify(userDetails?.data?.customer_info)
      );
      localStorage.setItem("isUserVerified", true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };
  return (
    <>
      {/*<!-- Component: Navbar with CTA --> */}
      <header className="relative z-20 w-full  bg-white/90 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full">
        <div className="relative mx-auto w-full py-2 xxl:py-0  md:py-4 sm:py-4 tab:py-2 px-6 max-w-[1720px]">
          <nav className="flex h-[6.5rem] tab:h-auto md:pt-0 items-stretch justify-between font-medium text-[#2C3142]">
            {/*      <!-- Brand logo --> */}
            <a
              className="md:flex items-center gap-2 py-3 my-auto text-lg whitespace-nowrap focus:outline-none flex-1"
              href="/"
            >
              <Img
                src="img_group_1.svg"
                width={158}
                height={48}
                alt="Frame 1000008413"
                className="flex h-12 xxl:!h-10 md:!h-8 tab:!h-7 w-auto object-contain hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                onClick={() => {
                  window.open("/", "_self");
                }}
              />
            </a>
            {/*      <!-- Mobile trigger --> */}
            <button
              className={`relative order-10 md:block h-10 w-10 self-center hidden
              ${
                isToggleOpen
                  ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                  : ""
              }
            `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>
            {/*      <!-- For mobile --> */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white sm:h-[100vh]  px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
                isToggleOpen
                  ? "visible opacity-100 backdrop-blur-sm"
                  : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-stretch">
                <Link onClick={() => setIsToggleOpen(false)} href="/">
                  <Heading
                    as="p"
                    className="text-[1.3rem] gap-2 py-4 px-8 font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                  >
                    Home
                  </Heading>
                </Link>
              </li>

              <li>
                <button
                  onClick={toggleSubMenu}
                  className="text-[1.3rem] gap-2 py-4 px-8 font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                >
                  Services
                  <span className="inline-block ml-1 w-4 h-4 fill-current">
                    <svg
                      viewBox="0 0 24 24"
                      className={`chevron transition-transform duration-200 ${
                        isSubMenuOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        transform="rotate(270, 12, 12)"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071L13.2929 16.7071C13.6834 17.0976 14.3166 17.0976 14.7071 16.7071C15.0976 16.3166 15.0976 15.6834 14.7071 15.2929L11.4142 12L14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12Z"
                      ></path>
                    </svg>
                  </span>
                </button>
                <ul
                  className={`bg-black text-[15px] subMenu ${
                    isSubMenuOpen ? "" : "hidden"
                  }`}
                >
                  <li>
                    <Link
                      href="/monitoring"
                      className="block px-4 py-2 ms-7 text-[18px] text-[#6c7482] hover:bg-gray-100"
                      onClick={() => setIsToggleOpen(false)}
                    >
                      24/7 Professional Monitoring
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/installation"
                      className="block px-4 py-2 ms-7 text-[18px] text-[#6c7482] hover:bg-gray-100"
                      onClick={() => setIsToggleOpen(false)}
                    >
                      Installation Options
                    </Link>
                  </li>
                </ul>
              </li>
              <li role="none" className="flex items-stretch">
                <Link onClick={() => setIsToggleOpen(false)} href="/app">
                  <Heading
                    as="p"
                    className="text-[1.3rem] gap-2 py-4 px-8 font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                  >
                    App
                  </Heading>
                </Link>
              </li>
              <li role="none" className="flex items-stretch">
                <Link onClick={() => setIsToggleOpen(false)} href="/faq">
                  <Heading
                    as="p"
                    className="text-[1.3rem] gap-2 py-4 px-8 font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                  >
                    FAQs
                  </Heading>
                </Link>
              </li>

              {isLogin ? (
                <li role="none" className="flex items-stretch">
                  <Link
                    onClick={() => setIsToggleOpen(false)}
                    href="/buydevice"
                  >
                    <Heading
                      as="p"
                      className="text-[1.3rem] gap-2 py-4 px-8 font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                    >
                      Buy Device
                    </Heading>
                  </Link>
                </li>
              ) : (
                <li role="none" className="flex items-stretch">
                  <Link onClick={() => setIsToggleOpen(false)} href="/register">
                    <Heading
                      as="p"
                      className="text-[1.3rem] gap-2 py-4 px-8 font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                    >
                      Register Device
                    </Heading>
                  </Link>
                </li>
              )}
              {!isLogin ? (
                <li className="flex flex-col gap-2 ps-5">
                  <Link onClick={() => setIsToggleOpen(false)} href="/login">
                    <button className="sm:px-3 mb-2 sm:py-2 px-7 py-[10px] bg-[#DFE0E3] font-semibold rounded-lg">
                      Sign In
                    </button>
                  </Link>
                  <Link
                    onClick={() => setIsToggleOpen(false)}
                    href="/systembuilder"
                  >
                    <button className="sm:px-3 sm:py-2 px-3 py-[10px] bg-[#80CAA7] font-semibold text-white rounded-lg">
                      Get Started
                    </button>
                  </Link>
                </li>
              ) : (
                <Link href="/account" className="relative group">
                  <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-200 align-middle">
                    <Avatar.Image
                      className="size-full rounded-[inherit] object-cover"
                      src="images/Avater.svg"
                      alt="avatar"
                    />
                  </Avatar.Root>
                </Link>
              )}
            </ul>

            {/* for dekstop */}
            <ul className="relative flex items-center flex-wrap gap-[2.13rem] md:ml-0 ps-[2rem] md:hidden">
              <li>
                <Link href="/">
                  <Heading
                    as="p"
                    className="text-[1.125rem] font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                  >
                    Home
                  </Heading>
                </Link>
              </li>
              <li className="relative " ref={dropdownRef}>
                <div
                  onClick={handleToggle}
                  className="flex cursor-pointer items-center gap-2 px-2"
                >
                  <button className="text-[1.125rem] font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200">
                    Services
                  </button>
                  <ArrowDown className="text-[#6c7482] h-5 w-5" />
                </div>
                {isServicesOpen && (
                  <div className="absolute top-10 left-0 z-10 bg-white border border-gray-200 rounded shadow-md w-44">
                    <ul className="flex flex-col">
                      <li>
                        <Link
                          href="/monitoring"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          24/7 Professional Monitoring
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/installation"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          Installation Options
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link href="/app">
                  <Heading
                    as="p"
                    className="text-[1.125rem] font-medium !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                  >
                    App
                  </Heading>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <Heading
                    as="p"
                    className="text-[1.125rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                  >
                    FAQs
                  </Heading>
                </Link>
              </li>

              {isLogin ? (
                <li role="none" className="flex items-stretch">
                  <Link
                    onClick={() => setIsToggleOpen(false)}
                    href="/buydevice"
                  >
                    <Heading
                      as="p"
                      className="text-[1rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                    >
                      Buy Device
                    </Heading>
                  </Link>
                </li>
              ) : (
                <li role="none" className="flex items-stretch">
                  <Link onClick={() => setIsToggleOpen(false)} href="/register">
                    <Heading
                      as="p"
                      className="text-[1rem] font-bold !text-[#6c7482] hover:text-blue-600 transition-colors duration-200"
                    >
                      Register Device
                    </Heading>
                  </Link>
                </li>
              )}
              {!isLogin ? (
                <li className="flex items-center gap-2">
                  <Link
                    className="sm:px-3 sm:py-2 sm:text-sm px-7 py-[10px] bg-[#DFE0E3] font-semibold rounded-lg m-auto"
                    href="/login"
                  >
                    Sign In
                  </Link>
                  <Link
                    className="sm:px-3 sm:py-2 sm:text-sm px-3 py-[10px] bg-[#80CAA7] font-semibold text-white rounded-lg m-auto"
                    href="/systembuilder"
                  >
                    Get Started
                  </Link>
                </li>
              ) : (
                <Link href="/account" className="relative group">
                  <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-200 align-middle">
                    <Avatar.Image
                      className="size-full rounded-[inherit] object-cover"
                      src="images/Avater.svg"
                      alt="avatar"
                    />
                  </Avatar.Root>
                </Link>
              )}
            </ul>
            {/* <div className="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
              {!accessToken ? (
                <li className="flex items-center gap-2">
                  <Link
                    className="sm:px-3 sm:py-2 sm:text-sm px-7 py-[10px] bg-[#DFE0E3] font-semibold rounded-lg m-auto"
                    href="/login"
                  >
                    Sign In
                  </Link>
                  <Link
                    className="sm:px-3 sm:py-2 sm:text-sm px-3 py-[10px] bg-[#2C3142] font-semibold text-white rounded-lg m-auto"
                    href="/systembuilder"
                  >
                    Get Started
                  </Link>
                </li>
              ) : (
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
              )}
            </div> */}
          </nav>
        </div>
      </header>
      {/*<!-- End Navbar with CTA --> */}
    </>
  );
}
