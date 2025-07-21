"use client";

import Link from "next/link";
import { Button, Heading, Input, Text } from "../../components";



const RightSection = () => (
  <div className="flex flex-1 flex-col items-center gap-[2.13rem] px-[3.50rem] md:self-stretch md:px-[1.25rem]">
    <ForgotPasswordHeader />
    <ForgotPasswordForm />
  </div>
);

const ForgotPasswordHeader = () => (
  <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
    <Link href="#" className="md:text-[2.00rem] sm:text-[1.88rem]">
      <Heading size="heading7xl" as="h1" className="text-[2.13rem] font-bold text-text">
        Forgot Password
      </Heading>
    </Link>
    <Text as="p" className="w-[76%] text-[1.13rem] font-normal capitalize leading-[1.69rem] text-body md:w-full">
      Enter Your e-mail and we will send you a verification code to reset your password.
    </Text>
  </div>
);

const ForgotPasswordForm = () => (
  <div className="flex w-[80%] flex-col items-start gap-[1.00rem] md:w-full">
    <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
      <Heading size="headingmd" as="h2" className="text-[1.13rem] font-semibold capitalize text-text">
        Customer&apos;s E-mail
      </Heading>
      <Input
        shape="round"
        type="email"
        name="Label"
        placeholder={`Customer's E-mail Address`}
        className="w-[76%] rounded-[12px] !border px-[1.63rem] capitalize sm:px-[1.25rem]"
      />
    </div>
    <Button
      shape="round"
      color="green_200_green_400_01"
      className="min-w-[27.50rem] rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem]"
    >
      Send
    </Button>
  </div>
);

export default function ForgotPassword() {
  return (
    <div>
      <RightSection />
    </div>
  );
}