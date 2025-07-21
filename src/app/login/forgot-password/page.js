"use client";

import CryptoJS from "crypto-js"; // Import crypto-js
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../../components";
import { useUserService } from "../../../services/userService";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { resendOtp } = useUserService(); // Assuming you have a resendOtp function

  // Function to encrypt data
  const encryptData = (data) => {
    const secretKey = "your-secret-key"; // Use a strong secret key
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await resendOtp({ email });

      if (response && response.status) {
        // Capture the OTP from the response
        const otp = response.otp;

        // Encrypt the email and OTP
        const encryptedEmail = encryptData(email);
        const encryptedOtp = encryptData(otp);
        setSuccessMessage("Otp Send to Your Email");
        // Redirect to the OTP verification page with the encrypted email and OTP
        router.push(
          `/login/otp-verification?email=${encodeURIComponent(
            encryptedEmail
          )}&otp=${encodeURIComponent(encryptedOtp)}`
        );
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while sending OTP");
    }
  };

  return (
    <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
      <form
        onSubmit={handleResendOtp}
        className="flex flex-col items-start gap-[0.75rem] w-[40%] tab:w-[90%]  md:items-center"
      >
        <Heading size="heading7xl" as="h1" className="font-bold text-text">
          Forgot Password
        </Heading>
        <Text
          as="p"
          className="text-[1.13rem] font-medium capitalize pb-[1.6rem] md:text-center "
        >
          Enter Your e-mail and we will send you a verification code to reset
          your password.
        </Text>
        <div  className="flex justify-start w-full">
        <Heading
          size="headingmd"
          as="h6"
          className="text-[1.13rem] leading-5 font-semibold capitalize text-[#1d293f]  "
        >
          Customer&apos;s E-mail Address
        </Heading>
        </div>
        <Input
          shape="round"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`Customer's E-mail Address`}
          className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
        />
        <Button
          type="submit"
          shape="round"
          color="green_200_green_400_01"
          className="w-full rounded-[14px] px-[2.13rem] font-semibold"
        >
          Send OTP
        </Button>
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
        {successMessage && (
          <Text className="text-green-500 text-sm">{successMessage}</Text>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
