import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { OctagonAlert } from "lucide-react";
import { Button } from "@/components/Button/index";
import { useUserService } from "@/services/userService";
import { toast } from "react-toastify";
export default function RefundModal({
  isOpen,
  onOpenChange,
  transactionDetails,
}) {
  const { refundRequest } = useUserService();
  function handleRefund() {
    console.log("action", transactionDetails.action);
    refundRequest(transactionDetails.action, {
      is_refund_requested: true,
    })
      .then((res) => {
        console.log("res", res);
        toast.success("Refund request submitted successfully");
        onOpenChange(false);
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.message);
        onOpenChange(false);
      });
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
              Refund Request!
            </b>
            <p className="mt-4 gap-2 flex flex-col bg-yellow-50 p-3 rounded-lg text-yellow-950">
              <i className="leading-none m-0 font-semibold">Note:</i> Refund
              requests must be made within 10 days of purchase and may take 5-10
              business days for processing.
            </p>
            <p className="mt-6 ">
              Please see our{" "}
              <b
                onClick={() => window.open("/terms-of-service", "_blank")}
                className="cursor-pointer font-semibold "
              >
                terms and service
              </b>{" "}
              for more details. If you have any issues or need assistance,
              contact our support team at{" "}
              <em
                onClick={() =>
                  window.open("mailto:support@example.com", "_blank")
                }
                className="underline text-blue-500 cursor-pointer"
              >
                support@seenyor.com
              </em>
              .
            </p>
            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleRefund}
                shape="round"
                color="green_200_green_400_01"
                className="w-full"
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
