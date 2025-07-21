"use client";

import { useAuth } from "@/context/AuthContext";
import CryptoJS from "crypto-js"; // Import crypto-js for decryption
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../../components";
import { useUserService } from "../../../services/userService";
import { Suspense } from "react";

const SetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedEmail = searchParams.get("email");
  const encryptedOtp = searchParams.get("otp");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { resetPassword } = useUserService();
  const { accessToken } = useAuth();
  // Function to decrypt data
  const decryptData = (encryptedData) => {
    if (!encryptedData) {
      return null; // Return null if the data is invalid
    }
    const secretKey = "your-secret-key"; // Use the same secret key
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  console.log(encryptedEmail, encryptedOtp);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate password and confirm password
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetPassword({
        // otp: encryptedOtp,
        email: encryptedEmail,
        password,
      });

      if (response && response.status) {
        setSuccessMessage("Password has been reset successfully!");
        // Redirect based on access token
        if (accessToken) {
          router.push("/account");
        } else {
          router.push("/login");
        }
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while resetting the password");
    }
  };

  return (
    <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
      <form
        onSubmit={handleSetPassword}
        className="flex flex-col items-start gap-[0.75rem] w-[40%] tab:w-[90%]  md:items-center"
      >
        <Heading size="heading7xl" as="h1" className="font-bold text-text">
          Create New Password
        </Heading>
        <Text
          as="p"
          className="text-[1.13rem] font-medium capitalize pb-[1.6rem] md:text-center  "
        >
          Please create a strong password with a minimum of eight digits.
        </Text>
        <div className="flex justify-start w-full">
          <Heading
            size="headingmd"
            as="h6"
            className="text-[1.13rem] leading-5 font-semibold capitalize text-[#1d293f]  "
          >
            Password
          </Heading>
        </div>
        <Input
          shape="round"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`New Password`}
          className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
        />
        <div className="flex justify-start w-full">
          <Heading
            size="headingmd"
            as="h6"
            className="text-[1.13rem] leading-5 font-semibold capitalize text-[#1d293f]  "
          >
            Confirm Password
          </Heading>
        </div>
        <Input
          shape="round"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={`Confirm Password`}
          className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
        />
        <Button
          type="submit"
          shape="round"
          color="green_200_green_400_01"
          className="w-full rounded-[14px] px-[2.13rem] font-semibold"
        >
          Set Password
        </Button>
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
        {successMessage && (
          <Text className="text-green-500 text-sm">{successMessage}</Text>
        )}
      </form>
    </div>
  );
};

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPassword />
    </Suspense>
  );
}
