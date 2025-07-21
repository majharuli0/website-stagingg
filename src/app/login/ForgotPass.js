"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../components";
import { useUserService } from "../../services/userService";

const RightSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { resendOtp } = useUserService();

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await resendOtp({ email });

      if (response && response.success) {
        setSuccessMessage("OTP has been sent to your email. Please check your inbox.");
      } else {
        console.log("Unexpected response structure:", response);
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError(err.message || "An error occurred while sending OTP");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
        <form
          onSubmit={handleResendOtp}
          className="flex flex-col items-start gap-[0.75rem] sm:w-[90%] md:items-center"
        >
          <EmailInput email={email} setEmail={setEmail} />
          <Button
            type="submit"
            shape="round"
            color="green_200_green_400_01"
            className="w-full rounded-[14px] px-[2.13rem] font-semibold"
          >
            Resend OTP
          </Button>
          {error && <Text className="text-red-500 text-sm">{error}</Text>}
          {successMessage && <Text className="text-green-500 text-sm">{successMessage}</Text>}
          {/* Uncomment if you want to provide a link to sign up */}
          {/* <Text as="p" className="text-center text-lg text-body sm:m-auto">
            <span className="inline-flex items-center">
              Need to create an account?
              <Link href="/register" className="font-semibold text-primary ml-2">
                Sign Up
              </Link>
            </span>
          </Text> */}
        </form>
      </div>
    </>
  );
};

const EmailInput = ({ email, setEmail }) => (
  <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
    <Heading size="heading7xl" as="h1" className="font-bold text-text">
      Forgot Password
    </Heading>
    <Text as="p" className="text-[1.13rem] font-medium capitalize ">
      Enter your email to receive an OTP for password reset.
    </Text>
    <Heading
      size="headingmd"
      as="h2"
      className="text-[1.13rem] font-semibold capitalize text-text "
    >
      Customer&apos;s E-mail
    </Heading>
    <Input
      shape="round"
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={`Customer's E-mail Address`}
      className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
    />
  </div>
);

export default function ForgotPass() {
  return (
    <div className="flex w-full items-center bg-white md:flex-col md:items-center">
      <RightSection />
    </div>
  );
}