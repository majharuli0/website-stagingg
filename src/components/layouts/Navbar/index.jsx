"use client";
import { Img } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import * as Avatar from "@radix-ui/react-avatar";
import { Menu, X, ChevronDown, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const { getUserDetailsById } = useUserService();
  const { isLogin } = useAuth();

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      dropdown: [
        { label: "24/7 Professional Monitoring", href: "/monitoring" },
        { label: "Installation Options", href: "/installation" },
      ],
    },
    { label: "App", href: "/app" },
    { label: "FAQs", href: "/faq" },
    isLogin
      ? { label: "Buy Device", href: "/buydevice" }
      : { label: "Register Device", href: "/register" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setIsToggleOpen(false);
    setIsSubMenuOpen(false);
  };

  const renderNavItem = (item, isMobile = false) => {
    if (item.dropdown) {
      return (
        <div
          key={item.label}
          className="relative"
          ref={!isMobile ? dropdownRef : null}
        >
          <button
            onClick={() =>
              isMobile
                ? setIsSubMenuOpen((prev) => !prev)
                : setIsServicesOpen((prev) => !prev)
            }
            className={`flex items-center ${
              isMobile ? "w-full justify-between" : ""
            } px-4 py-2 text-base font-medium text-gray-700 hover:text-[#70B896] whitespace-nowrap`}
          >
            {item.label}
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                (isMobile ? isSubMenuOpen : isServicesOpen) ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          <div
            className={`${
              isMobile
                ? `overflow-hidden transition-all duration-300 ${
                    isSubMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  } pl-4`
                : `absolute top-full left-0 mt-2 w-fit transition-all duration-300  ${
                    isServicesOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-100 invisible -translate-y-2"
                  }`
            }`}
          >
            <div
              className={`${
                isMobile
                  ? ""
                  : "bg-[#ffffff] backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/20 overflow-hidden"
              }`}
            >
              {item.dropdown.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={
                    isMobile ? closeMobileMenu : () => setIsServicesOpen(false)
                  }
                  className={`flex items-center px-4 py-2 text-base text-gray-700 hover:text-[#70B896] whitespace-nowrap ${
                    isMobile
                      ? "hover:bg-gray-100 rounded-lg"
                      : "hover:bg-gray-100 rounded-xl"
                  }`}
                >
                  <div className="w-2 h-2 bg-[#70B896] rounded-full mr-3"></div>
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={isMobile ? closeMobileMenu : undefined}
        className={`px-1 py-2 text-base font-medium text-gray-700 hover:text-[#70B896] whitespace-nowrap ${
          isMobile ? "block rounded-xl hover:bg-gray-100" : "relative group"
        }`}
      >
        {item.label}
        {!isMobile && (
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#70B896] transition-all duration-300 group-hover:w-full"></span>
        )}
      </Link>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-30 bg-[#ffffffe3] backdrop-blur-md py-1`}
      >
        <div className="relative mx-auto px-4 sm:px-6 md:px-8 max-w-[1720px]">
          <nav className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Img
                src="img_group_1.svg"
                width={140}
                height={40}
                alt="Brand Logo"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav (shows from md breakpoint) */}
            <div className="flex  md:hidden  items-center space-x-8">
              {navLinks.map((item) => renderNavItem(item))}
            </div>

            {/* Desktop CTA / Avatar */}
            <div className="flex md:hidden items-center space-x-3">
              {!isLogin ? (
                <>
                  <Link href="/login">
                    <button className="px-6 py-2.5 text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/systembuilder">
                    <button className="px-6 py-2.5 text-base font-semibold text-white bg-[#70B896] hover:bg-[#5a9478] rounded-full">
                      Get Started
                    </button>
                  </Link>
                </>
              ) : (
                <Link href="/account" className="group">
                  {/* <Avatar.Root className="inline-flex size-10 select-none items-center justify-center overflow-hidden rounded-full bg-[#70B896] p-0.5">
                    <Avatar.Image
                      className="size-full rounded-full object-cover"
                      src="images/Avater.svg"
                      alt="avatar"
                    />
                  </Avatar.Root> */}

                  <div className="size-10 text-white bg-primary flex items-center justify-center rounded-full">
                    {" "}
                    <User />
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button (only below md) */}
            <div className="hidden md:block">
              <button
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                onClick={() => setIsToggleOpen((prev) => !prev)}
              >
                {isToggleOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isToggleOpen && (
          <div className="md:block bg-white/95 backdrop-blur-lg border-t border-gray-200/20 shadow-2xl px-4 py-6 space-y-4">
            {navLinks.map((item) => renderNavItem(item, true))}
            <div className="pt-4 space-y-3">
              {!isLogin ? (
                <>
                  <Link href="/login" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 text-base font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl">
                      Sign In
                    </button>
                  </Link>
                  <Link href="/systembuilder" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 text-base font-semibold text-white bg-[#70B896] hover:bg-[#5a9478] rounded-xl ">
                      Get Started
                    </button>
                  </Link>
                </>
              ) : (
                <Link
                  href="/account"
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-3"
                >
                  {/* <Avatar.Root className="inline-flex size-10 select-none items-center justify-center overflow-hidden rounded-full bg-[#70B896] p-0.5">
                    <Avatar.Image
                      className="size-full rounded-full object-cover"
                      src="images/Avater.svg"
                      alt="avatar"
                    />
                  </Avatar.Root> */}
                  <div className="size-10 text-white bg-primary flex items-center justify-center rounded-full">
                    {" "}
                    <User />
                  </div>

                  <span className="ml-3 text-base font-medium text-gray-700">
                    My Account
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
      <div className="h-16 md:h-20"></div>
    </>
  );
}
