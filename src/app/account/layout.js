import Header from "@/components/layouts/Navbar/index";
import ProfileNav from "./ProfileNav";
import Footer from "@/components/layouts/Footer";
import { cookies } from "next/headers";
export default function AccountLayout({ children }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  return (
    <div className="flex w-full flex-col items-center">
      <Header accessTokenProp={accessToken} />
      <div className="container-xss min-h-[70vh] items-center justify-center mb-[0.25rem] flex flex-col gap-[4.38rem] md:gap-[3.25rem] md:px-[1.25rem] sm:gap-[2.19rem] h-full pt-12 overflow-x-hidden">
        {/* here will be header */}
        <div className="flex md:w-full md:flex-col max-w-[55rem] gap-8 mx-auto md:items-center">
          <ProfileNav />
          {/* Main Content */}
          <div className="flex flex-col items-start justify-start gap-5 max-w-[34.37rem] md:w-full">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
