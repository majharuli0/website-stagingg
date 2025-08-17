"use client";

import React, { useEffect, useState } from "react";
import Loader from "@/components/SystemBuild/Loader";
import Link from "next/link";
import DeviceCard from "@/components/SystemBuild/DeviceCard";
import AddLoader from "./AddLodder";
import AddDeviceCard from "./AddDeviceCard";
import { useUserService } from "@/services/userService";
import { toast } from "react-toastify";
import { Button } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { Cross, X } from "lucide-react";
const AddDevice = () => {
  const [deviceUid, setDeviceUid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { email, userDetails, fetchUserDetails } = useAuth();
  const [devices, setDevices] = useState(userDetails?.uids || []);
  const [user, serUser] = useState([]);
  const [storedDevices, setStoredDevices] = useState([]);
  const [emailValid, setEmailValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const { getUserDetailsById, chnageDeviceStatus, getDeviceDetails } =
    useUserService();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deviceUid.trim()) {
      setErrorMessage("Please enter your Device UID.");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
    }, 2000);
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setIsEmpty(value.trim() === "");
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const devices = localStorage.getItem("devices");
      if (devices) setStoredDevices(JSON.parse(devices));
    }
  }, []);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (deviceUid.length !== 12) {
      toast.error("Device UID must be exactly 12 characters long.");
      return;
    }

    if (
      userDetails?.uids?.includes(deviceUid) ||
      storedDevices.includes(deviceUid)
    ) {
      toast.error("This Device UID has already been added.");
      return;
    }

    setLoading(true);

    try {
      const response = await getDeviceDetails(deviceUid);
      const data = response;
      if (data.is_active === true || data.message === "Device not found") {
        toast.error("Device UID is not valid.");
        // setLoading(false);
        return;
      } else {
        const chnageStatus = chnageDeviceStatus({
          uids: [deviceUid],
          email: userDetails?.email,
          is_active: true,
        });
        toast.success("Device Added Successfully!");
        setDevices((prevDevices) => [...prevDevices, deviceUid]);
        setDeviceUid("");
      }
    } catch (error) {
      console.error("Error fetching device details:", error);
      toast.error(error?.message || "Failed to fetch device details.");
    } finally {
      setLoading(false);
      setDeviceUid("");
      fetchUserDetails();
      // window.location.reload();
    }
  };

  return (
    <>
      <div className="font-poppins text-[#1D293F] w-full items-start justify-center flex  md:w-full flex-col gap-[60px] md:mt-0">
        <AddDeviceCard uids={devices} />
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowPopup(true);
          }}
          className="w-full active:scale-95 text-center bg-gradient-to-r from-[#A2CDB9] to-[#5BAE87] text-white text-[18px] px-8 py-3 rounded-[15px]"
        >
          Add a new Device
        </Link>

        {showPopup && (
          <div className="fixed inset-0 flex w-full px-4 h-screen z-50 items-center justify-center bg-[#00000021]">
            <div className="bg-white p-6 rounded-[14px] max-w-[635px] w-full py-10 relative">
              <button
                onClick={() => setShowPopup(false)}
                className="text-[#A39C9C] w-fit font-sans text-end absolute top-4 right-4"
              >
                <X />
              </button>
              <h2 className="text-[28px] font-bold text-[#1D293F] mb-4 ml-0">
                Verify your device
              </h2>
              <label htmlFor="uid" className="text-lg font-semibold mb-3">
                Device UID
              </label>
              <div className="flex gap-4 items-start justify-start w-full">
                <div>
                  <input
                    type="email"
                    placeholder="ex: 4678469JDUE7DBFE8N"
                    className="w-[435px] md:w-full text-[#1D293F] h-[60px] text-[20px] p-3 border border-gray-300 border-solid rounded-xl"
                    value={deviceUid}
                    onChange={(e) => setDeviceUid(e.target.value)}
                  />
                  {/* {isEmpty && (
                      <p className="text-red-500 text-sm mb-4 w-full">
                        Email cannot be empty. Please enter your email.
                      </p>
                    )}
                    {!isEmpty && !emailValid && (
                      <p className="text-red-500 text-sm mb-4 w-full">
                        Please enter a valid email address.
                      </p>
                    )} */}
                </div>
                <Button
                  onClick={handleContinue}
                  disabled={isEmpty || !emailValid}
                  type="submit"
                  shape="round"
                  color="green_200_green_400_01"
                  className="w-full rounded-[14px] px-[2.13rem] font-semibold h-[60px]"
                  loading={loading}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddDevice;
