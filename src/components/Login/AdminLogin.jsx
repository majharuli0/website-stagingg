"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button, Heading, Input, Text } from "..";
import { useUserService } from "../../services/userService";
import { loginSchema } from "../../../schema";

const RightSection = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUserService();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data) => {
    setError("");
    try {
      const response = await login(data);

      if (response?.data?._id) {
        localStorage.setItem("user_id", response.data._id);
      }

      if (response?.data?.access_token) {
        router.push("/dashboard");
        toast.success("Login successful!");
      } else {
        console.error("Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col items-start gap-[0.75rem] sm:w-[90%] md:items-center"
      >
        {/* Email */}
        <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
          <Heading size="heading7xl" as="h1" className="font-bold text-text">
            Sign In to Seenyor
          </Heading>
          <Text as="p" className="text-[1.13rem] font-medium capitalize">
            Enter your details to sign in to your account.
          </Text>
          <Heading
            size="headingmd"
            as="h2"
            className="text-[1.13rem] font-semibold capitalize text-text"
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
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col items-start gap-[0.25rem] self-stretch">
          <div className="w-full flex flex-wrap justify-between gap-[1.25rem] self-stretch">
            <Heading size="headingmd" as="h3" className="capitalize text-text">
              Password
            </Heading>
            <Link href="/login/forgot-password">
              <Text as="p" className="capitalize text-primary">
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
          {errors.password && (
            <Text className="text-red-500 text-sm">
              {errors.password.message}
            </Text>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          shape="round"
          color="green_200_green_400_01"
          className="w-full rounded-[14px] px-[2.13rem] font-semibold"
          loading={isSubmitting}
        >
          Sign In&nbsp;
        </Button>
      </form>
    </div>
  );
};

export default function AdminLogin() {
  return (
    <div className="flex w-full items-center bg-white md:flex-col md:items-center">
      <RightSection />
    </div>
  );
}
