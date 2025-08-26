"use client";
import { Heading, Img, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import * as Avatar from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfileNav() {
  const router = useRouter();
  const { removeStripeCustomerId, getUserDetailsById } = useUserService();
  const { accessToken, logout, userDetails } = useAuth();
  const pathname = usePathname(); // Get the current pathname
  const [showName, setShowName] = useState("");
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
  } = useAuth();
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

  return (
    <div className="flex flex-col gap-[1.50rem] min-w-[22rem] md:w-full bg-white rounded-lg ">
      {/* Profile Info */}
      <div className="flex items-center gap-[1.25rem] md:flex-col md:text-center">
        <div className="size-14 text-white bg-primary flex items-center justify-center rounded-full">
          <User />
        </div>
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

      {/* Navigation Links */}
      <div className="flex flex-col md:flex-row items-start md:justify-center md:items-center gap-6 md:gap-4 md:border-b">
        {/* Edit Profile */}
        <Link href="/account">
          <div
            className={`flex self-stretch transition-colors duration-200 ${
              pathname === "/account"
                ? "border-b-2 border-[#002248] text-[#1d293f] font-medium"
                : ""
            }`}
          >
            <Heading
              as="h2"
              className={`text-[1rem] md:text-[1rem] md:pb-2 font-normal ${
                pathname === "/account"
                  ? "!text-[rgb(29,41,63)] !font-medium"
                  : "text-[rgb(108,116,130)]"
              }`}
            >
              Edit Profile
            </Heading>
          </div>
        </Link>

        {/* Account Settings */}
        <Link href="/account/account-settings">
          <div
            className={`flex self-stretch transition-colors duration-200 ${
              pathname === "/account/account-settings"
                ? "border-b-2 border-[#002248] text-[#1d293f] font-medium"
                : ""
            }`}
          >
            <Heading
              as="h3"
              className={`text-[1.00rem] font-normal md:pb-2 md:ml-0 transition-colors duration-200 ${
                pathname === "/account/account-settings"
                  ? "!text-[#1d293f] !font-medium"
                  : "text-[rgb(108,116,130)]"
              }`}
            >
              Account <span className="md:hidden">Setting</span>
            </Heading>
          </div>
        </Link>

        {/* Billing Information */}
        <Link href="/account/billing-information">
          <div
            className={`flex self-stretch transition-colors duration-200 ${
              pathname === "/account/billing-information"
                ? "border-b-2 border-[#002248] text-[#1d293f] font-medium"
                : ""
            }`}
          >
            <Heading
              as="h4"
              className={`text-[1.00rem] font-normal md:pb-2 md:ml-0 transition-colors duration-200 ${
                pathname === "/account/billing-information"
                  ? "!text-[#1d293f] !font-medium"
                  : "text-[rgb(108,116,130)]"
              }`}
            >
              Billing <span className="md:hidden">Information</span>
            </Heading>
          </div>
        </Link>

        {/* Add Device */}
        <Link href="/account/add-device">
          <div
            className={`flex self-stretch transition-colors duration-200 ${
              pathname === "/account/add-device"
                ? "border-b-2 border-[#002248] text-[#1d293f] font-medium"
                : ""
            }`}
          >
            <Heading
              as="h4"
              className={`text-[1.00rem] font-normal md:pb-2 md:ml-0 transition-colors duration-200 ${
                pathname === "/account/add-device"
                  ? "!text-[#1d293f] !font-medium"
                  : "text-[rgb(108,116,130)]"
              }`}
            >
              Your <span className="md:hidden">Device</span>
            </Heading>
          </div>
        </Link>

        {/* Sign Out */}
        <button onClick={handleSignOutClick}>
          <Heading
            as="h5"
            className="text-[1.00rem] font-normal !text-red-600 transition-colors duration-200"
          >
            Sign Out
          </Heading>
        </button>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-fadeIn scale-95 transform transition-all">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Sign Out
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to sign out? You’ll need to log in again
                to continue.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelSignOut}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSignOut}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Extra Styles */}
        <style jsx>{`
          .confirmation-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
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
            background-color: #007bff;
            color: white;
            border-radius: 4px;
            transition: background-color 0.3s;
          }
          .confirmation-content button:hover {
            background-color: #0056b3;
          }
          .confirmation-content button:last-child {
            background-color: #dc3545;
          }
          .confirmation-content button:last-child:hover {
            background-color: #c82333;
          }
        `}</style>
      </div>
    </div>
  );
}
