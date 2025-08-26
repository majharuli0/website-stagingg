"use client";
import { Button, Img } from "@/components";
import { useAuth } from "@/context/AuthContext";

import { useUserService } from "@/services/userService";
import {
  MinusCircledIcon,
  PlusCircledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RadioButtonGroup from "../(product)/get-started/RadioGroupFInstallation";
import "../(product)/get-started/style.css";
import TermsCheckbox from "../(product)/get-started/TermsCheckbox ";
import ProductHero from "./ProductHero";
import Header from "@/components/layouts/Navbar";

import { toast } from "react-toastify";

export default function HomePage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  let [installationPrice, setInstallationPrice] = useState(0);
  let [addonDevicePrice, setAddonDevicePrice] = useState(0);

  let [total, setTotal] = useState(0);
  let [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selecteInstallation, setselecteInstallation] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    getProducts,
    getStripeCustomerId,
    createStripeSession,
    getCustomerId,
  } = useUserService();
  const { setEmail, email, user, accessToken, customerMail } = useAuth();
  const { country } = useAuth();
  const expectedCurrency = country === "global" ? "usd" : "aud";
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        const addon = fetchedProducts.find(
          (p) =>
            p.name === "All in One AI Sensor" && p.currency === expectedCurrency
        );
        const installation = fetchedProducts.find(
          (p) => p.name === "Installation" && p.currency === expectedCurrency
        );
        if (addon) setAddonDevicePrice(addon.price);
        // if (installation) setInstallationPrice(installation.price);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Total Price calculation
  useEffect(() => {
    const calculatedTotal =
      (selecteInstallation === 1 ? installationPrice : 0) +
      addonDevicePrice * quantity;
    setTotal(calculatedTotal);
  }, [installationPrice, selecteInstallation, addonDevicePrice, quantity]);

  const updateOrderDetails = () => {
    const orderDetails = {
      installationPrice: selecteInstallation === 1 ? installationPrice : 0,
      addonDevicePrice,
      addonQuantity: quantity,
      total: total,
      products: products
        .filter((p) => !p.isRecurring)
        .map((p) => ({
          id: p.id,
          priceId: p.priceId,
          name: p.name,
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
              : false,
        })),
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  };

  useEffect(() => {
    updateOrderDetails();
  }, [
    installationPrice,
    addonDevicePrice,
    quantity,
    selecteInstallation,
    total,
    products,
  ]);

  const handleCheckout = async () => {
    let stripeCustomerId;
    const email = localStorage.getItem("user_email")
      ? localStorage.getItem("user_email")
      : null;
    try {
      setLoading(true);

      stripeCustomerId = await getStripeCustomerId(email);
      if (!stripeCustomerId) {
        const customerData = await getCustomerId(email);
        stripeCustomerId = customerData.id;
        if (!stripeCustomerId) {
          router.push("/buydevice");
          toast.error(
            "Oops! There seems to be an issue with your account. Please reach out to our support team."
          );
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching customer ID:", error);
      toast.error(
        "Oops! There seems to be an issue with your account. Please reach out to our support team."
      );
      router.push("/buydevice");
      return;
    } finally {
      setLoading(false);
    }

    // Ensure order details are up to date in localStorage
    updateOrderDetails();

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (!orderDetails) {
      throw new Error("No order details found");
    }

    if (accessToken) {
      const lineItems = [];
      if (quantity > 0) {
        const addonProduct = products.find(
          (p) =>
            p.name === "All in One AI Sensor" && p.currency === expectedCurrency
        );
        if (addonProduct) {
          lineItems.push({
            price: addonProduct.priceId,
            quantity: quantity,
            adjustable_quantity: { enabled: true, minimum: 0, maximum: 10 },
          });
        } else {
          throw new Error("Additional Device product not found");
        }
      }

      // if (selecteInstallation === 1) {
      //   const installationProduct = products.find(
      //     (p) => p.name === "Installation" && p.currency === expectedCurrency
      //   );
      //   if (installationProduct) {
      //     lineItems.push({
      //       price: installationProduct.priceId,
      //       quantity: 1,
      //       adjustable_quantity: { enabled: false },
      //     });
      //   } else {
      //     throw new Error("Installation product not found");
      //   }
      // }
      if (lineItems.length === 0) {
        throw new Error("No products selected for checkout");
      }
      let returnURL = window.location.origin;

      try {
        setLoading(true);
        const session = await createStripeSession({
          customer: stripeCustomerId,
          line_items: lineItems,
          return_url: returnURL,
          sessionMode: "payment",
          email: email,
          // success_url: successUrl,
          // cancel_url: cancelUrl,
        });

        window.location.href = session.url;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

      // let successUrl = window.location.origin + "/success";
      // let cancelUrl = window.location.origin + "/cancel";
      // const session = await createStripeSession({
      //   customer: stripeCustomerId,
      //   line_items: lineItems,
      //   success_url: successUrl,
      //   cancel_url: cancelUrl,
      //   email: user_credentials?.email,
      // });

      // window.location.href = session.url;
    } else {
      router.push("/payment");
    }
  };
  useEffect(() => {
    ["subscriptionProducts", "orderDetails"].forEach((item) =>
      localStorage.removeItem(item)
    );
  }, [accessToken]);
  return (
    <div className="flex w-full flex-col gap-10 bg-white p-5">
      <Header />
      <ProductHero />
      {/* 
      <div
        id="PageHeader"
        className=" w-full p-4 flex items-center justify-center"
      >
        <Img
          src="img_group_1.svg"
          width={156}
          height={32}
          alt="Group 1"
          className="h-[2.00rem] w-[12%] md:w-[30%] object-contain"
        />
      </div> */}

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
                <h4 className="font-semibold text-lg"> AI Care Guardian</h4>
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
                disabled={quantity == 1}
                onClick={() => {
                  setQuantity(quantity > 0 ? quantity - 1 : 0);
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

      {/* <div
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
      </div> */}
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
            className="w-[75%] py-10 rounded-xl md:w-full md:p-0"
          >
            <ul className="flex flex-col gap-5 bg-white p-8 rounded-md">
              {/* <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  1 Seenyor Kit
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg font-normal">
                  ${kitPrice}
                </span>
              </li> */}
              <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  {quantity} Additional Device
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  ${addonDevicePrice * quantity}
                </span>
              </li>
              {/* <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  {selecteInstallation !== 0 ? 1 : " "} Installation
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  ${selecteInstallation === 1 ? installationPrice : 0}
                </span>
              </li> */}
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
                disabled={isChecked === true || quantity === 0}
                onClick={handleCheckout}
                loading={loading}
                type="submit"
                shape="round"
                color="green_200_green_400_01"
                className="w-[50%] my-0 ml-auto rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] sm:m-auto text-white "
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
