"use client";
import { Button, Heading, Input, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import * as Avatar from "@radix-ui/react-avatar";
import { useState } from "react";
import { toast } from "react-toastify";
export default function AccountInfo() {
  const { setUserName, userName, lastUserName, setLastUserName } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };
  const { updateUserName, getUserDetailsById } = useUserService(); // Get the updateUserName and
  const [displayName, setDisplayName] = useState("");
  const [displayLastName, setDisplayLastName] = useState("");
  const handleUpdateName = async () => {
    try {
      const response = await updateUserName({
        name: displayName || userName,
        last_name: displayLastName || lastUserName,
      });
      console.log(response);
      toast.success("User name updated successfully!");
      setUserName(displayName);
      setLastUserName(displayLastName);
      setDisplayName("");
      setDisplayLastName("");
      console.log("User name updated successfully:", response);
    } catch (error) {
      toast.error("Failed to update user name");
      console.error("Failed to update user name:", error);
    }
  };
  return (
    <div className="">
      <div className="flex flex-col items-start border-b border-solid border-border pb-4 md:items-center md:text-center">
        <Heading
          size="text4xl"
          as="h3"
          className="text-[1.75rem] font-medium text-[#1d293f] md:text-[1.63rem] sm:text-[1.50rem] md:text-center"
        >
          Edit Profile
        </Heading>
        <Text
          as="p"
          className="mb-[0.05rem] text-[1.13rem] font-normal text-[#6c7482]"
        >
          Personalize your profile, Easily update your name and profile picture.
        </Text>
      </div>
      {/* Profile Image Section */}
      <div className="flex flex-col gap-4 md:text-center mb-10 pt-6">
        {/* <div className="flex flex-col gap-2 md:items-center">
          <Heading
            size="headings"
            as="h6"
            className="text-lg font-semibold capitalize text-[#1d293f]"
          >
            Change Your Profile Image
          </Heading>

          <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-200 align-middle">
            <Avatar.Image
              className="size-full rounded-[inherit] object-cover"
              src="images/avater.png"
              alt="avatar"
            />
            <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-blue-200 text-[15px] font-medium text-violet11">
              A
            </Avatar.Fallback>
          </Avatar.Root>
        </div> */}

        {/* Display Name Input */}
        <div className="flex flex-col gap-1">
          <Heading
            size="headings"
            as="h6"
            className="text-lg font-semibold capitalize text-[#1d293f] text-start"
          >
            Display Name
          </Heading>
          <Input
            shape="round"
            name="Label"
            placeholder={userName}
            value={displayName} // Bind the input value to state
            onChange={(e) => setDisplayName(e.target.value)} // Update state on input change
            className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
          />
          <Input
            shape="round"
            name="Label"
            placeholder={lastUserName}
            value={displayLastName} // Bind the input value to state
            onChange={(e) => setDisplayLastName(e.target.value)} // Update state on input change
            className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <Button
        color="green_200_green_400_01"
        shape="round"
        className="md:w-full  w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
        onClick={handleUpdateName}
      >
        Save Changes
      </Button>
    </div>
  );
}
