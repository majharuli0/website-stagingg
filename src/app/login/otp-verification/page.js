"use client";

import { Button, Heading, Text } from "@/components"; // Adjust the import path as necessary
import { useUserService } from "@/services/userService";
import CryptoJS from "crypto-js"; // Import crypto-js for decryption
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import { toast } from "react-toastify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import AuthFormTemplate from "@/components/ui/formTemplate";
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
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

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
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Use the same secret key
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
    const decryptedOtp = decryptData(encryptedOtp);

    if (otp.length !== 6) {
      setError("Your one-time password must be 6 characters.");
      return;
    }
    handleOtpVerification(otp);
  };
  const resendCode = async () => {
    setIsResending(true);
    await handleresendOTP();
  };

  const handleOtpVerification = async (otp) => {
    setLoading(true);
    try {
      const response = await verifyOtp({
        email,
        otp: otp,
      });
      if (response.status) {
        router.push(
          `/login/set-password?email=${encodeURIComponent(
            email
          )}&otp=${encodeURIComponent(otp)}`
        );
      } else {
        console.log(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      console.log(err.message || "An error occurred during OTP verification");
    } finally {
      setLoading(false);
    }
  };
  const handleresendOTP = async () => {
    try {
      const response = await resendOtp({ email });
      if (response.status) {
        setCountdown(60);
        setIsResending(false);
      } else {
        console.log(
          response.message || "Failed to send OTP. Please try again."
        );
        toast.error("Failed to send OTP. Please try again.");
        setIsResending(false);
      }
    } catch (err) {
      console.log(err.message || "An error occurred during OTP resend");
      setIsResending(false);
    }
  };

  return (
    <div className="">
      <AuthFormTemplate
        title="Verify Your Identity"
        description={`We’ve sent a one-time code to ${email}. Please enter it below.`}
        isBack={true}
      >
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <div className="flex flex-col justify-center md:justify-center w-[100%] flex-2 md:w-full gap-4 py-3.5 sm:px-5">
            <InputOTP value={otp} onChange={(val) => setOtp(val)} maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Text
              as="p"
              className="text-[1rem] font-normal text-text text-center"
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
          {error && (
            <Text as="p" className="text-red-500 text-[15px]">
              {error}
            </Text>
          )}
          <Button
            loading={loading}
            onClick={verifyCode}
            type="submit"
            shape="round"
            color="green_200_green_400_01"
            className="w-full rounded-[14px] px-[2.13rem] font-semibold"
          >
            Verify OTP
          </Button>
        </div>
      </AuthFormTemplate>
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
