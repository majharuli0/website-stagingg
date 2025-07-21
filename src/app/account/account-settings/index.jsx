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
const AccountSetting = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [AddressInfo, setAddressInfo] = useState("");
  const [email, setMail] = useState("");
  const [tempEmail, setTempmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(""); // State for OTP input
  const [countries, setCountries] = useState([]);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { accessToken, logout } = useAuth();
  const {
    updateUserName,
    updatePassword,
    getUserDetailsById,
    updateEmail,
    getCountries,
    authEmail,
  } = useUserService();
  const handleAddressModalToggle = (isOpen) => {
    setIsAddressModalOpen(isOpen);
  };
  const handleForgotModalToggle = (isOpen) => {
    setIsForgotModalOpen(isOpen);
  };
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      fetchUserDetails(storedUserId);
      fetchCountries();
    }
  }, []);

  const fetchUserDetails = async (id) => {
    try {
      const userDetails = await getUserDetailsById(id);
      setAddressInfo(userDetails);

      setMail(userDetails.data.email);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      if (response && response.data) {
        console.log(response.data);
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
  const handleChangePassword = async () => {
    try {
      const response = await updatePassword({ oldPassword, newPassword });
      console.log("Password updated successfully:", response);
      toast.success("Password updated successfully!"); // Show success toast
      setOldPassword("");
      setNewPassword("");
      setError(""); // Clear any previous error messages
    } catch (error) {
      console.error("Failed to update password:", error);
      // Check for specific status codes and messages
      if (error.statusCode === 400) {
        // If the error message is structured differently, adjust accordingly
        const errorMessage = error.message;
        console.log("i am message", errorMessage);
        setError(errorMessage); // Set the error message from the response
      } else {
        setError("An error occurred. Please try again."); // General error message for other status codes
      }
    }
  };

  const handleChangeEmail = async () => {
    setError(""); // Reset any previous error
    try {
      const response = await updateEmail({ email, tempEmail, password });
      console.log("Mail updated successfully:", response);

      // Notify the user that OTP has been sent
      toast.success("OTP has been sent to your new email!");

      // Open OTP modal
      setIsOtpModalOpen(true);
    } catch (error) {
      console.error("Failed to update emaili ammm:", error.message);

      // Handle network errors
      if (error.message) {
        // No response from server (network error)
        setError(error.message);
        toast.error(error.message);
      } else {
        // API responded with an error status code
        const { status, data } = error.message;

        // Handle specific status codes and update error state
        if (status === 400) {
          setError(
            data.message || "Invalid email or password. Please try again."
          );
          toast.error(
            data.message || "Invalid email or password. Please try again."
          );
        } else if (status === 401) {
          setError("Incorrect password. Please enter the correct password.");
          toast.error("Incorrect password. Please enter the correct password.");
        } else if (status === 500) {
          setError("Internal server error. Please try again later.");
          toast.error("Internal server error. Please try again later.");
        } else {
          setError(
            data.message || "An error occurred while updating the email."
          );
          toast.error(
            data.message || "An error occurred while updating the email."
          );
        }
      }
    }
  };

  const handleAuthVerification = async (otp) => {
    try {
      const response = await authEmail({
        email: tempEmail,
        otp: otp,
      });
      if (response.status) {
        toast.success("OTP verified successfully!"); // Notify user
        setIsOtpModalOpen(false);
        logout();
      } else {
        setError(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      setError(err.message || "An error occurred during OTP verification");
    }
  };

  const handleAddressSave = (updatedAddress) => {
    // Here you can handle the updated address, e.g., send it to the server or update the state
    console.log("Updated Address:", updatedAddress);
    // Optionally, you can close the modal after saving
    setIsAddressModalOpen(false);
  };

  console.log(AddressInfo);
  return (
    <div className="">
      {/* OTP Modal */}
      {isOtpModalOpen && (
        <OtpModal
          isOpen={isOtpModalOpen}
          onChange={setIsOtpModalOpen}
          onVerify={handleAuthVerification}
          error={error}
          email={tempEmail}
          setError={setError}
          setOtp={setOtp} // Pass the OTP state and setter
        />
      )}
      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onChange={handleAddressModalToggle}
        countries={countries}
        address={AddressInfo?.data}
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
          E-mail
        </Heading>
        <Text as="p" className="text-[1.13rem] font-normal text-[#6c7482] mb-4">
          You must enter a password to change your e-mail address
        </Text>
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
            type="email"
            name="email"
            placeholder={`example@gmail.com`}
            value={tempEmail}
            onChange={(e) => setTempmail(e.target.value)}
            className="self-stretch rounded-[12px] !border px-[1.63rem] lowercase sm:px-[1.25rem]"
          />
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
              name="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[12px] border px-[1.63rem] py-2 pr-10 sm:px-[1.25rem]"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showNewPassword ? (
                <Eye className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {error && <div className="text-red-400">{error}</div>}
        </div>
        <Button
          color="green_200_green_400_01"
          shape="round"
          className="min-w-[10.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          onClick={handleChangeEmail}
        >
          Change Email
        </Button>
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
                name="oldPassword"
                value={oldPassword}
                placeholder="Enter Your Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full rounded-[12px] border px-[1.63rem] py-2 pr-10 sm:px-[1.25rem]"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showOldPassword ? (
                  <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
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
                name="newPassword"
                value={newPassword}
                placeholder="Enter Your New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-[12px] border px-[1.63rem] py-2 pr-10 sm:px-[1.25rem]"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showNewPassword ? (
                  <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-md pt-1">{error}</p>}
          </div>
        </div>
        <Button
          color="green_200_green_400_01"
          shape="round"
          className="min-w-[12.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          onClick={handleChangePassword}
        >
          Change Password
        </Button>
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
            {AddressInfo?.data?.address}
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
            {AddressInfo?.data?.address2}
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
                    (country) => country.value === AddressInfo?.data?.country_id
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
                {AddressInfo?.data?.city}
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
          {AddressInfo?.data?.contact_number}
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
