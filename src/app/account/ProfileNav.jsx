"use client";
import { Heading, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link"; // Import Link from next/link
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileNav() {
  const router = useRouter();
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
  } = useAuth();
  const { removeStripeCustomerId, getUserDetailsById } = useUserService();
  const { accessToken, logout } = useAuth();
  const pathname = usePathname(); // Get the current pathname
  const [showName, setShowName] = useState("");
  const [userId, setUserId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    removeStripeCustomerId();
    logout();
    window.location.href = "/";
  };
  const handleSignOutClick = () => {
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const confirmSignOut = () => {
    handleLogout(); // Sign out if confirmed
    setShowConfirmation(false); // Close confirmation dialog
  };

  const cancelSignOut = () => {
    setShowConfirmation(false); // Cancel sign-out
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserDetails(storedUserId);
    }
    console.log(pathname);
  }, [pathname]);

  const fetchUserDetails = async (id) => {
    try {
      const userDetails = await getUserDetailsById(id);
      setUserName(userDetails.data.name);
      setLastUserName(userDetails.data.last_name);
      setEmail(userDetails.data.email);
      localStorage.setItem("user_email", userDetails.data.email);
      setCustomerMail(userDetails.data.email);
      console.log("i am userdat", userDetails);
      localStorage.setItem("subscription_id", userDetails.data.subscription_id);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  return (
    <div className="flex flex-col gap-[1.50rem] min-w-[22rem] md:w-full bg-white rounded-lg ">
      <div className="flex items-center gap-[1.25rem] md:flex-col md:text-center">
        <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-200 align-middle">
          <Avatar.Image
            className="size-full rounded-[inherit] object-cover"
            src="images/Avater.svg"
            alt="avatar"
          />
        </Avatar.Root>
        <div className="flex flex-1 flex-col items-start md:items-center">
          <Heading
            size="heading3xl"
            as="h1"
            className="text-[#1d293f] md:items-center"
          >
            {userName} {lastUserName}
          </Heading>
          <Text
            as="p"
            className="text-[1.13rem] font-normal lowercase text-[#6c7482]"
          >
            {email}
          </Text>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:justify-center md:items-center gap-6 md:gap-4 md:border-b">
        <Link href="/account">
          <div className={`flex self-stretch transition-colors duration-200`}>
            <Heading
              as="h2"
              className={`text-[1rem] md:text-[1rem] md:border-b md:pb-2 font-normal text-[rgb(108,116,130)] ${
                pathname === "/account"
                  ? "!text-[rgb(29,41,63)] !md:border-b !border-b-[rgb(0,34,72)] !font-medium"
                  : ""
              }`}
            >
              Edit Profile
            </Heading>
          </div>
        </Link>
        <Link href="/account/account-settings">
          <div className={`flex self-stretch transition-colors duration-200`}>
            <Heading
              as="h3"
              className={`text-[1.00rem] font-normal md:border-b md:pb-2 text-[rgb(108,116,130)] md:ml-0 transition-colors duration-200 ${
                pathname === "/account/account-settings"
                  ? "text-[#1d293f] !md:border-b !border-b-[#002248] !font-medium"
                  : ""
              }`}
            >
              Account <span className="md:hidden">Setting</span>
            </Heading>
          </div>
        </Link>
        <Link href="/account/billing-information">
          <div className={`flex self-stretch transition-colors duration-200`}>
            <Heading
              as="h4"
              className={`text-[1.00rem] font-normal md:border-b md:pb-2 text-[rgb(108,116,130)] md:ml-0 transition-colors duration-200 ${
                pathname == "/account/billing-information"
                  ? "!text-[#1d293f] !md:border-b !border-b-[#002248] !font-medium"
                  : ""
              }`}
            >
              Billing <span className="md:hidden">Information</span>
            </Heading>
          </div>
        </Link>
        <Link href="/account/add-device">
          <div className={`flex self-stretch transition-colors duration-200`}>
            <Heading
              as="h4"
              className={`text-[1.00rem] font-normal md:border-b md:pb-2 text-[rgb(108,116,130)] md:ml-0 transition-colors duration-200 ${
                pathname == "/account/add-device"
                  ? "!text-[#1d293f] !md:border-b !border-b-[#002248] !font-medium"
                  : ""
              }`}
            >
              Your <span className="md:hidden">Device</span>
            </Heading>
          </div>
        </Link>
        <button onClick={handleSignOutClick}>
          <Heading
            as="h5"
            className="text-[1.00rem] font-normal !text-red-600 transition-colors duration-200"
          >
            Sign Out
          </Heading>
        </button>
        {showConfirmation && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <p>Are you sure you want to sign out?</p>
              <button onClick={confirmSignOut}>Yes</button>
              <button onClick={cancelSignOut}>No</button>
            </div>
          </div>
        )}
        <style jsx>{`
          .confirmation-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5); /* Dim background */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000; /* Ensure it’s above other elements */
          }

          .confirmation-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }

          .confirmation-content p {
            margin-bottom: 1rem;
            font-size: 1.25rem;
            color: #000;
          }

          .confirmation-content button {
            margin: 0 1rem;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            cursor: pointer;
            border: none;
            background-color: #007bff; /* Primary button style */
            color: white;
            border-radius: 4px;
            transition: background-color 0.3s;
          }

          .confirmation-content button:hover {
            background-color: #0056b3;
          }

          .confirmation-content button:last-child {
            background-color: #dc3545; /* Danger button style for cancel */
          }

          .confirmation-content button:last-child:hover {
            background-color: #c82333;
          }
        `}</style>
      </div>
    </div>
  );
}
