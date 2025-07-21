import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CheckCircle } from "lucide-react"; // Import CheckCircle icon
import { Button } from "@/components/Button/index";
import { useUserService } from "@/services/userService";
import { toast } from "react-toastify";

export default function RenewModal({ isOpen, onOpenChange, renewDetails }) {
  const { renewSubscription } = useUserService(); // Assuming renewSubscription is available

  // Function to handle renewal
  async function handleRenew() {
    try {
      await renewSubscription(renewDetails); // Call the renewal function
      toast.success("Subscription renewed successfully!");
      onOpenChange(false);
      window.location.reload(); // Refresh page to reflect the updated subscription status
    } catch (error) {
      console.error(error);
      toast.error("Failed to renew subscription.");
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="DialogOverlay"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        />
        <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
          <Dialog.Title className="DialogTitle"></Dialog.Title>
          <Dialog.Description className="DialogDescription p-2">
            {/* Updated Title */}
            <b className="text-xl md:text-lg font-semibold opacity-85 flex items-center gap-2">
              <CheckCircle style={{ color: "#4CAF50" }} />
              Confirm Subscription Renewal
            </b>

            {/* Updated Description with Card Last Digits */}
            <p className="mt-4 gap-2 flex flex-col bg-green-50 p-3 rounded-lg text-green-950">
              Your subscription will be renewed, and your last used card will be
              charged.
              {/* Your subscription will be renewed, and your card ending with{" "}
              <strong>{renewDetails?.cardLastFour || "N/A"}</strong> will be
              charged. */}
            </p>
            <p className="mt-2">
              If you have any questions or need assistance, feel free to contact
              our support team at{" "}
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

            {/* Updated Buttons */}
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleRenew}
                shape="round"
                color="green_200_green_400_01"
                className="w-full"
              >
                Confirm Renewal
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
