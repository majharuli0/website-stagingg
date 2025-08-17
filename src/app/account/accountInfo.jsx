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
  const [loading, setLoading] = useState(false);

  const { updateUserName } = useUserService();

  const [displayName, setDisplayName] = useState("");
  const [displayLastName, setDisplayLastName] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const handleUpdateName = async () => {
    setError("");
    setError2("");
    if (!displayName.trim() && !displayLastName.trim()) {
      setError("Please enter at least one field.");
      return;
    }
    if (displayName && displayName.trim().length < 2) {
      setError("First Name must be at least 2 characters.");
      return;
    }
    if (displayLastName && displayLastName.trim().length < 2) {
      setError2("Last Name must be at least 2 characters.");
      return;
    }
    setLoading(true);
    try {
      const response = await updateUserName({
        name: displayName || userName,
        last_name: displayLastName || lastUserName,
      });
      toast.success("User name updated successfully!");
      setUserName(displayName || userName);
      setLastUserName(displayLastName || lastUserName);
      setDisplayName("");
      setDisplayLastName("");
    } catch (error) {
      console.error("Failed to update user name:", error);
      toast.error("Failed to update user name");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !displayName.trim() && !displayLastName.trim();

  return (
    <div>
      <div className="flex flex-col items-start border-b border-solid border-border pb-4 md:items-center md:text-center">
        <Heading
          size="text4xl"
          as="h3"
          className="text-[1.75rem] font-medium text-[#1d293f]"
        >
          Edit Profile
        </Heading>
        <Text as="p" className="mb-[0.05rem] text-[1.13rem] text-[#6c7482]">
          Personalize your profile, Easily update your name and profile picture.
        </Text>
      </div>

      <div className="flex flex-col gap-4 mb-10 pt-6">
        <div className="flex flex-col gap-1">
          <Heading size="headings" as="h6" className="text-lg font-semibold">
            First Name
          </Heading>
          <Input
            shape="round"
            placeholder={userName}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="rounded-[12px] !border px-[1.63rem]"
          />
          {error && (
            <Text as="p" className="text-red-500 text-sm mt-1">
              {error}
            </Text>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Heading size="headings" as="h6" className="text-lg font-semibold">
            Last Name
          </Heading>

          <Input
            shape="round"
            placeholder={lastUserName}
            value={displayLastName}
            onChange={(e) => setDisplayLastName(e.target.value)}
            className="rounded-[12px] !border px-[1.63rem]"
          />
          {error2 && (
            <Text as="p" className="text-red-500 text-sm mt-1">
              {error2}
            </Text>
          )}
        </div>
      </div>

      <Button
        loading={loading}
        disabled={isButtonDisabled}
        color="green_200_green_400_01"
        shape="round"
        className={`md:w-full w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold ${
          isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleUpdateName}
      >
        Save Changes
      </Button>
    </div>
  );
}
