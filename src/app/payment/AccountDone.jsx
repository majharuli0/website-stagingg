"use client";
import { useUserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Img, Text } from "../../components";
import { useAuth } from "@/context/AuthContext";
export default function AccountDone() {
  const {
    createStripeCustomer,
    createStripeSession,
    getStripeCustomerId,
    removeStripeCustomerId,
  } = useUserService();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { country } = useAuth();
  const expectedCurrency = country === "global" ? "usd" : "aud";


  // const isUserVerified =
  //   JSON.parse(localStorage.getItem("isUserVerified")) || false;
  // if (!orderDetails || !isUserVerified) {
  //   router.push("/");
  //   return;
  // }
  const processPayment = async () => {
    const stripeCustomerId = await getStripeCustomerId();
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  if (!stripeCustomerId) {
    router.push("/sign-up");
    return;
  }
  setIsProcessing(true);
  try {
      const user_credentials = JSON.parse(localStorage.getItem("user_credentials"));
      // const lineItems = [
      //   {
      //     price: orderDetails.products[3].priceId, // kit
      //     quantity: 1,
      //     adjustable_quantity: { enabled: false },
      //   },
      // ];

      // if (orderDetails.addonQuantity > 0) {
      //   lineItems.push({
      //     price: orderDetails.products[2].priceId, // Addon device
      //     quantity: orderDetails.addonQuantity,
      //     adjustable_quantity: { enabled: true, minimum: 0, maximum: 10 },
      //   });
      // }
      // if (orderDetails.installationPrice > 0) {
      //   lineItems.push({
      //     price: orderDetails.products[1].priceId, // Installation
      //     quantity: 1,
      //     adjustable_quantity: { enabled: false },
      //   });
      // }
      // if (orderDetails.aiMonitoringPrice) {
      //   lineItems.push({
      //     price: orderDetails.products[0].priceId, // Installation
      //     quantity: 1,
      //     adjustable_quantity: { enabled: false },
      //   });
      // }
      let returnURL = window.location.origin;
      let successUrl = window.location.origin + "/success";
      let cancelUrl = window.location.origin + "/cancel";
      const lineItems = orderDetails.products
        .map((product) => ({
          // price_data: {
          //   currency: expectedCurrency,
          //   product_data: {
          //     name: product.name,
          //     description: product.description || " ",
          //     metadata: {
          //       category: product.isRecurring ? "subscription" : "one-time",
          //     },
          //   },
          //   unit_amount: product.price * 100, // Assuming price is in dollars, convert to cents
          // },
          price: product.priceId,
          quantity: product.quantity,
          adjustable_quantity: product.adjustable_quantity
            ? {
                enabled: true,
                minimum: 0,
                maximum: 1000,
              }
            : undefined,
        }))
        .filter((item) => item.quantity > 0);
      console.log(lineItems, orderDetails);

      const session = await createStripeSession({
        customer: stripeCustomerId,
        line_items: lineItems,
        return_url: returnURL,
        sessionMode: "payment",
        email: user_credentials?.email 
        // success_url: successUrl,
        // cancel_url: cancelUrl,
      });

      // Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle error (e.g., show error message to user)
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center border-b border-solid border-border py-[3.75rem] md:py-[1.25rem]">
      <div className="container-xs flex flex-col items-center gap-[1rem] px-[3.50rem] md:px-[1.25rem]">
        <Button
          className="checkmark_border w-[3.25rem] h-[3.25rem] rounded-full"
          size="lg"
          shape="circle"
          variant={null}
        >
          <Img
            src="img_checkmark.svg"
            width={20}
            height={14}
            className="text-white"
          />
        </Button>
        <Heading
          size="heading4xl"
          as="h1"
          className="font-bold text-text  text-center"
        >
          Account Created Successful!
        </Heading>
        <Text
          as="p"
          className="w-[54%] text-center text-[1.13rem] font-normal leading-[1.69rem] text-body md:w-full flex justify-center items-center"
        >
          Your account created successfully. Please make payment to complete
          your purchase. If payment failed your account will be suspended.
        </Text>
        <Button
          color="body"
          size="sm"
          variant="outline"
          rightIcon={
            <Img
              src="img_arrowleft_text.svg"
              width={24}
              height={24}
              alt="Arrow Left"
              className="h-[1.50rem] w-[1.50rem]"
            />
          }
          className="min-w-[12.75rem] gap-[0.63rem] rounded-[10px] !border-2 font-medium"
          onClick={processPayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Continue to Secure Checkout"}
        </Button>
      </div>
    </div>
  );
}
