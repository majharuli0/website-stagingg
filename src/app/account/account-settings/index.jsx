"use client";
import { useAuth } from "@/context/AuthContext";
import AddressModal from "@/modals/AddressModal";
import ForgotPass from "@/modals/ForgotPass";
import OtpModal from "@/modals/OtpModal";
import { useUserService } from "@/services/userService";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import toast
import { Button, Heading, Input, Text } from "../../../components";
import { chnageEmailSchema, chnagePasswordSchema } from "../../../../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const AccountSetting = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [AddressInfo, setAddressInfo] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [tempEmail, setTempmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [error2, setError2] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP input
  const [countries, setCountries] = useState([]);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { accessToken, logout, email, userDetails, fetchUserDetails } =
    useAuth();
  const {
    updateUserName,
    updatePassword,
    getUserDetailsById,
    updateEmail,
    getCountries,
    resendOtp,
    authEmail,
  } = useUserService();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(chnageEmailSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    register: registerPassword,
    setError: setErrorPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(chnagePasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const handleAddressModalToggle = (isOpen) => {
    setIsAddressModalOpen(isOpen);
  };
  const handleForgotModalToggle = (isOpen) => {
    setIsForgotModalOpen(isOpen);
  };
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      fetchCountries();
    }
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      if (response && response.data) {
        setCountryData(response.data);
        setCountries(
          response.data.map((country) => ({
            label: `${country.country_name}`, // Display country name with code
            value: country._id,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };
  const handleChangePassword = async (data) => {
    setLoading(true);
    try {
      const response = await updatePassword({
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
      });
      toast.success("Password updated successfully!");
      resetPassword();
      logout();
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((err) => {
          const field = err.property;
          const errorMessage =
            Object.values(err.message)?.[0] || "Invalid value";

          setErrorPassword(field, {
            type: "server",
            message: errorMessage,
          });
        });
      }
      console.error("Failed to update password:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (data) => {
    setLoading2(true);
    try {
      const response = await updateEmail({
        email,
        tempEmail: getValues("tempEmail"),
        password: getValues("password"),
      });
      toast.success("OTP has been sent to your new email!");
      setIsOtpModalOpen(true);
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
      console.error("Failed to update emaili ammm:", err.message);
    } finally {
      setLoading2(false);
    }
  };

  const handleAuthVerification = async (otp) => {
    setLoading3(true);
    try {
      const response = await authEmail({
        email: getValues("tempEmail"),
        otp: otp,
      });
      if (response.status) {
        toast.success("Email Changed successfully!"); // Notify user
        setIsOtpModalOpen(false);
        reset();
        logout();
      } else {
        console.error(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      console.error(err.message || "An error occurred during OTP verification");
    } finally {
      setLoading3(false);
    }
  };

  const handleAddressSave = (updatedAddress) => {
    setIsAddressModalOpen(false);
  };

  return (
    <div className="">
      {/* OTP Modal */}
      {isOtpModalOpen && (
        <OtpModal
          isOpen={isOtpModalOpen}
          onChange={setIsOtpModalOpen}
          onVerify={handleAuthVerification}
          error={error2}
          email={getValues("tempEmail")}
          setError={setError2}
          setOtp={setOtp}
          onResend={handleChangeEmail}
          loading={loading3}
        />
      )}
      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onChange={handleAddressModalToggle}
        countryData={countryData}
        address={userDetails}
        onSave={handleAddressSave}
      />

      <div className="flex flex-col items-start border-b border-solid border-border pb-4 md:items-center md:text-center">
        <Heading
          size="text4xl"
          as="h3"
          className="text-[1.75rem] font-medium text-[#1d293f] md:text-[1.63rem] sm:text-[1.50rem] md:text-center"
        >
          Account Settings
        </Heading>
        <Text
          as="p"
          className="mb-[0.05rem] text-[1.13rem] font-normal text-[#6c7482] "
        >
          Update your email or change your password
        </Text>
      </div>
      <ForgotPass
        isOpen={isForgotModalOpen}
        onChange={handleForgotModalToggle}
      />
      {/* Email Section */}
      {/* Email Section */}
      <div className="bg-white rounded-lg md:text-center my-6">
        <Heading
          size="text3xl"
          as="h4"
          className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38rem] mb-1"
        >
          Change E-mail
        </Heading>
        <Text as="p" className="text-[1.13rem] font-normal text-[#6c7482] mb-4">
          You must enter a password to change your e-mail address
        </Text>
        <form onSubmit={handleSubmit(handleChangeEmail)}>
          <div className="flex flex-col items-start gap-[0.38rem] mb-4">
            <Heading
              size="headingmd"
              as="h5"
              className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
            >
              E-mail Address
            </Heading>
            <Input
              shape="round"
              placeholder={`example@gmail.com`}
              // onChange={(e) => setTempmail(e.target.value)}
              className="self-stretch rounded-[12px] !border px-[1.63rem] lowercase sm:px-[1.25rem]"
              {...register("tempEmail")}
            />
            {errors.tempEmail && (
              <Text
                as="p"
                className="text-red-500 text-sm mt-1
"
              >
                {errors.tempEmail.message}
              </Text>
            )}
          </div>
          <div className="flex flex-col gap-[0.25rem] mb-4">
            <div className="flex flex-wrap justify-between gap-[1.25rem]">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
              >
                Password
              </Heading>
              <Link href="/login/forgot-password">
                <Text
                  as="p"
                  // onClick={() => handleForgotModalToggle(true)}

                  className="text-[1.13rem] font-medium cursor-pointer capitalize text-primary"
                >
                  Forgot Password?
                </Text>
              </Link>
            </div>

            {/* <Input
            size="xl"
            shape="round"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
          /> */}
            <div className="relative w-full">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="w-full rounded-[12px] border px-[1.63rem] py-2 sm:px-[1.25rem]"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <Text
                as="p"
                className="text-red-500 text-sm mt-1
"
              >
                {errors.password.message}
              </Text>
            )}
          </div>
          <Button
            loading={loading2}
            type="submit"
            color="green_200_green_400_01"
            shape="round"
            className="min-w-[10.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          >
            Change Email
          </Button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-lg mb-6">
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38rem] mb-4 md:text-center"
        >
          Change Password
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
          To change your current password you need to remember your old password
          or you can reset your password
        </Text>
        <form onSubmit={handleSubmitPassword(handleChangePassword)}>
          <div className="flex flex-col gap-[0.88rem]">
            <div className="flex flex-col gap-[0.25rem] mb-4">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
              >
                Old Password
              </Heading>
              <div className="relative">
                <Input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter Your Old Password"
                  className="w-full rounded-[12px] border px-[1.63rem] py-2 sm:px-[1.25rem]"
                  {...registerPassword("oldPassword")}
                />
              </div>
              {passwordErrors.oldPassword && (
                <Text
                  as="p"
                  className="text-red-500 text-sm mt-1
"
                >
                  {passwordErrors.oldPassword.message}
                </Text>
              )}
            </div>
            <div className="flex flex-col items-start gap-[0.38rem] mb-4">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
              >
                New Password
              </Heading>
              <div className="relative w-full">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter Your New Password"
                  className="w-full rounded-[12px] border px-[1.63rem] py-2 sm:px-[1.25rem]"
                  {...registerPassword("newPassword")}
                />
              </div>
              {passwordErrors.newPassword && (
                <Text
                  as="p"
                  className="text-red-500 text-sm mt-1
"
                >
                  {passwordErrors.newPassword.message}
                </Text>
              )}
            </div>
          </div>
          <Button
            loading={loading}
            color="green_200_green_400_01"
            shape="round"
            type="submit"
            className="min-w-[12.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          >
            Change Password
          </Button>
        </form>
      </div>

      {/* Address Change Section */}
      <div className="bg-white rounded-lg mb-6 md:text-center">
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          Address
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
          Manage Your Address and Change It Anytime.
        </Text>
        <div id="addressection" className="">
          <Heading
            size="text3xl"
            as="p"
            className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
          >
            Address1
          </Heading>
          <Text
            as="p"
            className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
          >
            {userDetails?.address}
          </Text>
          <Heading
            size="text3xl"
            as="p"
            className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
          >
            Address2
          </Heading>
          <Text
            as="p"
            className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
          >
            {userDetails?.address2 || "Not Provided"}
          </Text>
          <div className="city wrap flex justify-between md:justify-normal md:flex-col">
            <div className="flex flex-col md:justify-start">
              <Heading
                size="text3xl"
                as="p"
                className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
              >
                Country
              </Heading>
              <Text
                as="p"
                className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
              >
                {
                  countries.find(
                    (country) => country.value === userDetails?.country_id
                  )?.label
                }
              </Text>
            </div>
            <div className="flex flex-col md:justify-start">
              <Heading
                size="text3xl"
                as="p"
                className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
              >
                City
              </Heading>
              <Text
                as="p"
                className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
              >
                {userDetails?.city}
              </Text>
            </div>
          </div>
        </div>
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          Phone Number
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
          {userDetails?.contact_code} {userDetails?.contact_number}
        </Text>
      </div>
      <Button
        color="green_200_green_400_01"
        shape="round"
        className="min-w-[12.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
        onClick={() => handleAddressModalToggle(true)} // Open the modal
      >
        Change Address
      </Button>
    </div>
  );
};

export default AccountSetting;
