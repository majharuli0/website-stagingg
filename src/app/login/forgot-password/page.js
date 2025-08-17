"use client";

import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { Button, Heading, Input, Text } from "../../../components";
import { useUserService } from "../../../services/userService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../../../schema";
import AuthFormTemplate from "@/components/ui/formTemplate";
const ForgotPassword = () => {
  const router = useRouter();
  const { resendOtp } = useUserService();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const encryptData = (data) => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const onSubmit = async (data) => {
    try {
      const response = await resendOtp({ email: data.email });

      if (response?.status) {
        const otp = response.otp;
        const encryptedEmail = encryptData(data.email);
        const encryptedOtp = encryptData(otp);

        toast.success("OTP sent successfully!");
        router.push(
          `/login/otp-verification?email=${encodeURIComponent(
            encryptedEmail
          )}&otp=${encodeURIComponent(encryptedOtp)}`
        );
      } else {
        console.error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((err) => {
          const field = err.property;
          const errorMessage =
            Object.values(err.message)?.[0] || "Invalid value";

          setError(field, {
            type: "server",
            message: errorMessage,
          });
        });
      }
      console.error(err.message || "An error occurred while sending OTP");
    }
  };

  return (
    <div>
      <AuthFormTemplate
        title="Forgot Password?"
        description="Enter your email to receive a verification code."
        isBack={true}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-[0.75rem] w-full"
        >
          <div className="flex flex-col gap-[0.38rem] w-full">
            <Heading
              size="headingmd"
              as="h6"
              className="text-[1rem] leading-5 font-semibold capitalize text-[#1d293f]"
            >
              E-mail Address
            </Heading>
            <Input
              shape="round"
              type="email"
              placeholder="Customer's E-mail Address"
              className="w-full rounded-[12px] !border px-[1.63rem]"
              {...register("email")}
            />
            {touchedFields.email && errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <Button
            loading={isSubmitting}
            type="submit"
            shape="round"
            color="green_200_green_400_01"
            className="w-full rounded-[14px] px-[2.13rem] font-semibold mt-3"
          >
            Send OTP
          </Button>
        </form>
      </AuthFormTemplate>
    </div>
  );
};

export default ForgotPassword;
