"use client";
import { Button, Heading, Img, Text } from "@/components";
import BillingStatus from "@/components/BillingStatus";
import { useAuth } from "@/context/AuthContext";
import PaymentMethod from "@/modals/PaymentMethod";
import { useUserService } from "@/services/userService"; // Import the user service
import { Suspense, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PaymentMethodCard from "./PaymentMethodCard";
import UnsubscribeModal from "@/components/BillingStatus/unsubcribeModal";
import RenewModal from "@/components/BillingStatus/renewModal";

function Page() {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isUnsubscribedModal, setIsUnsubscribedModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState(null); // State
  const { setEmail, email, customerMail, country } = useAuth();

  const {
    getTransactionDetails,
    subscriptionDetails,
    getCustomerId,
    getAllPaymentMethod,
    renewSubscription,
    getFirstOrderStatus,
    getProducts,
    createStripeSession,
  } = useUserService();
  const [subscriptionDetail, setSubscriptionDetail] = useState(null);
  const [isUnsubscribed, setIsUnsubscribed] = useState(true); // State to track subscription status
  const [isRenew, setIsRenew] = useState(false); // State to track subscription status
  const [customerID, setCustomerID] = useState("");
  const [renewData, setRenewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentInstallationStatus, setCurrentInstallationStatus] =
    useState(null); // State to track subscription status
  const [products, setProducts] = useState([]);

  const handleAddressModalToggle = (isOpen) => {
    setIsAddressModalOpen(isOpen);
  };

  const fetchTransactionDetails = async () => {
    if (!customerMail) return;
    let stripeCustomerId;
    try {
      const customerData = await getCustomerId(customerMail);
      stripeCustomerId = customerData.id;
      setCustomerID(stripeCustomerId);
      if (stripeCustomerId) {
        const details = await getTransactionDetails(stripeCustomerId);

        setTransactionDetails(details);
      }
    } catch (error) {
      console.error("Failed to fetch transaction details:", error);
    }
  };

  const fetchSubscriptionDetails = async () => {
    setLoading(true);

    try {
      let subscriptionId = null;
      if (typeof window !== "undefined") {
        subscriptionId = window.localStorage.getItem("subscription_id");
      }

      if (!subscriptionId) {
        console.warn("No subscription ID found in localStorage");
        setLoading(false);
        return;
      }

      const details = await subscriptionDetails(subscriptionId);
      setSubscriptionDetail(details);
      setIsUnsubscribed(details?.status === "canceled");
    } catch (error) {
      console.error("Failed to fetch subscription details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    if (!customerMail) return;
    try {
      const customerData = await getCustomerId(customerMail);
      const stripeCustomerId = customerData.id;
      if (stripeCustomerId) {
        const details = await getAllPaymentMethod(stripeCustomerId);

        if (details) {
          const formattedPaymentMethods = details.map((method) => ({
            id: method.id,
            card: {
              brand: method.card.brand,
              last4: method.card.last4,
              exp_month: method.card.exp_month,
              exp_year: method.card.exp_year,
            },
            customer: method.customer,
            billing_details: method.billing_details,
            isDefault: method.isDefault,
          }));

          setPaymentMethods(formattedPaymentMethods);
        } else {
          console.error("Payment methods should be an array", details);
          setPaymentMethods([]);
        }
      }
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      setPaymentMethods([]);
    }
  };
  const fetchFirstOrderStatus = async () => {
    const getFirstOrder = await getFirstOrderStatus();
    if (getFirstOrder) {
      setCurrentInstallationStatus(getFirstOrder[0]?.installation_status);
    }
  };

  useEffect(() => {
    if (email) {
      fetchTransactionDetails();
    }
    fetchFirstOrderStatus();
    fetchSubscriptionDetails();
    fetchPaymentMethods();
  }, [email]); // Ensure email is loaing

  const handleUnsubscribe = () => {
    setIsUnsubscribedModal(isUnsubscribed === true ? false : true);
    if (isUnsubscribed) {
      renewProccess();
      setIsRenew(true);
    }
  };
  const renewProccess = async () => {
    const products = await getProducts();
    console.log(products);
    const priceId = products?.filter(
      (product) =>
        product.isRecurring &&
        product.currency === (country === "au" ? "aud" : "usd")
    )[0].priceId;
    setRenewData({
      customerId: customerID,
      priceId: priceId,
    });
  };
  if (loading) {
    return (
      <div className="w-full mb-6 h-full flex items-center justify-center">
        <Text
          size="text-lg"
          className="text-center flex flex-col items-center gap-2"
        >
          <div className="w-5 h-5 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          Subscription details are loading...
        </Text>
      </div>
    );
  }
  return (
    <div className="w-full mb-6">
      <PaymentMethod
        isOpen={isAddressModalOpen}
        onChange={handleAddressModalToggle}
      />
      {/* Edit Profile Card */}
      <Tabs
        className="flex flex-1 flex-col gap-[2.50rem] self-center md:self-stretch cursor-pointer"
        selectedTabClassName="!text-text bg-gray-100 rounded-[18px]"
        selectedTabPanelClassName="!relative tab-panel--selected"
      >
        <div className="flex flex-col gap-2 self-stretch border-b border-border pb-4 md:items-center ">
          <Heading
            size="text3xl"
            as="h6"
            className="text-[1.8rem] font-medium text-[#1d293f] md:text-[1.55rem]"
          >
            Billing Information
          </Heading>
          <Text
            as="p"
            className="text-lg font-normal leading-6 text-[#6c7482] md:text-center"
          >
            Update your email and manage your account
          </Text>
        </div>
        {/* Tabs List */}
        <TabList className="flex gap-4 md:gap-1 text-[#6c7482] w-[34.37rem] md:w-full sm:text-[0.8rem] md:items-center md:justify-center">
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] sm:text-[0.8rem] font-normal text-[#6c7482]">
            Overview
          </Tab>
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] sm:text-[0.8rem] font-normal">
            History
          </Tab>
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] sm:text-[0.8rem] font-normal">
            Payment Methods
          </Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanel className="absolute items-center md:justify-center md:items-center ">
          <div className="w-full">
            <div className="flex flex-col gap-4 pb-10">
              {/* Billing Overview */}
              <div className="flex flex-col items-start gap-1 md:items-center">
                <Heading
                  as="p"
                  className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
                >
                  Seenyor <span className="text-primary">Pro</span>
                </Heading>
                <Text
                  as="p"
                  className="text-[1.13rem] font-normal text-[#6c7482]"
                >
                  Subscription Status:{" "}
                  <span
                    className={`font-medium capitalize ${
                      subscriptionDetail?.status !== "canceled"
                        ? "text-primary"
                        : "text-[#FF0000]"
                    }`}
                  >
                    {/* {!isUnsubscribed ? "Active" : "Inactive"} */}
                    {subscriptionDetail?.status === "trialing" &&
                    currentInstallationStatus !== "completed" ? (
                      <span className="text-orange-300">
                        Installation Pending
                      </span>
                    ) : subscriptionDetail?.status === "trialing" ? (
                      "Active"
                    ) : (
                      subscriptionDetail?.status
                    )}
                  </span>
                </Text>
                <Text
                  as="p"
                  className="text-[1.13rem] font-normal text-[#6c7482]"
                >
                  Billing Amount:{" "}
                  <span className="font-medium capitalize text-[#1d293f]">
                    $
                    {subscriptionDetail?.items?.data[0]?.plan
                      ? `${
                          subscriptionDetail?.items?.data[0]?.plan?.amount / 100
                        }`
                      : "... ..."}{" "}
                    <span className="uppercase">
                      {subscriptionDetail?.items?.data[0]?.plan
                        ? `${subscriptionDetail?.items?.data[0]?.plan?.currency}/`
                        : "... ..."}
                    </span>
                    {subscriptionDetail?.items?.data[0]?.plan?.interval}
                  </span>
                </Text>
              </div>

              {/* Cancel Subscription */}
              {/* {!isUnsubscribed ? (
                <div className="flex items-center justify-between gap-[1.25rem] rounded-[14px] bg-orange-50 px-[1.13rem] py-[0.88rem] md:flex-col ">
                  <div className="flex w-full flex-col items-start md:w-full md:items-center md:text-center">
                    <Heading
                      size="headingmd"
                      as="h6"
                      className="text-[1.19rem] font-semibold !text-[#f6ac00]"
                    >
                      Cancel Subscription
                    </Heading>
                    <Text
                      as="p"
                      className="w-full text-[0.88rem] font-normal leading-[1.31rem] text-[#6c7482]"
                    >
                      Once you cancel a subscription, you can renew it anytime
                      later.
                    </Text>
                  </div>
                  <Button
                    variant="fill"
                    shape="round"
                    onClick={handleUnsubscribe}
                    className="min-w-[9.88rem] rounded-[14px] px-[1.75rem] text-white font-semibold sm:px-[1.25rem] bg-amber-a700"
                  >
                    Unsubscribe
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-[1.25rem] rounded-[14px] bg-red-50 px-[1.13rem] py-[0.88rem] md:flex-col">
                  <div className="flex w-full flex-col items-start md:w-full md:items-center md:text-center">
                    <Heading
                      size="headingmd"
                      as="h6"
                      className="text-[1.19rem] font-semibold !text-[#FF0000]" // Changed text color to red
                    >
                      Renew Subscription
                    </Heading>
                    <Text
                      as="p"
                      className="w-full text-[0.88rem] font-normal leading-[1.31rem] text-[#6c7482]"
                    >
                      Your subscription has expired. Renew it now to avoid any
                      service interruptions.
                    </Text>
                  </div>
                  <Button
                    variant="fill"
                    shape="round"
                    onClick={handleUnsubscribe}
                    className="min-w-[6.88rem] rounded-[14px] px-[1.75rem] text-white font-semibold sm:px-[1.25rem] bg-[#FF0000]" // Changed button color to red
                  >
                    Renew
                  </Button>
                </div>
              )} */}
              {/* Billing Date */}
              {(subscriptionDetail?.status === "trialing" &&
                currentInstallationStatus !== "completed") ||
              subscriptionDetail?.status === "canceled" ? (
                <></>
              ) : (
                <Text
                  as="p"
                  className="text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] md:text-center "
                >
                  Your service will renew on{" "}
                  <span className="font-medium text-[#1d293f]">
                    {subscriptionDetail?.current_period_end
                      ? new Date(
                          subscriptionDetail.current_period_end * 1000
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "N/A"}
                  </span>{" "}
                  for
                  <span className="font-medium text-[#1d293f]">
                    {" "}
                    {""}$
                    {subscriptionDetail?.items?.data[0]?.plan?.amount
                      ? subscriptionDetail?.items?.data[0]?.plan?.amount / 100
                      : "... .."}{" "}
                    <span className="uppercase">
                      {subscriptionDetail?.items?.data[0]?.plan
                        ? `${subscriptionDetail?.items?.data[0]?.plan?.currency}`
                        : "... ..."}
                    </span>
                  </span>
                  . Renewal price includes applicable taxes.
                </Text>
              )}
            </div>
            <div className="flex flex-col items-start gap-[0.63rem] pb-10 md:items-center">
              <Heading
                size="text2xl"
                as="p"
                className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38]"
              >
                Billing Information
              </Heading>
              {paymentMethods?.filter((item) => item.isDefault)[0]?.card
                .last4 ? (
                <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
                  <Text
                    as="p"
                    className="text-[1.13rem] font-normal text-[#1d293f]  md:text-center "
                  >
                    Your upcoming charges will be billed to the card{" "}
                    <b>
                      {
                        paymentMethods?.filter((item) => item.isDefault)[0]
                          ?.card.last4
                      }
                    </b>
                  </Text>{" "}
                </div>
              ) : (
                <Text
                  as="p"
                  className="text-[1.13rem] font-normal text-[#1d293f]  md:text-center "
                >
                  You have not added any payment method yet.
                </Text>
              )}
            </div>
          </div>
          {/* <UnsubscribeModal
            isOpen={isUnsubscribedModal}
            onOpenChange={setIsUnsubscribedModal}
            subscriptionDetails={subscriptionDetail?.id}
          /> */}
          {/* <RenewModal
            isOpen={isRenew}
            onOpenChange={setIsRenew}
            renewDetails={renewData}
          /> */}
        </TabPanel>
        <TabPanel className="absolute items-center">
          <BillingStatus transactionDetails={transactionDetails} />{" "}
          {/* Pass transaction details */}
        </TabPanel>

        <TabPanel className="absolute items-center w-[34.37rem] md:w-full">
          <div className="w-full">
            <div className="flex flex-col gap-[1.25rem]">
              <div className="flex items-center md:flex-col justify-between gap-[1.25rem]">
                <Heading
                  size="text2xl"
                  as="p"
                  className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
                >
                  Added Methods ({paymentMethods.length})
                </Heading>

                <Button
                  shape="round"
                  variant="fill"
                  onClick={() => handleAddressModalToggle(true)}
                  leftIcon={
                    <Img
                      src="plus.svg"
                      width={24}
                      height={24}
                      alt="Frame"
                      className="h-[1.50rem] w-[1.50rem]"
                    />
                  }
                  className="min-w-[14.63rem] gap-[1.00rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem] bg-[#f1f8f5] text-primary"
                >
                  Add New Method
                </Button>
              </div>

              <div className="flex flex-col gap-[0.75rem]">
                <Suspense fallback={<div>Loading...</div>}>
                  {paymentMethods.length > 0 ? (
                    paymentMethods
                      .sort((a, b) => b.isDefault - a.isDefault) // Sort by isDefault (true first)
                      .map((method) => (
                        <PaymentMethodCard
                          key={method.id}
                          id={method.id}
                          card={method.card}
                          billing_details={method.billing_details}
                          isDefault={method.isDefault}
                          customerId={method.customer}
                          onDelete={() => {}}
                          className="bg-gray-100"
                        />
                      ))
                  ) : (
                    <div>No payment methods found.</div>
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Page;
