"use client";

import { Heading, Text } from "@/components"; // Adjust the import path as necessary
import { useUserService } from "@/services/userService";
import CryptoJS from "crypto-js"; // Import crypto-js for decryption
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import { toast } from "react-toastify";
const OtpVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedEmail = searchParams.get("email");
  const encryptedOtp = searchParams.get("otp");
  const inputRefs = useRef([]);
  const otpRef = useRef(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState("");
  const { verifyOtp, resendOtp } = useUserService();
  const [countdown, setCountdown] = useState(60); // Start with 60 seconds
  useEffect(() => {
    if (countdown === 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (!encryptedEmail || !encryptedOtp) {
      console.log("Redirecting to Forgot Password page."); // Debugging log
      router.push("/login/forgot-password"); // Redirect if parameters are missing
    } else {
      const decryptedEmail = decryptData(encryptedEmail);
      if (decryptedEmail) {
        setEmail(decryptedEmail); // Set email state
      } else {
        setError("Invalid email data.");
      }
    }
  }, [encryptedEmail, encryptedOtp, router]); // Add dependencies to the useEffect

  const decryptData = (encryptedData) => {
    if (!encryptedData) {
      return null; // Return null if the data is invalid
    }
    const secretKey = "your-secret-key"; // Use the same secret key
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    otpRef.current[index] = value;

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otpRef.current[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyCode = () => {
    const code = otpRef.current.join("");
    const decryptedOtp = decryptData(encryptedOtp); // Decrypt the OTP from the URL

    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }
    handleOtpVerification(code);
  };
  const resendCode = async () => {
    setIsResending(true);
    await handleresendOTP();
  };

  const handleOtpVerification = async (otp) => {
    try {
      const response = await verifyOtp({
        email,
        otp: otp,
      });
      if (response.status) {
        console.log("verify");
        router.push(
          `/login/set-password?email=${encodeURIComponent(
            email
          )}&otp=${encodeURIComponent(otp)}`
        );
      } else {
        setError(
          response.message || "OTP verification failed. Please try again."
        );
        toast.error("OTP verification failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during OTP verification");
    }
  };
  const handleresendOTP = async () => {
    try {
      const response = await resendOtp({ email });
      if (response.status) {
        console.log("OTP resent");
        setCountdown(60); // Restart the countdown
        setIsResending(false);
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
        toast.error("Failed to send OTP. Please try again.");
        setIsResending(false);
      }
    } catch (err) {
      setError(err.message || "An error occurred during OTP resend");
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
      <div className="flex flex-col gap-2 w-full md:justify-center items-center">
        <Heading size="heading7xl" as="h2" className="font-bold text-green-200">
          Check your email
        </Heading>
        <Text
          as="p"
          className="text-[1.5rem] sm:text-[1rem] font-normal leading-[1.69rem] text-body md:text-center sm:px-2"
        >
          We&apos;ve emailed a 6-digit code to{" "}
          <span className="font-medium text-text">{email}</span>. Please use it
          soon.
        </Text>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex justify-center md:justify-center w-[100%] flex-2 md:w-full gap-4 px-6 py-3.5 sm:px-5">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-16 h-16 text-center text-2xl font-semibold border-2 border-solid border-border rounded-lg focus:border-primary focus:outline-none"
              />
            ))}
        </div>
        {error && (
          <Text as="p" className="text-red-500 text-sm">
            {error}
          </Text>
        )}
        <button
          onClick={verifyCode}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Verify Code
        </button>
        <Text
          as="p"
          className="text-[1.13rem] font-normal text-text text-center"
        >
          Didn&apos;t get the code?{" "}
          {countdown > 0 ? (
            <span className="font-medium text-gray-400">
              Resend in {countdown}s
            </span>
          ) : (
            <button
              onClick={resendCode}
              className="font-medium text-primary hover:underline"
              disabled={isResending}
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button>
          )}
        </Text>
      </div>
    </div>
  );
};

export default function OtpVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerification />
    </Suspense>
  );
}
