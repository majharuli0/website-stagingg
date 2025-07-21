import { Heading } from "@/components"; // Adjust the import path based on your project structure
import { Button, Img } from "@/components";
import { useUserService } from "@/services/userService";
import { toast } from "react-toastify";
// PaymentMethodCard Component
export default function PaymentMethodCard({
  id,
  card,
  billing_details,
  defaultMethodText = "Set As Default",
  isDefault = false,
  customerId,
  onDelete,
  ...props
}) {
  const { DeletePaymentMethod, SetDefaultPaymentMethod } = useUserService();
  const cardDescription = `${card?.brand} Ending in ${card?.last4}`;
  const cardExpiry = `Expiry ${card?.exp_month < 10 ? "0" : ""}${
    card?.exp_month
  }/${card?.exp_year}`;

  function paymentMethodDelete() {
    // Call the onDelete function with the paymentMethodId
    // onDelete(id);
    try {
      const deleteMethod = DeletePaymentMethod({ paymentMethodId: id });
      toast.error(" Payment Method Deleted Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  async function paymentMethodSetDefault() {
    try {
      const setDefault = await SetDefaultPaymentMethod({
        paymentMethodId: id,
        customerId,
      });
      toast.success("Default Payment Method Set Successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-start gap-[0.75rem] p-[1.00rem] border-2 border-solid  flex-1 rounded-lg`}
      style={{ borderColor: isDefault ? "#70B896" : "" }}
    >
      {/* Card brand icon */}
      <div className="flex rounded-md border border-solid border-gray-100_01 bg-[#ffffff] px-[0.38rem] py-[0.63rem]">
        <Img
          src={`${card.brand}.svg`}
          alt={`${card.brand} icon`}
          width={20}
          height={20}
          className="h-[1.5rem] w-[1.5rem]"
        />
      </div>

      {/* Card information container */}
      <div className="flex flex-1 flex-col gap-[0.50rem] self-center">
        <div className="flex flex-col items-start">
          <Heading
            size="textmd"
            as="p"
            className="font-inter text-[0.88rem] font-medium text-[#2f4d3f] capitalize"
          >
            {cardDescription}
          </Heading>
          <Heading
            size="textmd"
            as="p"
            className="font-inter text-[0.88rem] font-normal text-primary"
          >
            {cardExpiry}
          </Heading>
        </div>

        <div>
          <div className="flex">
            <Heading
              size="textmd"
              as="p"
              className="font-inter text-[0.88rem] font-medium text-primary"
              onClick={() => {
                if (!isDefault) {
                  paymentMethodSetDefault();
                }
              }}
            >
              {isDefault ? "Default Method" : defaultMethodText}
            </Heading>
            {isDefault ? null : (
              <Heading
                size="textmd"
                as="p"
                className="font-inter text-[0.88rem] pl-3 font-medium !text-red-600 cursor-pointer capitalize"
                onClick={() => paymentMethodDelete()} // Call the delete handler
              >
                delete
              </Heading>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
