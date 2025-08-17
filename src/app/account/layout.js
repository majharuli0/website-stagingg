"use client";
import Header from "@/components/layouts/Navbar/index";
import ProfileNav from "./ProfileNav";
import Footer from "@/components/layouts/Footer";
import { getAuthCookies } from "@/utils/authCookies";


export default async function AccountLayout({ children }) {
  const { accessToken } = await getAuthCookies();

  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="container-xss min-h-[70vh] items-start justify-start py-4 mb-[0.25rem] flex flex-col gap-[4.38rem] md:gap-[3.25rem] md:px-[1.25rem] sm:gap-[2.19rem] h-full pt-12 overflow-x-hidden">
        {/* here will be header */}
        {!userDetails ? (
          <div className="container-xss min-h-[70vh] items-center justify-center mb-[0.25rem] flex flex-col gap-[4.38rem] md:gap-[3.25rem] md:px-[1.25rem] sm:gap-[2.19rem] h-full pt-12 overflow-x-hidden">
            <Text
              size="text-lg"
              className="text-center flex flex-col items-center gap-2"
            >
              <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
              Loading User Details...
            </Text>
          </div>
        ) : (
          <div className="flex md:w-full w-full md:flex-col max-w-[55rem] gap-8 mx-auto md:items-center">
            <ProfileNav />
            {/* Main Content */}
            <div className="flex flex-col items-start justify-start gap-5 w-full max-w-[34.37rem] md:w-full">
              {children}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
