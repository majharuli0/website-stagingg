"use client";
// import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import {
  MinusCircledIcon,
  PlusCircledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Img } from "@/components";
import RadioButtonGroup from "./RadioGroupFInstallation";
import TermsCheckbox from "./TermsCheckbox ";
import "./style.css";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const { isLogin } = useAuth();

  const [products, setProducts] = useState([]);
  let [kitPrice, setKitPrice] = useState(0);
  let [installationPriceStatic, setInstallationPriceStatic] = useState(0);
  let [installationPrice, setInstallationPrice] = useState(0);
  let [addonDevicePrice, setAddonDevicePrice] = useState(0);
  let [aimonitoring, setAimonitoring] = useState(0);
  let [total, setTotal] = useState(0);
  let [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let [selecteInstallation, setselecteInstallation] = useState(0);
  let [installationQuantity, setInstallationQuantity] = useState(3);
  const [isChecked, setIsChecked] = useState(false);
  const {
    getProducts,
    getStripeCustomerId,
    createStripeSession,
    createStripeCustomer,
    getUserDetailsById,
  } = useUserService();
  const { country } = useAuth();
  const expectedCurrency = country === "global" ? "usd" : "aud";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        // Set prices based on fetched products
        const kit = fetchedProducts.find(
          (p) =>
            p.name === "Required with your system" &&
            !isLogin &&
            p.currency === expectedCurrency
        );
        const addon = fetchedProducts.find(
          (p) =>
            p.name === "All in One AI Sensor" && p.currency === expectedCurrency
        );
        const installation = fetchedProducts.find(
          (p) => p.name === "Installation" && p.currency === expectedCurrency
        );
        const aimonitoring = fetchedProducts.find(
          (p) =>
            p.name === "AI Monitoring" &&
            !p.isRecurring &&
            !isLogin &&
            p.currency === expectedCurrency
        );
        // if (kit) setKitPrice(kit.price);
        if (addon) setAddonDevicePrice(addon.price);
        // if (installation) setInstallationPrice(installation.price * 3);
        // if (installation) setInstallationPriceStatic(installation.price);
        if (aimonitoring) setAimonitoring(aimonitoring.price);

        //Store Subcription Product Details in Local Storage that has isRecurring true
        const subscriptionProducts = fetchedProducts.filter(
          (p) => p.isRecurring && p.currency === expectedCurrency
        );
        localStorage.setItem(
          "subscriptionProducts",
          JSON.stringify(subscriptionProducts)
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    localStorage.removeItem("devices");
  }, []);
  // Total Price calculation
  useEffect(() => {
    const calculatedTotal =
      (!isLogin ? kitPrice : 0) +
      (selecteInstallation === 1 ? installationPrice : 0) +
      addonDevicePrice * quantity;
    setTotal(calculatedTotal);
  }, [
    kitPrice,
    installationPrice,
    selecteInstallation,
    addonDevicePrice,
    quantity,
  ]);

  const updateOrderDetails = () => {
    const orderDetails = {
      kitPrice,
      installationPrice: selecteInstallation === 1 ? installationPrice : 0,
      addonDevicePrice,
      addonQuantity: quantity,
      aiMonitoringPrice: aimonitoring,
      total: total + aimonitoring,
      products: products
        .filter(
          (p) =>
            p.name !== "Required with your system" &&
            p.name !== "Installation" &&
            !p.isRecurring &&
            !(isLogin && p.name === "AI Monitoring") &&
            p.currency === expectedCurrency
        )
        .map((p) => ({
          id: p.id,
          priceId: p.priceId,
          name: p.name,
          description: p.description,
          price: p.price,
          quantity:
            p.name === "AI Monitoring"
              ? 1
              : p.name === "All in One AI Sensor"
              ? quantity
              : p.name === "Required with your system"
              ? 1
              : p.name === "Installation" && selecteInstallation === 1
              ? installationQuantity
              : 0,
          adjustable_quantity:
            p.name === "AI Monitoring"
              ? false
              : p.name === "All in One AI Sensor"
              ? true
              : p.name === "Installation" && selecteInstallation === 1
              ? false
              : p.name === "Required with your system"
              ? false
              : false,
        })),
    };
    //    const orderDetails = {
    //   kitPrice,
    //   installationPrice: selecteInstallation === 1 ? installationPrice : 0,
    //   addonDevicePrice,
    //   addonQuantity: quantity,
    //   aiMonitoringPrice: aimonitoring,
    //   total: total + aimonitoring,
    //   products: products
    //     .filter(
    //       (p) =>
    //         !p.isRecurring &&
    //         !(
    //           isLogin &&
    //           p.name === "AI Monitoring" &&
    //           p.name === "Required with your system"
    //         ) &&
    //         p.currency === expectedCurrency
    //     )
    //     .map((p) => ({
    //       id: p.id,
    //       priceId: p.priceId,
    //       name: p.name,
    //       description: p.description,
    //       price: p.price,
    //       quantity:
    //         p.name === "AI Monitoring"
    //           ? 1
    //           : p.name === "All in One AI Sensor"
    //           ? quantity
    //           : p.name === "Required with your system"
    //           ? 1
    //           : p.name === "Installation" && selecteInstallation === 1
    //           ? installationQuantity
    //           : 0,
    //       adjustable_quantity:
    //         p.name === "AI Monitoring"
    //           ? false
    //           : p.name === "All in One AI Sensor"
    //           ? true
    //           : p.name === "Installation" && selecteInstallation === 1
    //           ? false
    //           : p.name === "Required with your system"
    //           ? false
    //           : false,
    //     })),
    // };
    console.log("orderDetisl======>", orderDetails);

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  };

  useEffect(() => {
    updateOrderDetails();
  }, [
    kitPrice,
    installationPrice,
    addonDevicePrice,
    quantity,
    selecteInstallation,
    total,
    products,
    aimonitoring,
  ]);

  const handleCheckout = async () => {
    let userDetails;
    if (isLogin) {
      let userData = jwtDecode(isLogin);
      await getUserDetailsById(userData._id).then((res) => {
        userDetails = res?.data;
      });
    }
    // Ensure order details are up to date in localStorage
    updateOrderDetails();

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (!orderDetails) {
      throw new Error("No order details found");
    }
    let successUrl = window.location.origin + "/success";
    let cancelUrl = window.location.origin + "/cancel";
    if (isLogin) {
      const lineItems = products
        .filter((p) => {
          // Exclude recurring products
          if (p.isRecurring) return false;

          // Exclude "AI Monitoring" and "Required with your system" if logged in
          if (
            isLogin &&
            (p.name === "AI Monitoring" ||
              p.name === "Required with your system")
          ) {
            return false;
          }
          if (p.currency !== expectedCurrency) return false;

          return true;
        })
        .map((p) => ({
          price_data: {
            currency: p.currency,
            product_data: {
              name: p.name,
              ...(p.description && { description: p.description }), // Include description only if it exists
              metadata: {
                category: p.category,
              },
            },
            unit_amount: p.price * 100,
          },
          quantity:
            p.name === "AI Monitoring"
              ? 1
              : p.name === "All in One AI Sensor"
              ? quantity
              : p.name === "Required with your system"
              ? 1
              : p.name === "Installation" && selecteInstallation === 1
              ? 1
              : 0,
          adjustable_quantity:
            p.name === "All in One AI Sensor"
              ? {
                  enabled: true,
                  minimum: 1,
                  maximum: 1000,
                }
              : {
                  enabled: false,
                },
        }))
        .filter((item) => item.quantity > 0);
      console.log("line items ======>", lineItems);

      // Start the first API call
      // const stripeCustomerPromise = createStripeCustomer({
      //   email: userDetails.email,
      //   name: userDetails.name,
      // });

      // // Once the first API call is resolved, use its result for the second call
      // stripeCustomerPromise
      //   .then((stripeCustomerResponse) => {
      //     const stripeCustomerId = stripeCustomerResponse.id;

      //     // Start the second API call
      //     return createStripeSession({
      //       customer: stripeCustomerId,
      //       line_items: lineItems,
      //       success_url: successUrl,
      //       cancel_url: cancelUrl,
      //     });
      //   })
      //   .then((session) => {
      //     // Handle the session result
      //     window.location.href = session.url;
      //   })
      //   .catch((error) => {
      //     // Handle any errors
      //     console.error("Error during checkout process:", error);
      //   });
    } else {
      router.push("/sign-up");
    }
  };
  const [terms, setTerms] = useState({
    com: {
      privacyPolicy: "https://seenyor.com/privacy-policy/",
      termsOfSales: "https://seenyor.com/terms-of-sale-2/",
      termsOfService: "https://seenyor.com/terms-of-service-2/",
    },
    au: {
      privacyPolicy: "https://seenyor.au/privacy-policy/",
      termsOfSales: "https://seenyor.au/terms-of-sale-2/",
      termsOfService: "https://seenyor.au/terms-of-service-2/",
    },
  });

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState(""); // State to track email input
  const [emailValid, setEmailValid] = useState(true); // State to track email validity
  const [isEmpty, setIsEmpty] = useState(false); // State to track if email is empty

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Check if email is empty
    if (value.trim() === "") {
      setIsEmpty(true);
      setEmailValid(false); // Mark as invalid if empty
    } else {
      setIsEmpty(false);
      // Validate email format
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setEmailValid(isValid);
    }
  };

  const handleContinue = () => {
    if (email.trim() === "") {
      setIsEmpty(true); // Show error if email is empty
      setEmailValid(false);
    } else if (!emailValid) {
      // Show error if email is invalid
      setIsEmpty(false);
    } else {
      // Proceed to the next step
      window.location.href = "/device-verification";
    }
  };

  return (
    <div className="flex w-full flex-col gap-10 bg-white p-5 tab:px-2">
      {!isLogin && (
        <>
          {/* <div className="tab:hidden max-w-[1720px] w-full mx-auto">
            <div className="flex justify-between tab:flex-col-reverse tab:gap-5 items-center  px-0">
              <div className="bg-[#F3F4F6] overflow-hidden relative h-[780px] md:h-auto w-[80%] tab:w-full  px-20 md:px-10 tab:px-5  md:mx-0 py-32 md:py-20 rounded-xl">
                <div className="flex tab:flex-col gap-4 items-center h-full md:h-auto justify-between ">
                  <div className="w-[60%] tab:w-full  ">
                    <h3 className="font-bold text-[48px] md:text-2xl tab:text-center">
                      Required with your system
                    </h3>
                    <p className="text-[29px] md:text-[16px] md:pt-4 tab:pt-2 tab:text-center">
                      All in One AI Sensor Pack for entire house.
                    </p>
                    <p className="text-xl my-7 tab:my-4 md:text-sm tab:text-center">
                      Fall Detection and Sleep Monitoring Solution
                    </p>
                    <p className="cursor-text tab:flex tab:justify-center">
                      <button className="w-auto cursor-text py-[10px] px-3 text-white bg-primary rounded-[10px]  font-semibold">
                        Set of 3x AI Devices
                      </button>
                    </p>
                  </div>
                  <div className="w-[40%] tab:ms-[-30px] -mt-10 md:mt-0 tab:w-full">
                    <Image
                      src="/images/3device.png"
                      height={200}
                      width={300}
                      alt="Product"
                      className="w-[90%] h-auto scale-150 tab:scale-100  ms-5   tab:ms:5"
                    />
                  </div>
                </div>
              </div>
              <div
                id="Price"
                className="text-end xxl:text-start w-[20%] tab:w-full px-7 xxl:mx-5"
              >
                <h1 className="font-semibold  text-end xxl:text-start text-5xl xxl:text-3xl">
                  {expectedCurrency === "aud" ? "AU" : ""}${kitPrice}
                </h1>
                <span className="font-normal text-xl text-[#000]/80">
                  For the set of 3x AI Devices
                </span>
              </div>
            </div>
          </div> */}
          {/* mobile */}
          {/* <div className="hidden tab:block w-full">
            <div className="bg-[#F3F4F6] overflow-hidden relative h-auto w-full  px-5  mx-0 py-12 rounded-xl">
              <div className="flex tab:flex-col gap-4 items-center h-full md:h-auto justify-between ">
                <div className="w-full  ">
                  <p className="cursor-text flex justify-center mb-4">
                    <button className="w-auto cursor-text py-[10px] px-3 text-white bg-[#80CAA7] rounded-[10px]  font-semibold">
                      Set of 3x AI Devices
                    </button>
                  </p>
                  <h3 className="font-bold text-2xl text-center">
                    Required with your system
                  </h3>
                  <p className="text-base pt-2 text-center">
                    All in One AI Sensor Pack for entire house.
                  </p>
                  <p className="my-2 text-sm text-center">
                    Fall Detection and Sleep <br /> Monitoring Solution
                  </p>
                </div>
                <div className="w-full">
                  <Image
                    src="/images/mobile/3device.webp"
                    height={500}
                    width={500}
                    alt="Product"
                    quality={100}
                    className="w-full h-auto scale-150 "
                  />
                </div>
                <div id="Price" className="text-center">
                  <h1 className="font-bold  text-3xl ">
                    {" "}
                    {expectedCurrency === "aud" ? "AU" : ""}${kitPrice}
                  </h1>
                  <span className="font-normal pt-1 text-base text-[#000]/80">
                    For the set of 3x AI Devices
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </>
      )}

      {/* second section */}

      <div className="tab:hidden max-w-[1720px] w-full mx-auto">
        <div className="flex justify-between tab:flex-col-reverse tab:gap-5 items-center  px-0">
          <div className="bg-[#F3F4F6] overflow-hidden relative h-[780px] md:h-auto w-[80%] tab:w-full  px-20 md:px-10 tab:px-5  md:mx-0 py-32 md:py-20 rounded-xl">
            <div className="flex tab:flex-col gap-4 items-center h-full md:h-auto justify-between ">
              <div className="w-[60%] tab:w-full  ">
                <h3 className="font-bold text-[48px] md:text-2xl tab:text-center">
                  AI Care Guardian
                </h3>
                <p className="text-[29px] md:text-[16px] md:pt-4 tab:pt-2 tab:text-center">
                  All in One AI Sensor
                </p>
                <p className="text-xl my-7 tab:my-4 md:text-sm tab:text-center">
                  You can always add more devices if you have more rooms.
                </p>
                <p className="cursor-text tab:flex tab:justify-center">
                  <button className="w-auto cursor-text py-[10px] px-3 text-white bg-primary rounded-[10px]  font-semibold">
                    1x AI Device
                  </button>
                </p>
              </div>
              <div className="w-[40%] tab:ms-[-30px] -mt-10 md:mt-0 tab:w-full">
                <Image
                  src="/images/1device.png"
                  height={200}
                  width={300}
                  alt="Product"
                  className="w-[95%] h-auto scale-150 tab:scale-100  ms-5   tab:ms:5"
                />
              </div>
            </div>
          </div>
          <div
            id="Price"
            className="text-end  xxl:text-start w-[20%] tab:w-full px-7 md:px-2 xxl:mx-5"
          >
            <div id="Price" className="text-start">
              <h1 className="font-semibold text-center text-5xl xxl:text-3xl">
                {expectedCurrency === "aud" ? "AU" : ""}${addonDevicePrice}
              </h1>
              <p className="font-normal !text-center text-md text-[#000]/80 ">
                per device
              </p>
            </div>
            <div
              id="Quantity_Selector"
              className="flex items-center my-4 gap-3 border-gray-300 px-3 py-2 w-full max-w-44 mx-auto rounded-md border-2 h-fit"
            >
              <button
                className="text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLogin ? quantity <= 1 : quantity == 0} // Prevent decrementing to 0 if logged in
                onClick={() => {
                  setQuantity(
                    quantity > (isLogin ? 1 : 0) ? quantity - 1 : quantity
                  );
                  setInstallationPrice(
                    installationPrice - installationPriceStatic
                  );
                  setInstallationQuantity(installationQuantity - 1);
                }}
              >
                <MinusCircledIcon className="w-8 h-8" />
              </button>
              <span className="text-lg font-semibold text-main_color-primary border-gray-300 px-3 py-1 rounded-md border-2">
                {quantity}
              </span>
              <button
                className="text-primary"
                onClick={() => {
                  setQuantity(quantity + 1);
                  setInstallationPrice(
                    installationPrice + installationPriceStatic
                  );
                  setInstallationQuantity(installationQuantity + 1);
                }}
              >
                <PlusCircledIcon className="w-8 h-8" />
              </button>
            </div>
            {/* <span className="font-normal text-md text-[#000]/80 ">
              {quantity} Device
            </span> */}
          </div>
        </div>
      </div>
      {/* <div className="tab:hidden max-w-[1720px] w-full mx-auto">
        <div className="flex justify-between tab:flex-col-reverse tab:gap-5 items-center  px-0">
          <div className="bg-[#F3F4F6] overflow-hidden relative h-[780px] md:h-auto w-[80%] tab:w-full  px-20 md:px-10 tab:px-5  md:mx-0 py-32 md:py-20 rounded-xl">
            <div className="flex tab:flex-col gap-4 items-center h-full md:h-auto justify-between ">
              <div className="w-[60%] tab:w-full  ">
                <h3 className="font-bold text-[48px] md:text-2xl tab:text-center">
                  Need more devices?
                </h3>
                <p className="text-[29px] md:text-[16px] md:pt-4 tab:pt-2 tab:text-center">
                  All in One AI Sensor for additional rooms
                </p>
                <p className="text-xl my-7 tab:my-4 md:text-sm tab:text-center">
                  You can always add more devices if you have more rooms.
                </p>
                <p className="cursor-text tab:flex tab:justify-center">
                  <button className="w-auto cursor-text py-[10px] px-3 text-white bg-primary rounded-[10px]  font-semibold">
                    1x AI Device
                  </button>
                </p>
              </div>
              <div className="w-[40%] tab:ms-[-30px] -mt-10 md:mt-0 tab:w-full">
                <Image
                  src="/images/1device.png"
                  height={200}
                  width={300}
                  alt="Product"
                  className="w-[95%] h-auto scale-150 tab:scale-100  ms-5   tab:ms:5"
                />
              </div>
            </div>
          </div>
          <div
            id="Price"
            className="text-end  xxl:text-start w-[20%] tab:w-full px-7 md:px-2 xxl:mx-5"
          >
            <div id="Price" className="text-start">
              <h1 className="font-semibold text-center text-5xl xxl:text-3xl">
                {expectedCurrency === "aud" ? "AU" : ""}${addonDevicePrice}
              </h1>
              <p className="font-normal !text-center text-md text-[#000]/80 ">
                For 1 Additional device
              </p>
            </div>
            <div
              id="Quantity_Selector"
              className="flex items-center my-4 gap-3 border-gray-300 px-3 py-2 w-full max-w-44 mx-auto rounded-md border-2 h-fit"
            >
              <button
                className="text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLogin ? quantity <= 1 : quantity == 0} // Prevent decrementing to 0 if logged in
                onClick={() => {
                  setQuantity(
                    quantity > (isLogin ? 1 : 0) ? quantity - 1 : quantity
                  );
                  setInstallationPrice(
                    installationPrice - installationPriceStatic
                  );
                  setInstallationQuantity(installationQuantity - 1);
                }}
              >
                <MinusCircledIcon className="w-8 h-8" />
              </button>
              <span className="text-lg font-semibold text-main_color-primary border-gray-300 px-3 py-1 rounded-md border-2">
                {quantity}
              </span>
              <button
                className="text-primary"
                onClick={() => {
                  setQuantity(quantity + 1);
                  setInstallationPrice(
                    installationPrice + installationPriceStatic
                  );
                  setInstallationQuantity(installationQuantity + 1);
                }}
              >
                <PlusCircledIcon className="w-8 h-8" />
              </button>
            </div>
            <span className="font-normal text-md text-[#000]/80 ">
              {quantity} Additional Device Selected
            </span>
          </div>
        </div>
      </div> */}
      {/* mobile */}
      <div className="hidden tab:block w-full">
        <div className="bg-[#F3F4F6] overflow-hidden relative h-auto w-full  px-5  mx-0 py-12 rounded-xl">
          <div className="flex tab:flex-col gap-4 items-center h-full md:h-auto justify-between ">
            <div className="w-full  ">
              <p className="cursor-text flex justify-center mb-4">
                <button className="w-auto cursor-text py-[10px] px-3 text-white bg-[#80CAA7] rounded-[10px]  font-semibold">
                  1x AI Device
                </button>
              </p>
              <h3 className="font-bold text-2xl text-center">
                AI Care Guardian
              </h3>
              <p className="text-base pt-2 text-center">All in One AI Sensor</p>
              <p className="mt-2 text-sm text-center">
                You can always add more <br /> devices if you have more rooms.
              </p>
            </div>
            <div className="w-full">
              <Image
                src="/images/mobile/banner.png"
                height={500}
                width={500}
                alt="Product"
                quality={100}
                className="w-full h-auto scale-110 "
              />
              <div id="Price" className="text-end  w-full px-2 ">
                <div id="Price" className="text-start">
                  <h1 className="font-bold text-center text-3xl">
                    {expectedCurrency === "aud" ? "AU" : ""}${addonDevicePrice}
                  </h1>
                  <p className="font-normal !text-center text-md text-[#000]/80 ">
                    Per device
                  </p>
                </div>
                <div
                  id="Quantity_Selector"
                  className="flex items-center my-4 gap-3 border-gray-300 px-3 py-2 w-full max-w-44 mx-auto rounded-md border-2 h-fit"
                >
                  <button
                    className="text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLogin ? quantity <= 1 : quantity == 0} // Prevent decrementing to 0 if logged in
                    onClick={() => {
                      setQuantity(
                        quantity > (isLogin ? 1 : 0) ? quantity - 1 : quantity
                      );
                      setInstallationPrice(
                        installationPrice - installationPriceStatic
                      );
                      setInstallationQuantity(installationQuantity - 1);
                    }}
                  >
                    <MinusCircledIcon className="w-8 h-8" />
                  </button>
                  <span className="text-lg font-semibold text-main_color-primary border-gray-300 px-3 py-1 rounded-md border-2">
                    {quantity}
                  </span>
                  <button
                    className="text-primary"
                    onClick={() => {
                      setQuantity(quantity + 1);
                      setInstallationPrice(
                        installationPrice + installationPriceStatic
                      );
                      setInstallationQuantity(installationQuantity + 1);
                    }}
                  >
                    <PlusCircledIcon className="w-8 h-8" />
                  </button>
                </div>
                <p className="font-normal text-center text-md text-[#000]/80 ">
                  {quantity} Additional Device Selected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3rd section */}
      {/* <div className="max-w-[1720px] w-full mx-auto tab:hidden">
        <div className="flex justify-between tab:flex-col-reverse tab:gap-5 items-center  px-0">
          <div className="bg-[#F3F4F6] overflow-hidden relative h-[780px] md:h-[480px] tab:h-[790px] w-[80%] tab:w-full  ps-20 md:px-10 tab:px-5  md:mx-0 py-0 md:py-20 rounded-xl">
            <div className="flex tab:flex-col gap-4 items-center h-full md:h-auto justify-between ">
              <div className="w-[60%] tab:w-full  ">
                <h3 className="font-bold text-[48px] md:text-2xl tab:text-center">
                  Expert Installation
                </h3>
                <p className="text-[29px] md:text-[16px] md:pt-4 tab:pt-2 tab:text-center">
                  Do you want expert to do installation?
                </p>
                <p className="text-xl my-7 tab:my-4 md:text-sm tab:text-center">
                  Avoid setup risks and gain peace of mind with a professional
                  installation.
                </p>

                <div
                  id="YN_and_Price"
                  className="flex justify-start tab:justify-center "
                >
                  <RadioButtonGroup
                    selectedOption={selecteInstallation}
                    setSelectedOption={setselecteInstallation}
                  />
                </div>
              </div>
              <div className="w-[40%] h-full tab:w-full">
                <Image
                  src="/images/system3.png"
                  height={200}
                  width={800}
                  alt="Product"
                  className=" h-full object-cover tab:mx-auto"
                />
              </div>
            </div>
            <div className="absolute bottom-8">
              <p className="cursor-text tab:flex my-5 tab:justify-center">
                <button className="w-auto cursor-text py-[10px] px-3 text-white bg-primary rounded-[10px]  font-semibold">
                  Set of 3x AI Devices
                </button>
              </p>
            </div>
          </div>
          <div
            id="Price"
            className="text-end xxl:text-start w-[20%] tab:w-full px-2 xxl:mx-5"
          >
            <h1 className="font-semibold  text-end xxl:text-start text-5xl xxl:text-3xl">
              {expectedCurrency === "aud" ? "AU" : ""} $
              {selecteInstallation === 1 ? installationPrice : 0}
            </h1>
            <span className="font-normal text-xl text-[#000]/80">
              Installation Price for {installationQuantity} Devices
            </span>
          </div>
        </div>
      </div> */}

      {/* <div className="hidden tab:block w-full">
        <div className="bg-[#F3F4F6] overflow-hidden relative h-auto w-full    mx-0 py-12 rounded-xl">
          <div className="flex tab:flex-col gap-4 items-center h-full md:h-auto justify-between ">
            <div className="w-full px-5 ">
              <p className="cursor-text flex justify-center mb-4">
                <button className="w-auto cursor-text py-[10px] px-3 text-white bg-[#80CAA7] rounded-[10px]  font-semibold">
                  Expert Installation
                </button>
              </p>
              <h3 className="font-bold text-2xl text-center">
                Do you want expert to do installation?
              </h3>

              <p className="my-2 text-sm text-center">
                Avoid setup risks and gain peace of <br /> mind with a
                professional installation.
              </p>
            </div>
            <div
              id="YN_and_Price"
              className="flex justify-start tab:justify-center py-3 "
            >
              <RadioButtonGroup
                selectedOption={selecteInstallation}
                setSelectedOption={setselecteInstallation}
              />
            </div>
            <div id="Price" className="text-center">
              <h1 className="font-bold text-3xl">
                {expectedCurrency === "aud" ? "AU" : ""}$
                {selecteInstallation === 1 ? installationPrice : 0}
              </h1>
              <span className="font-normal text-base text-[#000]/80">
                Installation Price for {installationQuantity} Devices
              </span>
            </div>
            <div className="w-full">
              <Image
                src="/images/system3.png"
                height={500}
                width={500}
                alt="Product"
                quality={100}
                className="w-full h-auto mt-2 "
              />
            </div>
          
          </div>
        </div>
      </div> */}

      {/* <div className="py-14 w-full flex justify-center items-center bg-[#1D293F]">
        <div className="max-w-[1920px] w-full px-[200px] flex xxl:flex-col flex-row justify-between items-center  text-[#ffffff]">
          <div>
            <h4 className="xxs:text-[28px] sm:text-[32px] md:text-[40px] text-[48px] text-start xxl:text-center font-semibold font-poppins">
              Already own a device?
            </h4>
            <h6 className="text-[30px] sm:text-[20px] md:text-[24px] xxs:text-[14px]">
              Skip this step if you don&apos;t need to purchase a new one.
            </h6>
          </div>
          <div>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowPopup(true);
              }}
              className="text-[#1D293F] bg-[#ffffff] w-[218px] h-[50px] flex justify-center items-center text-[18px] font-bold rounded-lg"
            >
              Skip
            </Link>

            {showPopup && (
              <div className="fixed inset-0 flex w-full h-screen z-50 items-center justify-center bg-[#00000021]">
                <div className="bg-white p-6 rounded-[35px] max-w-[635px] w-full py-10">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="text-[#A39C9C] text-[20px] font-sans w-full text-end"
                  >
                    X
                  </button>
                  <h2 className="text-[28px] font-bold text-[#1D293F] mb-4 ml-7">
                    Enter Your Email
                  </h2>
                  <div className="flex flex-col items-center justify-center w-full">
                    <input
                      type="email"
                      placeholder="Write your e-mail here"
                      className="w-full max-w-[535px] text-[#1D293F] text-[20px] p-3 border border-gray-300 border-solid rounded mb-2"
                      required
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {isEmpty && (
                      <p className="text-red-500 text-sm mb-4">
                        Email cannot be empty. Please enter your email.
                      </p>
                    )}
                    {!isEmpty && !emailValid && (
                      <p className="text-red-500 text-sm mb-4">
                        Please enter a valid email address.
                      </p>
                    )}
                    <button
                      onClick={handleContinue}
                      disabled={isEmpty || !emailValid}
                      className={`w-[150px] h-[60px] mt-4 ${
                        isEmpty || !emailValid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#70B896]"
                      } text-white p-2 rounded`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}

      {/* 4th */}
      <div
        id="CheckOut_Section"
        className="relative flex flex-col gap-6 items-start justify-between bg-[#F1F1F2] max-w-[1720px] my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5 tab:px-3"
      >
        <div
          id="Section_Header"
          className="flex tab:hidden flex-col items-start gap-2"
        >
          <h2 className="font-semibold text-3xl">Equipment</h2>
          <p className="font-normal text-md text-[#000]/80">Your Summary</p>
        </div>
        <h2 className="w-full text-center hidden tab:block font-semibold text-3xl">
          Summary
        </h2>
        <div id="Note_and_Summary" className="flex gap-6  w-full md:flex-col">
          <div
            id="KeyPoints_Note"
            className="flex flex-col justify-between gap-5 w-[35%] py-16 md:w-full md:py-5"
          >
            <ul className="flex flex-col gap-4">
              {[
                // "10 Days cooling off period",
                "AI Monitoring & Alerts",
                "24 Months Contract",
              ].map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className="flex items-center gap-2 font-semibold text-md"
                  >
                    <StarIcon className="w-6 h-6" />
                    {item}
                  </li>
                );
              })}
            </ul>
            {/* <p className="text-sm opacity-80">
              Please note for the first few days the system will learn your
              routines and no alert services will work with monitoring company
              until after 7 days from going live while you test the system
            </p> */}
          </div>
          <div
            id="Summary"
            className="w-[75%] bg-white p-8 py-10 rounded-xl md:w-full md:p-4"
          >
            <ul className="flex flex-col gap-5">
              {/* {!isLogin && (
                <li className="flex items-center text-nowrap gap-5">
                  <p className="font-semibold text-lg md:text-base">
                    1 Seenyor Kit
                  </p>
                  <hr className="w-full border-2" />
                  <span className="text-nowrap text-lg font-normal">
                    {expectedCurrency === "aud" ? "AU" : ""}${kitPrice}
                  </span>
                </li>
              )} */}
              <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  {quantity} Devices
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  {expectedCurrency === "aud" ? "AU" : ""}$
                  {addonDevicePrice * quantity}
                </span>
              </li>
              {/* <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  {quantity} Additional Device
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  {expectedCurrency === "aud" ? "AU" : ""}$
                  {addonDevicePrice * quantity}
                </span>
              </li> */}
              {/* <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  Installation
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  {expectedCurrency === "aud" ? "AU" : ""} $
                  {selecteInstallation === 1 ? installationPrice : 0}
                </span>
              </li> */}
              <li className="flex md:flex-col md:justify-center items-center text-nowrap gap-5 md:gap-1">
                <p className="font-semibold text-xl md:text-base">
                  TOTAL (One Time Payment)
                </p>
                <hr className="w-full border-2 md:hidden" />
                <span className="text-nowrap text-lg md:text-2xl font-normal md:font-semibold">
                  {expectedCurrency === "aud" ? "AU" : ""}${total}
                </span>
              </li>
            </ul>
            {!isLogin && (
              <div
                id="AI_Monitoring_Addon"
                className="flex items-center justify-between p-3 border border-gray-400 border-opacity-50 rounded-xl mt-5"
              >
                <div className="flex flex-col items-start">
                  <h2 className="font-semibold text-xl md:md">AI Monitoring</h2>
                  {/* <p className="font-normal text-md md:text-sm text-[#000]/80">
                    {expectedCurrency === "aud" ? "AU" : ""}${aimonitoring * 24}{" "}
                    Total Value Over 24 Months
                  </p> */}
                </div>
                <div className="flex tab:block  items-end">
                  <h2 className="font-semibold text-xl md:text-md">
                    {expectedCurrency === "aud" ? "AU" : ""}${aimonitoring}
                  </h2>
                  <p className="font-normal text-md md:text-sm text-[#000]/80">
                    /Month
                  </p>
                </div>
              </div>
            )}

            <div id="Terms_and_Checkout" className="flex flex-col gap-4 mt-4">
              <em className="text-gray-600 inline-block md:text-sm ">
                By submitting this order, you agree to Seenyors&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => window.open("/terms-and-conditions", "_blank")}
                >
                  Terms & Conditions
                </span>
                ,&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => window.open("/terms-of-service", "_blank")}
                >
                  Terms of Service
                </span>
                ,&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => window.open("/shipping-and-returns", "_blank")}
                >
                  Shipping & Returns
                </span>
                ,&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => window.open("/privacy-policy", "_blank")}
                >
                  Privacy Policy
                </span>
                ,&nbsp; and&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => window.open("/service-agreement", "_blank")}
                >
                  User Agreement & Liability Disclaimer
                </span>
                .
              </em>

              <TermsCheckbox
                // checked={isChecked}
                onMainCheckboxChange={() => setIsChecked(!isChecked)}
              />

              <Button
                disabled={isChecked}
                onClick={handleCheckout}
                type="submit"
                shape="round"
                color="green_200_green_400_01"
                className="w-[70%] my-0 mx-auto rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] sm:m-auto"
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
