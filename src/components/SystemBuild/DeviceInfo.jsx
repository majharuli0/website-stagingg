"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/SystemBuild/Loader";
import Link from "next/link";
import DeviceCard from "./DeviceCard";
import { toast } from "react-toastify";
import { useUserService } from "@/services/userService";
import { useAuth } from "@/context/AuthContext";
import RadioButtonGroup from "@/app/(product)/systembuilder/RadioGroupFInstallation";
import Image from "next/image";
import uid from "@/assets/uid.png";
import LogoIcon from "../Logo/icon";
import { Button, Input } from "..";
// import uid_locate from "@/assets/uid_locate.mp4";
const DeviceInfo = () => {
  const [deviceUid, setDeviceUid] = useState("");
  const [devices, setDevices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [products, setProducts] = useState([]);
  const { getProducts } = useUserService();
  const [selecteInstallation, setSelecteInstallation] = useState(0);
  const [installationQuantity, setInstallationQuantity] = useState(0);
  const [installationPrice, setInstallationPrice] = useState(0);
  const [installationPriceStatic, setInstallationPriceStatic] = useState(0);

  const { country, isLogin } = useAuth();
  const expectedCurrency = country === "global" ? "usd" : "aud";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
        const installation = fetchedProducts.find(
          (p) => p.name === "Installation" && p.currency === expectedCurrency
        );
        if (installation) {
          // setInstallationPriceStatic(installation.price);
        }

        // Set prices based on fetched products
        // const kit = fetchedProducts.find(
        //   (p) => p.name === "Required with your system" && !isLogin
        // );
        // const addon = fetchedProducts.find(
        //   (p) => p.name === "All in One AI Sensor"
        // );
        // const installation = fetchedProducts.find(
        //   (p) => p.name === "Installation"
        // );
        // const aimonitoring = fetchedProducts.find(
        //   (p) => p.name === "AI Monitoring" && !p.isRecurring && !isLogin
        // );
        // console.log(aimonitoring);
        // if (kit) setKitPrice(kit.price);
        // if (addon) setAddonDevicePrice(addon.price);
        // if (installation) setInstallationPrice(installation.price * 3);
        // if (installation) setInstallationPriceStatic(installation.price);
        // if (aimonitoring) setAimonitoring(aimonitoring.price);

        //Store Subcription Product Details in Local Storage that has isRecurring true
        const subscriptionProducts = fetchedProducts.filter((p) => {
          const expectedCurrency = country === "global" ? "usd" : "aud";
          return p.isRecurring && p.currency === expectedCurrency;
        });
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
  // useEffect(() => {
  //   const calculatedTotal =
  //     (!isLogin ? kitPrice : 0) +
  //     (selecteInstallation === 1 ? installationPrice : 0) +
  //     addonDevicePrice * quantity;
  //   setTotal(calculatedTotal);
  // }, [
  //   kitPrice,
  //   installationPrice,
  //   selecteInstallation,
  //   addonDevicePrice,
  //   quantity,
  // ]);

  const updateOrderDetails = () => {
    setInstallationQuantity(devices.length);
    setInstallationPrice(installationPriceStatic * devices.length);

    const orderDetails = {
      installationPrice: selecteInstallation,
      products: products
        .filter(
          (p) =>
            p.name === "AI Monitoring" &&
            p.isRecurring === false &&
            p.currency === expectedCurrency
        )
        .map((p) => ({
          id: p.id,
          priceId: p.priceId,
          name: p.name,
          description: p.description,
          price: p.price,
          quantity: p.name === "AI Monitoring" ? 1 : devices.length,
          adjustable_quantity: false,
          currency: p.currency,
        })),
    };
    // const orderDetails = {
    //   installationPrice: selecteInstallation,
    //   products: products
    //     .filter(
    //       (p) =>
    //         ((p.name === "AI Monitoring" && p.isRecurring === false) ||
    //           (p.name === "Installation" && selecteInstallation === 1)) &&
    //         p.currency === expectedCurrency
    //     )
    //     .map((p) => ({
    //       id: p.id,
    //       priceId: p.priceId,
    //       name: p.name,
    //       description: p.description,
    //       price: p.price,
    //       quantity: p.name === "AI Monitoring" ? 1 : devices.length,
    //       adjustable_quantity: false,
    //       currency: p.currency,
    //     })),
    // };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
  };

  useEffect(() => {
    updateOrderDetails();
  }, [products]);
  useEffect(() => {
    setInstallationQuantity(devices.length);
    if (devices.length > 0) {
      setInstallationPrice(installationPriceStatic * devices.length);
    }
    updateOrderDetails();
  }, [devices, selecteInstallation]);
  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];
    let list = storedDevices?.map((device) => device);
    console.log(list);

    setDevices(storedDevices);
    if (storedDevices.length > 0) {
      setInstallationPrice(installationPriceStatic * devices.length);
    }
    setVerified(storedDevices.length > 0);
  }, []);

  const handleInputChange = (e) => {
    let input = e.target.value.toUpperCase();
    if (input.length <= 12) {
      setDeviceUid(input);
    }
  };
  const handleRemoveDevice = (uid) => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];
    const updatedDevices = storedDevices.filter((item) => item !== uid);
    localStorage.setItem("devices", JSON.stringify(updatedDevices));
    setDevices(updatedDevices);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deviceUid.length !== 12) {
      setErrorMessage("Device UID must be exactly 12 characters long.");
      toast.error("Device UID must be exactly 12 characters long.");
      return;
    }

    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];

    if (devices.includes(deviceUid) || storedDevices.includes(deviceUid)) {
      setErrorMessage("This Device UID has already been added.");
      toast.error("This Device UID has already been added.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/deals/device-details?uid=${deviceUid}`
      );
      const data = await response.json();
      console.log("API Response:", data);

      if (data.is_active === true) {
        setErrorMessage("Device UID is not valid.");
        toast.error("Device UID is not valid.");
        setLoading(false);
        return;
      }
      if (data.message) {
        setErrorMessage(data.message);
        toast.error(data.message);
        setLoading(false);
        return;
      }
      if (data.is_active === false) {
        const updatedDevices = [...storedDevices, deviceUid];
        localStorage.setItem("devices", JSON.stringify(updatedDevices));
        setDevices(updatedDevices);
        setVerified(true);
        setDeviceUid("");
        toast.success("Device UID Verified Successfully!");
      }
    } catch (error) {
      console.error("Error fetching device details:", error);
      setErrorMessage("An error occurred while verifying the device.");
      toast.error("An error occurred while verifying the device.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* {loading && <Loader />} */}

      {
        <div className="container font-poppins text-[#1D293F] items-center overflow-x-hidden justify-center flex flex-col gap-[50px] px-8 md:px-4 mb-10">
          <div className="flex flex-col gap-4 items-center">
            <div className="p-8 pb-0 w-full flex flex-col items-center ">
              <Link href="/" className="mb-2">
                <LogoIcon />
              </Link>
              <h1 className="text-2xl font-bold text-text my-2 text-center">
                Verify Your Device
              </h1>

              <p className="text-gray-500 text-center mb-4">
                Please enter the Device UID to verify your devices.
              </p>
            </div>
            <Image
              src={uid}
              alt="uid guide"
              className="border border-t-slate-200 w-[800px] md:w-full rounded-xl hidden md:block"
              width={1920}
              height={500}
            />
            <video
              width="600"
              autoPlay
              loop
              muted
              className="border border-t-slate-200 w-[800px] md:w-full rounded-xl md:hidden"
            >
              <source src="/assets/uid_locate.mp4" type="video/mp4" />
            </video>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#F6F7F7] w-[800px] md:w-full rounded-[14px] md:rounded-md flex flex-col items-center justify-center "
            noValidate
          >
            <div className="w-full mb-5 p-[30px] md:p-[30px] sm:p-4 flex flex-col gap-6">
              <h3 className="text-[22px] md:text-[20px] sm:text-[16px] font-semibold">
                Verify your device
              </h3>
              <div className="flex w-full flex-row sm:flex-col items-end  justify-end gap-[16px]">
                <div className="w-full flex flex-col gap-3">
                  <label className="text-[1rem] font-semibold">
                    Device UID
                  </label>
                  <Input
                    id="device-uid"
                    name="deviceUid"
                    type="text"
                    value={deviceUid}
                    onChange={handleInputChange}
                    placeholder="ex: 4678469JDUE7DBFE8N"
                    className="w-full h-[60px] px-4 rounded-[10px] bg-slate-200/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61C7AA] focus:shadow-inner transition-shadow duration-300 ease-in-out"
                  />
                </div>
                <Button
                  loading={loading}
                  type="submit"
                  shape="round"
                  color="green_200_green_400_01"
                  className="rounded-[14px] h-[60px] px-[2.13rem] font-semibold sm:w-full"
                >
                  Verify
                </Button>
              </div>
            </div>
          </form>

          <div className="bg-[#F6F7F7] w-[800px] md:w-full p-[30px] md:p-[30px] sm:p-4 rounded-[16px] flex flex-col gap-6 md:rounded-md">
            <h1 className="text-[22px] md:text-[20px] sm:text-[16px] font-semibold">
              Your Devices
            </h1>
            {devices.length > 0 ? (
              devices.map((uid, index) => (
                <DeviceCard
                  key={index}
                  id={uid}
                  handleRemoveDevice={handleRemoveDevice}
                />
              ))
            ) : (
              <p className="text-[#6C7482] text-center font-medium">
                No devices added yet.
              </p>
            )}
          </div>
          {/* {devices.length > 0 && (
            <div className="w-full max-w-[800px]">
              <div className="bg-[#F3F4F6] overflow-hidden relative h-fit w-full  mx-0 py-12 pb-0 rounded-xl">
                <div className="flex flex-col gap-4 items-center h-full md:h-auto justify-between ">
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
                      setSelectedOption={setSelecteInstallation}
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
                  <div className="w-full max-h-[400px]">
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
            </div>
          )} */}

          {verified && devices.length > 0 && (
            <Link
              href="/sign-up?isRegisterDevice=true"
              onClick={() => updateOrderDetails()}
              className="max-w-[800px] w-full active:scale-95 text-center bg-gradient-to-r from-[#A2CDB9] to-[#5BAE87] text-white text-[18px] px-8 py-3 rounded-[15px]"
            >
              Next
            </Link>
          )}

          <div className="flex items-center gap-1">
            <p className="text-[18px] text-center text-[#6C7482]">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="text-[#70B896] font-semibold text-[18px] hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      }
    </>
  );
};

export default DeviceInfo;
