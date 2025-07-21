import { Img } from "@/components";
import { MailIcon, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Script from "next/script";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer id="footer-section" className="w-full pt-16 text-sm bg-[#F3F4F6]">
        {/* ############## ############
          need this bg on top (line no 9) when comment out the footer  bg-[#F3F4F6] 
          ###################################*/}
        <div className="mx-auto xxl:px-5 max-w-[1320px] w-full">
          <div className="grid grid-cols-4 gap-5  tab:grid-cols-2">
            <div className="flex">
              <nav
                aria-labelledby="footer-product-5-logo-sub"
                className="max-w-[270px]"
              >
                <Img
                  src="img_group_1.svg"
                  width={158}
                  height={32}
                  alt="Frame 1000008413"
                  className="flex object-contain md:w-full hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                />
                <ul>
                  <li className="my-2 text-lg md:text-[16px] tab:text-sm leading-6">
                    <p>
                      AI Powered All-In-One Solution for Fall Detection and
                      Sleep Monitoring.
                    </p>
                  </li>
                  <li className="mb-2 leading-6 py-3">
                    <div className="flex items-center gap-1">
                      <div className=" mt-1">
                        <Image
                          src="/images/home/mail.svg"
                          alt=""
                          height={10}
                          width={10}
                          className="!w-6 !h-6 md:hidden"
                        />
                      </div>
                      <p className="mt-1 text-[14px]">Support@seenyor.com</p>
                    </div>
                  </li>
                </ul>

                <div className="flex justify-start gap-5 mt-3">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61558380786778"
                    target="_blank"
                  >
                    <Image
                      src="/images/footer/facebook 1.svg"
                      alt="facebook"
                      height={40}
                      width={40}
                      className="h-[25px] w-auto"
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/seenyorcare/"
                    target="_blank"
                  >
                    <Image
                      src="/images/footer/instagram 1.svg"
                      alt="instagram"
                      height={40}
                      width={40}
                      className="h-[25px] w-auto"
                    />
                  </Link>
                  <Link href="https://twitter.com/seenyor_care" target="_blank">
                    <Image
                      src="/images/footer/twitter 1.svg"
                      alt="twitter"
                      height={40}
                      width={40}
                      className="h-[25px] w-auto"
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/seenyor/?viewAsMember=true"
                    target="_blank"
                  >
                    <Image
                      src="/images/footer/linkedin 1.svg"
                      alt="linkedin"
                      height={40}
                      width={40}
                      className="h-[25px] w-auto"
                    />
                  </Link>
                </div>
              </nav>
            </div>
            <div className="flex justify-center">
              <nav
                aria-labelledby="footer-docs-5-logo-sub"
                className="max-w-[300px]"
              >
                <h3
                  className="mb-2 font-bold text-xl md:text-lg tab:text-base "
                  id="footer-docs-5-logo-sub"
                >
                  Contact Information
                </h3>
                <ul className="text-lg md:text-[16px] tab:text-sm">
                  <li className="mb-2 leading-6 font-semibold">
                    <p>Seenyor LTD</p>
                  </li>
                  <li className="mb-2 leading-6">
                    <div className="flex items-start gap-1">
                      <div className=" mt-1">
                        <Image
                          src="/images/home/location.svg"
                          alt=""
                          height={10}
                          width={10}
                          className="!w-7 min-w-5 !h-auto md:hidden"
                        />
                      </div>
                      <p>
                        <strong>HQ-Ireland:</strong> Unit 2, 2 Bridge St,
                        Athlone, Co. Westmeath, N37 F1W4
                      </p>
                    </div>
                  </li>
                  <li className="mb-2 leading-6">
                    <div className="flex items-start gap-1">
                      <div className=" mt-1">
                        <Image
                          src="/images/home/location.svg"
                          alt=""
                          height={10}
                          width={10}
                          className="!w-7 min-w-5 !h-auto md:hidden"
                        />
                      </div>
                      <p>
                        <strong>Australia:</strong>  33 foster street, surry
                        hills , NSW
                      </p>
                    </div>
                  </li>
                  <li className="mb-2 leading-6">
                    <div className="flex items-start gap-1">
                      <div className=" mt-1">
                        <Image
                          src="/images/home/location.svg"
                          alt=""
                          height={10}
                          width={10}
                          className="!w-7 min-w-5 !h-auto md:hidden"
                        />
                      </div>
                      <p>
                        <strong>USA:</strong> 15442 Ventura Blvd., Ste 201-073
                        Sherman Oaks, California 91403, USA
                      </p>
                    </div>
                  </li>
                  {/* <li className="mb-2 leading-6">
        <div className="flex items-start gap-1">
          <div className=" mt-1">
            <Phone
              fill="#000"
              className="!w-4 min-w-4 !h-auto md:hidden"
            />
          </div>
          <p>1800329162</p>
        </div>
      </li> */}
                </ul>
              </nav>
            </div>

            <div className="flex justify-center">
              <nav
                aria-labelledby="footer-about-5-logo-sub"
                className="max-w-[270px]"
              >
                <h3
                  className="mb-2 font-bold text-xl md:text-lg tab:text-base "
                  id="footer-about-5-logo-sub"
                >
                  Legal
                </h3>
                <ul className="text-lg md:text-[16px] tab:text-sm">
                  <li className="mb-2 leading-6">
                    <a
                      href="/faq"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      Help Center
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href="/terms-and-conditions"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href="/privacy-policy"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href="/terms-of-service"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      Terms Of Service
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href="/shipping-and-returns"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      Shipping and Returns
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href="/service-agreement"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      User Agreement and Liability Disclaimer
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex justify-start flex-col">
              <nav
                aria-labelledby="footer-get-in-touch-5-logo-sub"
                className="max-w-[270px]"
              >
                <h3
                  className="mb-2 font-bold text-xl md:text-lg tab:text-base "
                  id="footer-get-in-touch-5-logo-sub"
                >
                  Company
                </h3>
                <ul className="text-lg md:text-[16px] tab:text-sm">
                  <li className="mb-2 leading-6">
                    <a
                      href="/about"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href="/contact-us"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li className="mb-2 leading-6">
                    <a
                      href="/blog"
                      className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </nav>
              <nav
                aria-labelledby="footer-docs-5-logo-sub mt-6"
                className="max-w-[300px]"
              >
                <h3
                  className="mb-2 font-bold text-xl md:text-lg tab:text-base "
                  id="footer-docs-5-logo-sub"
                >
                  Customer Service
                </h3>
                <ul className="text-lg md:text-[16px] tab:text-sm">
                  <li className="mb-2 leading-6">
                    <div className="flex items-start gap-1">
                      <p>
                        <strong>Australia:</strong> +61 482 070 445
                      </p>
                    </div>
                  </li>
                  <li className="mb-2 leading-6">
                    <div className="flex items-start gap-1">
                      <p>
                        <strong>USA:</strong> +1 425 697 9780
                      </p>
                    </div>
                  </li>

                  {/* <li className="mb-2 leading-6">
        <div className="flex items-start gap-1">
          <div className=" mt-1">
            <Phone
              fill="#000"
              className="!w-4 min-w-4 !h-auto md:hidden"
            />
          </div>
          <p>1800329162</p>
        </div>
      </li> */}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        {/*      <!-- Sub Footer --> */}
        <div className="bg-[#E3E7EF] py-5 mt-5 text-sm">
          <p className="text-center text-lg md:text-base tab:text-sm">
            Copyright &copy; {currentYear}; All Rights Reserved by Seenyor
          </p>
        </div>
      </footer>

      {/* <Script src="https://app.dante-ai.com/bubble-embed.js?kb_id=8b2a09ee-37ab-45c5-b71a-2138b9aeef1e&token=6ae50532-9067-4704-99a4-5128593690d4&modeltype=gpt-4-omnimodel-mini&tabs=false" /> */}
      {/*    <!-- End Five Columns Footer with Logo and Sub Footer --> */}
    </>
  );
};

export default Footer;
