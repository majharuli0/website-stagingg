"use client";
import Header from "@/components/layouts/Navbar/index";
import ProfileNav from "./ProfileNav";
import Footer from "@/components/layouts/Footer";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import { useEffect, useState } from "react";
import { Text } from "@/components";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function AccountLayout({ children }) {
  const {
    setEmail,
    email,
    user,
    userName,
    lastUserName,
    setUserName,
    setLastUserName,
    setCustomerMail,
    customerMail,
    setUserDetails,
    userDetails,
    fetchUserDetails,
  } = useAuth();
  const { removeStripeCustomerId, getUserDetailsById } = useUserService();
  const router = useRouter();
  const [storedUserId, setStoredUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("user_id");
      setStoredUserId(userId);
    }
  }, []);
  useEffect(() => {
    fetchUserDetails(storedUserId);
  }, [storedUserId]);

  // const fetchUserDetails = async (id) => {
  //   try {
  //     const userDetails = await getUserDetailsById(id);
  //     setUserName(userDetails.data.name);
  //     setLastUserName(userDetails.data.last_name);
  //     setEmail(userDetails.data.email);
  //     localStorage.setItem("user_email", userDetails.data.email);
  //     setCustomerMail(userDetails.data.email);
  //     localStorage.setItem("subscription_id", userDetails.data.subscription_id);
  //     setUserDetails(userDetails.data);
  //     localStorage.setItem("isUserVerified", true);
  //   } catch (error) {
  //     console.error("Failed to fetch user details:", error);
  //   }
  // };
  // if (!userDetails) {
  //   return (
  //     <div className="flex w-full h-fit flex-col items-center">
  //       <Header />

  //       <Footer />
  //     </div>
  //   );
  // }
  const isLogin = Cookies.get("access_token") ? true : false;
  if (!storedUserId) {
    return router.push("/login");
  }
  if (!isLogin) {
    return router.push("/login");
  }

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
