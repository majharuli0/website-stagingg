"use client";

import { useAuth } from "@/context/AuthContext";
import CryptoJS from "crypto-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Heading, Input, Text } from "../../../components";
import { useUserService } from "../../../services/userService";
import { Suspense } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setPasswordSchema } from "../../../../schema";
import AuthFormTemplate from "@/components/ui/formTemplate";

const SetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedEmail = searchParams.get("email");
  const encryptedOtp = searchParams.get("otp");

  const { resetPassword } = useUserService();
  const { accessToken, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(setPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const decryptData = (encryptedData) => {
    if (!encryptedData) return null;
    const secretKey = "your-secret-key";
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword({
        email: encryptedEmail,
        password: data.password,
      });

      if (response?.status) {
        toast.success("Password reset successful!");
        logout();
        if (accessToken) {
          router.push("/account");
        } else {
          router.push("/login");
        }
      } else {
        console.error("Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.log(
        err.message || "An error occurred while resetting the password"
      );
    }
  };

  return (
    <div className="">
      {/* <div>
        <Heading size="heading7xl" as="h1" className="font-bold text-text">
          Create New Password
        </Heading>
        <Text
          as="p"
          className="text-[1.13rem] font-medium capitalize pb-[1.6rem]"
        >
          Please create a strong password with a minimum of eight characters.
        </Text>
      </div> */}
      <AuthFormTemplate
        title="Create New Password"
        description={`Set a strong new password to secure your account.`}
        isBack={true}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-[0.75rem] w-full"
        >
          {/* Password */}
          <div className="flex flex-col w-full gap-[0.38rem] ">
            <Heading
              size="headingmd"
              as="h6"
              className="text-[1rem] font-semibold text-[#1d293f]"
            >
              Password
            </Heading>
            <Input
              shape="round"
              type="password"
              placeholder="New Password"
              className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col w-full gap-[0.38rem] ">
            <Heading
              size="headingmd"
              as="h6"
              className="text-[1rem] font-semibold text-[#1d293f]"
            >
              Confirm Password
            </Heading>
            <Input
              shape="round"
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            loading={isSubmitting}
            type="submit"
            shape="round"
            color="green_200_green_400_01"
            className="w-full rounded-[14px] px-[2.13rem] font-semibold mt-3"
          >
            Set Password
          </Button>
        </form>
      </AuthFormTemplate>
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
