import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { OctagonAlert } from "lucide-react";
import { Button } from "@/components/Button/index";
import { useUserService } from "@/services/userService";
import { toast } from "react-toastify";
import { Heading, Input, Text } from "../../components";
import { Eye, EyeOff } from "lucide-react";

export default function UnsubscribeModal({
  isOpen,
  onOpenChange,
  subscriptionDetails,
}) {
  const { login, cancelSubscription } = useUserService();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleUnsubscribe() {
    console.log("action", subscriptionDetails);
    const email = localStorage.getItem("user_email");
    try {
      const isPasswordMatch = await login({ email: email, password: password });
      setError("");
      cancelSubs();
    } catch (error) {
      setError(error?.message);
    }
  }
  async function cancelSubs() {
    try {
      await cancelSubscription(subscriptionDetails);
      toast.warning("Subscription cancelled successfully!");
      onOpenChange(false);
      window.location.reload();
    } catch (err) {
      toast.error(err?.message);
    }
  }
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="DialogOverlay "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        />
        <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
          <Dialog.Title className="DialogTitle"></Dialog.Title>
          <Dialog.Description className="DialogDescription p-2">
            <b className="text-xl md:text-lg font-semibold opacity-85 flex items-center gap-2">
              <OctagonAlert style={{ color: "#FFB02E" }} />
              Are you sure you want to unsubscribe?
            </b>
            <p className="mt-4 gap-2 flex flex-col bg-yellow-50 p-3 rounded-lg text-yellow-950">
              <i className="leading-none m-0 font-semibold">Note:</i> Refund By
              unsubscribing, you will lose access to the app and all monitoring
              features associated with your plan. You can restore access at any
              time by renewing your subscription.
            </p>
            <p className="mt-6 ">
              If you’re experiencing any issues or need assistance, please reach
              out to our team before proceeding. We’re here to help! Contact Us
              <em
                onClick={() =>
                  window.open("mailto:support@example.com", "_blank")
                }
                className="underline text-blue-500 cursor-pointer pl-2"
              >
                support@seenyor.com
              </em>
              .
            </p>

            <div className="relative w-full mt-4">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Confirm Your Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[12px] border px-[1.63rem] py-2 pr-10 sm:px-[1.25rem]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {error && <div className="text-red-400">{error}</div>}
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleUnsubscribe}
                shape="round"
                color="green_200_green_400_01"
                className="w-full"
                disabled={!password}
              >
                Submit Request
              </Button>
              <Dialog.Close asChild>
                <Button
                  shape="round"
                  variant="outline"
                  color="gray_10101"
                  className="w-full"
                >
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="IconButton cursor-pointer" aria-label="Close">
              <Cross2Icon className="w-6 h-6 mt-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
