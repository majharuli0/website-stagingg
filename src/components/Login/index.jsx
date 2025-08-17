"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../components";
import { useUserService } from "../../services/userService";
import { toast } from "react-toastify";
import { loginSchema } from "../../../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthFormTemplate from "../ui/formTemplate";

const RightSection = () => {
  const { login } = useUserService();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      localStorage.setItem("user_id", response.data._id);
      localStorage.setItem("isUserVerified", true);
      localStorage.setItem(
        "user_credentials",
        JSON.stringify({ email: data.email, password: data.password })
      );
      localStorage.setItem(
        "agent_details",
        JSON.stringify({ agent_id: response.data?.agent_id })
      );

      if (response?.data?.access_token) {
        toast.success("Login successful!");
        router.push("/account");
      } else {
        toast.error("Login failed. Please try again.");
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
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <AuthFormTemplate
        title="Sign In to Seenyor"
        description="Sign in to continue to your account."
        isBack={false}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full items-start gap-[1rem]  md:items-center"
        >
          {/* Email */}
          <div className="flex flex-col items-start gap-[0.38rem] self-stretch w-full">
            <Heading
              size="headingmd"
              as="h2"
              className="text-[1rem] font-semibold capitalize text-text"
            >
              Customer&apos;s E-mail
            </Heading>
            <Input
              shape="round"
              type="email"
              placeholder="Customer's E-mail Address"
              className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
              {...register("email")}
            />
            {touchedFields.email && errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col items-start gap-[0.25rem] self-stretch w-full">
            <div className="w-full flex flex-wrap justify-between gap-[1rem]">
              <Heading
                size="headingmd"
                as="h3"
                className="text-[1rem] font-semibold capitalize text-text"
              >
                Password
              </Heading>
              <Link href="/login/forgot-password">
                <Text as="p" className="capitalize text-[1rem] text-primary">
                  Forgot Password?
                </Text>
              </Link>
            </div>
            <Input
              shape="round"
              type="password"
              placeholder="Password"
              className="w-full rounded-[12px] !border capitalize"
              {...register("password")}
            />
            {touchedFields.password && errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            shape="round"
            color="green_200_green_400_01"
            className="w-full rounded-[14px] px-[2.13rem] font-semibold mt-3"
            loading={isSubmitting}
          >
            Sign In&nbsp;
          </Button>
        </form>
      </AuthFormTemplate>
    </div>
  );
};

export default function LoginPage() {
  return (
    <div className="">
      <RightSection />
    </div>
  );
}
