"use client";
import { Heading, Img, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

function Page() {
  const router = useRouter();
  const {
    getSessionDetails,
    createOrder,
    handlePaymentStatus,
    handlePaymentSubscription,
    chnageDeviceStatus,
  } = useUserService();
  const [isProcessing, setIsProcessing] = useState(true);
  const { isLogin, country } = useAuth();
  const expectedCurrency = country === "global" ? "usd" : "aud";
  const [error, setError] = useState("");
  let sessionId;
  if (typeof window !== "undefined") {
    sessionId = new URLSearchParams(window.location.search).get("session_id");
  }

  useEffect(() => {
    const processPayment = async () => {
      if (typeof window === "undefined") return;

      const devices = JSON.parse(localStorage.getItem("devices") || "[]");
      const user_credentials = JSON.parse(
        localStorage.getItem("user_credentials") || "{}"
      );
      const verified = JSON.parse(
        localStorage.getItem("isUserVerified") || "false"
      );

      if (!verified) {
        router.push("/");
        return;
      }

      try {
        if (devices && devices.length > 0) {
          await chnageDeviceStatus({
            uids: devices,
            email: user_credentials.email,
            is_active: true,
          });
        }

        // handlePaymentStatus(sessionId)

        // const session = await getSessionDetails(sessionId);
        // const customerId = session?.customer;

        // const subscriptionProducts = JSON.parse(
        //   localStorage.getItem("subscriptionProducts") || "[]"
        // );

        // if (subscriptionProducts.length > 0) {
        //   await handlePaymentSubscription(
        //     customerId,
        //     subscriptionProducts[0].priceId,
        //     user_credentials.email,
        //     user_credentials.password
        //   );
        // }

        // Optional: clean up localStorage
        [
          "devices",
          "subscriptionProducts",
          "orderDetails",
          "installation_details",
          "user_credentials",
          "agent_details",
          "isUserVerified",
          "subscription_id",
        ].forEach((item) => localStorage.removeItem(item));
      } catch (err) {
        console.error("Error in payment process:", err);
        setError("Something went wrong! Please Contact with Support");
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [sessionId]);

  // const handleOrder = async (orderData) => {
  //   const agent_details = localStorage.getItem("agent_details");
  //   const installation_details = localStorage.getItem("installation_details");
  //   const user_credentials = localStorage.getItem("user_credentials");
  //   const addressPharsed = JSON.parse(installation_details);
  //   const address = localStorage.getItem("user_add");
  //   const existingUserAddressPharsed = JSON.parse(address);

  //   const order = {
  //     total: orderData.amount_total / 100,
  //     grand_total: orderData.amount_total / 100,
  //     is_paid: orderData.payment_status === "paid",
  //     payment_status: "pending",
  //     payment_method: orderData.payment_method_types[0],
  //     transaction_id: orderData.payment_intent,
  //     customer: orderData.customer,
  //     agent_unique_id: JSON.parse(agent_details).agent_id,
  //     installation_date: addressPharsed?.installation_date || "",
  //     email: JSON.parse(user_credentials).email,
  //     currency: expectedCurrency === "aud" ? "AU$" : "$",
  //     password: JSON.parse(user_credentials).password,
  //     products: orderData.line_items.map((item) => ({
  //       id: item.productId,
  //       name: item.productName,
  //       type:
  //         item.productName === "Required with your system"
  //           ? "Seenyor Kit"
  //           : item.productName === "Installation"
  //           ? "Installation"
  //           : item.productName === "AI Monitoring"
  //           ? "AI Monitoring"
  //           : item.productName === "All in One AI Sensor"
  //           ? `AI Sensor ${item.quantity}x`
  //           : "package",
  //       price: item.price,
  //       quantity: item.quantity,
  //       priceId: item.productId,
  //     })),
  //     total_details: {
  //       amount_discount: orderData.total_details.amount_discount,
  //       amount_shipping: orderData.total_details.amount_shipping,
  //       amount_tax: orderData.total_details.amount_tax,
  //     },
  //     address: {
  //       city: addressPharsed?.city || existingUserAddressPharsed.city || "",
  //       country: orderData?.customer_details?.address?.country || "",
  //       line1:
  //         addressPharsed?.address || existingUserAddressPharsed?.address || "",
  //       line2:
  //         addressPharsed?.address2 ||
  //         existingUserAddressPharsed?.address2 ||
  //         "",
  //       postal_code:
  //         addressPharsed?.postal_code ||
  //         existingUserAddressPharsed.post_Code ||
  //         "",
  //       state: addressPharsed?.state || existingUserAddressPharsed.state || "",
  //     },
  //   };
  //   try {
  //     const response = await createOrder(order);
  //     console.log("Order created successfully:", response);
  //     // Clear the orderDetails from localStorage
  //     localStorage.removeItem("orderDetails");
  //     // Optionally, redirect to an order confirmation page
  //     // router.push("/");
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   }
  // };
  // const hasRunRef = useRef(false); // Use useRef to persist the flag across renders
  // useEffect(() => {
  //   const devices = JSON.parse(localStorage.getItem("devices"));
  //   const user_credentials = localStorage.getItem("user_credentials");

  //   const verified = JSON.parse(localStorage.getItem("isUserVerified"));
  //   if (typeof window !== "undefined") {
  //     if (!verified) {
  //       router.push("/");
  //     }
  //   }
  //   console.log("================>");

  //   if (sessionId && !hasRunRef.current) {
  //     hasRunRef.current = true;
  //     let customerId;
  //     if (devices && verified) {
  //       const chnageStatus = chnageDeviceStatus({
  //         uids: devices.map((deviceId) => deviceId),
  //         email: JSON.parse(user_credentials).email,
  //         is_active: true,
  //       });
  //     }
  //     getSessionDetails(sessionId)
  //       .then((session) => {
  //         customerId = session.customer;
  //         return handleOrder(session);
  //       })
  //       .then(() => handlePaymentStatus(sessionId))
  //       .then((response) => {
  //         if (response.success) {
  //           const subscriptionProducts = JSON.parse(
  //             localStorage.getItem("subscriptionProducts")
  //           );
  //           const user_credentials = localStorage.getItem("user_credentials");
  //           if (subscriptionProducts && subscriptionProducts.length > 0) {
  //             return handlePaymentSubscription(
  //               customerId,
  //               subscriptionProducts[0].priceId,
  //               JSON.parse(user_credentials).email,
  //               JSON.parse(user_credentials).password
  //             );
  //           }
  //         } else {
  //           console.log("Payment Status False");
  //         }
  //       })
  //       .then((response) => {
  //         if (response) console.log(response);

  //         setIsProcessing(false);
  //         // Clear localStorage
  //         [
  //           "devices",
  //           "subscriptionProducts",
  //           "orderDetails",
  //           "installation_details",
  //           "user_credentials",
  //           "agent_details",
  //           "isUserVerified",
  //         ].forEach((item) => localStorage.removeItem(item));
  //       })
  //       .catch((error) => {
  //         setError("Something went wrong! Please Contact with Support");
  //         setIsProcessing(false);
  //         console.error("Error in payment process:", error);
  //       });
  //   }
  // }, [sessionId]);

  // useEffect(() => {
  //   if (sessionId) {
  //     getSessionDetails(sessionId)
  //       .then((session) => {
  //         // Retrieve products from local storage
  //         const storedProducts = localStorage.getItem("orderDetails");
  //         const products = storedProducts ? JSON.parse(storedProducts) : []; // Parse the products or default to an empty array
  //         console.log(session);
  //         console.log("logged");

  //         // Create the order with the session details and products from local storage
  //         const orderData = {
  //           total: session.amount_total,
  //           grand_total: session.amount_total, // Adjust if you have discounts or shipping
  //           is_paid: session.payment_status === "paid",
  //           payment_status: session.payment_status,
  //           payment_method: "Credit Card", // Assuming credit card for now
  //           transaction_id: session.payment_intent, // Use the payment intent ID
  //           agent_unique_id: "000001", // Replace with actual agent ID if available
  //           products: products.map((item) => ({
  //             id: item.id, // Assuming the product object has an id
  //             name: item.name, // Assuming the product object has a name
  //             price: item.price, // Assuming the product object has a price
  //             quantity: item.quantity, // Assuming the product object has a quantity
  //             priceId: item.priceId, // Assuming the product object has a priceId
  //           })),
  //           total_details: {
  //             amount_discount: session.total_details.amount_discount,
  //             amount_shipping: session.total_details.amount_shipping,
  //             amount_tax: session.total_details.amount_tax,
  //           },
  //           address: {
  //             city: session.customer_details.address?.city || "",
  //             country: session.customer_details.address?.country || "",
  //             line1: session.customer_details.address?.line1 || "",
  //             line2: session.customer_details.address?.line2 || "",
  //             postal_code: session.customer_details.address?.postal_code || "",
  //             state: session.customer_details.address?.state || "",
  //           },
  //         };

  //         // Prevent multiple requests
  //         if (isProcessing) return; // Skip if already processing

  //         setIsProcessing(true); // Set processing to true

  //         handleOrder(orderData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching session details:", error);
  //       });
  //   }
  // }, [sessionId, isProcessing]);

  return (
    <div className="flex w-full flex-col gap-[1.63rem] bg-gradient-to-b from-white to-blue-50 ">
      <div className="flex flex-col items-center justify-center gap-[1.50rem] border-b border-solid border-border py-[18.50rem] h-[100vh]">
        <div className="flex flex-col items-center self-stretch">
          <div className="container-xs flex flex-col items-center gap-[0.75rem] px-[3.50rem] md:px-[1.25rem]">
            <div className="flex items-center justify-center">
              <div
                className={`relative w-[44px] h-[44px] flex items-center justify-center rounded-full transition-all duration-500 ease-in-out ${
                  isProcessing
                    ? "animate-spin border-t-transparent border-[#09032c2c]"
                    : error
                    ? "bg-gradient-to-t from-[#FF0000] to-[#FF4C4C]" // Red gradient for error
                    : "bg-gradient-to-t from-[#308700] to-[#49ce00]"
                }`}
              >
                <div
                  className={`${
                    isProcessing
                      ? "border-t-transparent border-[#09032c2c]"
                      : "border-transparent"
                  } absolute bg-[#FBFDFF] inset-0 rounded-full border-[3px] w-[38px] h-[38px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`}
                ></div>

                {!isProcessing && (
                  <svg
                    className={`w-[24px] h-[24px] ${
                      error ? "text-[#FF0000]" : "text-[#3FB400]"
                    } animate-checkmark`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {error ? (
                      <path d="M6 6l12 12M6 18L18 6" /> // Cross icon for error
                    ) : (
                      <path d="M5 13l4 4L19 7" /> // Checkmark icon for success
                    )}
                  </svg>
                )}
              </div>
            </div>
            {isProcessing && (
              <p className="text-[1.13rem] font-normal leading-[1.69rem] text-body">
                Your Order is Processing...
              </p>
            )}
            {/* <Img
              src="img_checkmark.svg"
              width={44}
              height={44}
              alt="Frame 1261153926"
              className="h-[2.75rem] w-[2.75rem] rounded-[50%]"
            /> */}
            {error && (
              <p className="text-[1.13rem] font-normal leading-[1.69rem] text-body">
                {error}
              </p>
            )}
            {!error && (
              <>
                <Heading
                  size="heading4xl"
                  as="h1"
                  className={` relative text-[1.75rem] font-semibold text-text md:text-[1.63rem] sm:text-[1.50rem] ${
                    !isProcessing
                      ? "opacity-100 bottom-0"
                      : "opacity-0 !h-0 bottom-[-10%]"
                  } transition-all duration-500 ease-in-out`}
                >
                  Order Successful!
                </Heading>
                <Text
                  as="p"
                  className={`w-[50%] text-center text-[1.13rem] font-normal leading-[1.69rem] text-body md:w-full ${
                    !isProcessing
                      ? "opacity-100 bottom-0"
                      : "opacity-0 !h-0 bottom-[-15%]"
                  } transition-all duration-500 ease-in-out`}
                >
                  Your order was successful! You can now sign in to access your
                  account. Welcome, and enjoy our services!
                </Text>
              </>
            )}
          </div>
        </div>
        {!error && (
          <div
            className={`container-xs flex flex-col items-center px-[3.50rem] md:px-[1.25rem] ${
              !isProcessing
                ? "opacity-100 bottom-0"
                : "opacity-0 !h-0 bottom-[-15%]"
            } transition-all duration-500 ease-in-out`}
          >
            <div className="flex items-center gap-[0.63rem]">
              <Text
                as="p"
                className="text-[1.13rem] font-medium text-text cursor-pointer"
              >
                {isLogin ? (
                  <Link href="/">Go Back</Link>
                ) : (
                  <Link href="/login">Sign In</Link>
                )}
              </Text>

              <Img
                src="img_arrowleft_text.svg"
                width={24}
                height={24}
                alt="Arrow Left"
                className="h-[1.50rem] w-[1.50rem]"
              />
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .border-gradient {
          border-image: linear-gradient(to top, ##49ce00, #308700) 1;
          border-radius: 50%;
        }
        @keyframes checkmarkAnimation {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-checkmark {
          animation: checkmarkAnimation 0.4s ease-in-out forwards;
        }
        .opacity-0 {
          opacity: 0;
        }

        .transition-opacity {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Page;
