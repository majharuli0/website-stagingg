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

export default function HomePage() {
  const router = useRouter();
  const { isLogin } = useAuth();

  const [products, setProducts] = useState([]);
  let [kitPrice, setKitPrice] = useState(1300);
  let [installationPrice, setInstallationPrice] = useState(250);
  let [addonDevicePrice, setAddonDevicePrice] = useState(400);
  let [aimonitoring, setAimonitoring] = useState(0);
  let [total, setTotal] = useState(0);
  let [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selecteInstallation, setselecteInstallation] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const {
    getProducts,
    getStripeCustomerId,
    createStripeSession,
    createStripeCustomer,
    getUserDetailsById,
  } = useUserService();
  const { country } = useAuth();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        console.log(fetchedProducts);

        // Set prices based on fetched products
        const kit = fetchedProducts.find(
          (p) => p.name === "Required with your system" && !isLogin
        );
        const addon = fetchedProducts.find(
          (p) => p.name === "All in One AI Sensor"
        );
        const installation = fetchedProducts.find(
          (p) => p.name === "Installation"
        );
        const aimonitoring = fetchedProducts.find(
          (p) => p.name === "AI Monitoring" && !p.isRecurring && !isLogin
        );
        console.log(aimonitoring);
        if (kit) setKitPrice(kit.price);
        if (addon) setAddonDevicePrice(addon.price);
        if (installation) setInstallationPrice(installation.price);
        if (aimonitoring) setAimonitoring(aimonitoring.price);

        //Store Subcription Product Details in Local Storage that has isRecurring true
        const subscriptionProducts = fetchedProducts.filter(
          (p) => p.isRecurring
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
            !p.isRecurring &&
            !(
              isLogin &&
              p.name === "AI Monitoring" &&
              p.name === "Required with your system"
            )
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
              ? 1
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
        console.log(res);

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

          return true;
        })
        .map((p) => ({
          price_data: {
            currency: country === "au" ? "aud" : "usd",
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
                  maximum: 10,
                }
              : {
                  enabled: false,
                },
        }))
        .filter((item) => item.quantity > 0);
      console.log(lineItems);

      // Start the first API call
      const stripeCustomerPromise = createStripeCustomer({
        email: userDetails.email,
        name: userDetails.name,
      });

      // Once the first API call is resolved, use its result for the second call
      stripeCustomerPromise
        .then((stripeCustomerResponse) => {
          const stripeCustomerId = stripeCustomerResponse.id;

          // Start the second API call
          return createStripeSession({
            customer: stripeCustomerId,
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl,
          });
        })
        .then((session) => {
          // Handle the session result
          window.location.href = session.url;
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error during checkout process:", error);
        });
    } else {
      router.push("/register");
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

  return (
    <div className="flex w-full flex-col gap-10 bg-white p-5">
      {!isLogin && (
        <div
          id="Required_Products_Section"
          className="relative flex flex-col gap-2 md:gap-6 items-center justify-center bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
        >
          <div
            id="Section_Header"
            className="flex flex-col items-center gap-2 "
          >
            <h2 className="font-semibold text-3xl text-center">
              Required with your system
            </h2>
            <p className="font-normal text-md text-[#000]/80 text-center">
              3X All in One AI Sensor Pack for the entire house. Fall Detection
              and Sleep Monitoring Solution
            </p>
          </div>
          <div id="Price" className="price absolute right-16 md:text-center">
            <h1 className="font-semibold text-3xl">${kitPrice}</h1>
            <span className="font-normal text-md text-[#000]/80">
              {country === "au" ? "GST is Included in" : "TAX is Included in"}
              <br />
              The Price
            </span>
          </div>
          <div
            id="Products_Showcase"
            className="flex items-center md:grid md:grid-cols-2 gap-2"
          >
            {["Bedroom", "Livingroom", "Bathroom"].map((item, ind) => {
              return (
                <div
                  id="Product"
                  key={ind}
                  className={`flex flex-col items-center justify-center ${
                    ind === 2 ? "md:col-span-2 text-center" : ""
                  }`} // Use col-span-2 for the third item
                >
                  <Img
                    src="Product-1.png"
                    width={250}
                    height={180}
                    alt="Product"
                  />
                  <h4 className="font-medium text-lg">{item}</h4>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        id="More_Device_Section"
        className="relative flex flex-col gap-6 items-start justify-start bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
      >
        <div id="Section_Header" className="flex flex-col items-start gap-2">
          <h2 className="font-semibold text-3xl">Need more devices?</h2>
          <p className="font-normal text-md text-[#000]/80">
            You can always add more devices if you have more rooms.
          </p>
        </div>

        <div
          id="Addon_Product_and_Price"
          className="flex items-center w-full gap-6 md:flex-col"
        >
          <div
            id="Addon_Product"
            className="flex md:flex-col gap-2 md:gap-5 w-full bg-white items-center justify-between p-2 pr-6 rounded-xl md:pb-6"
          >
            <div
              id="Product"
              className="flex md:flex-col items-center justify-center "
            >
              <Img src="Product-1.png" width={250} height={180} alt="Product" />
              <div id="Product_Details">
                <h4 className="font-semibold text-lg">All in One AI Sensor</h4>
                <span className="text-[#000]/80">
                  Fall Detection + Sleep Monitoring
                </span>
              </div>
            </div>
            <div
              id="Quantity_Selector"
              className="flex items-center gap-3 border-gray-300 px-3 py-2 rounded-md border-2 h-fit"
            >
              <button
                className="text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLogin ? quantity <= 1 : quantity == 0} // Prevent decrementing to 0 if logged in
                onClick={() => {
                  setQuantity(
                    quantity > (isLogin ? 1 : 0) ? quantity - 1 : quantity
                  );
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
                }}
              >
                <PlusCircledIcon className="w-8 h-8" />
              </button>
            </div>
          </div>
          <div id="Price" className="md:text-center">
            <h1 className="font-semibold text-3xl">
              ${addonDevicePrice * quantity}
            </h1>
            <span className="font-normal text-md text-[#000]/80 text-nowrap">
              One Time Payment
            </span>
          </div>
        </div>
      </div>

      <div
        id="Intallation_Section"
        className="relative flex md:flex-col gap-4 items-center justify-between bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
      >
        <div id="Section_Header" className="flex flex-col items-start gap-2">
          <h2 className="font-semibold text-3xl">Installation</h2>
          <p className="font-normal text-md text-[#000]/80">
            Do you want an expert to handle your installation
          </p>
        </div>
        <div id="YN_and_Price" className="flex gap-24 md:flex-col md:gap-10">
          <RadioButtonGroup
            selectedOption={selecteInstallation}
            setSelectedOption={setselecteInstallation}
          />
          <div id="Price" className="md:text-center">
            <h1 className="font-semibold text-3xl">
              ${selecteInstallation === 1 ? installationPrice : 0}
            </h1>
            <span className="font-normal text-md text-[#000]/80">
              One Time Payment
            </span>
          </div>
        </div>
      </div>
      <div
        id="CheckOut_Section"
        className="relative flex flex-col gap-6 items-start justify-between bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
      >
        <div id="Section_Header" className="flex flex-col items-start gap-2">
          <h2 className="font-semibold text-3xl">Equipment</h2>
          <p className="font-normal text-md text-[#000]/80">Your Summary</p>
        </div>
        <div id="Note_and_Summary" className="flex gap-6  w-full md:flex-col">
          <div
            id="KeyPoints_Note"
            className="flex flex-col justify-between gap-5 w-[35%] py-16 md:w-full md:py-5"
          >
            <ul className="flex flex-col gap-4">
              {[
                "10 Days cooling off period",
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
            <p className="text-sm opacity-80">
              Please note for the first few days the system will learn your
              routines and no alert services will work with monitoring company
              until after 7 days from going live while you test the system
            </p>
          </div>
          <div
            id="Summary"
            className="w-[75%] bg-white p-8 py-10 rounded-xl md:w-full md:p-4"
          >
            <ul className="flex flex-col gap-5">
              {!isLogin && (
                <li className="flex items-center text-nowrap gap-5">
                  <p className="font-semibold text-lg md:text-base">
                    1 Seenyor Kit
                  </p>
                  <hr className="w-full border-2" />
                  <span className="text-nowrap text-lg font-normal">
                    ${kitPrice}
                  </span>
                </li>
              )}
              <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  {quantity} Additional Device
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  ${addonDevicePrice * quantity}
                </span>
              </li>
              <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  Installation
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  ${selecteInstallation === 1 ? installationPrice : 0}
                </span>
              </li>
              <li className="flex md:flex-col md:justify-center items-center text-nowrap gap-5 md:gap-1">
                <p className="font-semibold text-xl md:text-base">
                  TOTAL (One Time Payment)
                </p>
                <hr className="w-full border-2 md:hidden" />
                <span className="text-nowrap text-lg md:text-2xl font-normal md:font-semibold">
                  ${total}
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
                  <p className="font-normal text-md md:text-sm text-[#000]/80">
                    $1,176 Total Value Over 24 Months
                  </p>
                </div>
                <div className="flex  items-end">
                  <h2 className="font-semibold text-xl md:text-md">
                    ${aimonitoring}
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
                  onClick={() => window.open("/privacy-policy", "_blank")}
                >
                  Privacy Policy
                </span>
                ,&nbsp; and&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => window.open("/service-agreement", "_blank")}
                >
                  Service Agreement
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
