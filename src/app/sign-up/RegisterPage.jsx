"use client";
import SingUpOpt from "@/components/SingUpOpt";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Heading, Input, Text } from "@/components";
import { useUserService } from "@/services/userService";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../schema";
import AuthFormTemplate from "@/components/ui/formTemplate";
const liveWith = [
  { label: "Alone", value: "0" },
  { label: "With Someone", value: "0" },
];
const SourceofLeads = [
  { label: "Sales Agent", value: "sales_agent" },
  { label: "Distributor", value: "distributor" },
  { label: "Monitoring Station", value: "monitoring_station" },
  { label: "Installer", value: "installer" },
  { label: "Nursing Home", value: "nursing_home" },
];

const Checkbox = ({ checked, onChange, disabled, id, label, isLoading }) => (
  <div key={id} className="flex gap-2 items-center">
    <div
      onClick={!isLoading && !disabled ? onChange : undefined}
      className={`flex items-center justify-center !h-6 !w-6 border-2 rounded-md transition-colors duration-300 
        ${
          checked ? "bg-primary border-transparent" : "bg-white border-gray-300"
        } 
        ${
          disabled || isLoading
            ? "opacity-80 bg-slate-200 cursor-not-allowed"
            : "cursor-pointer"
        }`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
          ></path>
        </svg>
      ) : (
        checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )
      )}
    </div>
    <p
      onClick={!isLoading && !disabled ? onChange : undefined}
      className="text-body text-slate-600 select-none"
    >
      {label}
    </p>
  </div>
);

const SelectBox = forwardRef(
  (
    {
      name,
      placeholder,
      options = [],
      onChange,
      className,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    useEffect(() => {
      setSelectedValue(defaultValue);
    }, [defaultValue]);

    const handleChange = (e) => {
      const value = e.target.value;
      setSelectedValue(value);
      onChange(e);
    };

    return (
      <select
        key={ref}
        ref={ref}
        name={name}
        onChange={handleChange}
        className={className}
        value={selectedValue}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {Array.isArray(options) &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    );
  }
);

SelectBox.displayName = "SelectBox";
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    setValue,
    setError,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    registerUser,
    verifyOtp,
    resendOtp,
    getCountries,
    getAgents,
    getDefualtAgentID,
    getStripeCustomerId,
    createStripeSession,
  } = useUserService();

  const [countries, setCountries] = useState([]);
  const [countriesForCode, setCountriesForCode] = useState([]);
  const [agents, setAgents] = useState([]);
  const { setEmail, email, user } = useAuth();
  const [error, setError2] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [useCustomerAddress, setUseCustomerAddress] = useState(false);
  const [isAgentDisabled, setIsAgentDisabled] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [isRegisterDeviceExist, setIsRegisterDeviceExist] = useState();
  const [agentID, setAgentID] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAgentLoading, setIsAgentLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesResponse = await getCountries();

        if (
          countriesResponse &&
          countriesResponse.data &&
          Array.isArray(countriesResponse.data)
        ) {
          const formattedCountries = countriesResponse.data.map((country) => ({
            label: country.country_name,
            value: country._id,
          }));
          const formattedCountriesCode = countriesResponse.data.map(
            (country, ind) => ({
              id: ind,
              label: country.country_name,
              value: country.country_code,
            })
          );
          setCountriesForCode(formattedCountriesCode);
          const tempAUS = formattedCountries.filter(
            (i) => i.value === "682f6cca2c67829ed16d85eb"
          );
          setCountries(formattedCountries);
          console.log("Formatted countries:", formattedCountriesCode);
        } else {
          console.error("Invalid country data structure:", countriesResponse);
          throw new Error(
            "Invalid country data structure received from the API"
          );
        }

        // Fetch agents
        // console.log("Fetching agents...");
        // const agentsResponse = await getAgents();
        // console.log("Agents response:", agentsResponse);

        // if (
        //   agentsResponse &&
        //   agentsResponse.data &&
        //   Array.isArray(agentsResponse.data)
        // ) {
        //   const formattedAgents = agentsResponse.data.map((agent) => ({
        //     label: `${agent.agent_id}`,
        //     value: agent.agent_id,
        //   }));
        //   setAgents(formattedAgents);
        //   console.log("Formatted agents:", formattedAgents);
        // } else {
        //   console.error("Invalid agent data structure:", agentsResponse);
        //   throw new Error("Invalid agent data structure received from the API");
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        }
        console.log("Failed to load necessary data. Please try again.");
      }
    };
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    setOrderDetails(orderDetails);
    // if (orderDetails) {
    //   setOrderDetails(JSON.parse(orderDetails));
    // }
    fetchData();
  }, []);

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }
    if (password.length < 8) {
      setPasswordStrength("Weak (minimum 8 characters)");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  // Update password strength on password change
  useEffect(() => {
    const subscription = watch((value) => {
      checkPasswordStrength(value.password);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  // Fetch country data
  useEffect(() => {
    fetch("/countryData.json")
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
      })
      .catch((error) => console.error("Error loading country data:", error));
  }, []);

  useEffect(() => {
    setIsRegisterDeviceExist(localStorage.getItem("devices"));
    if (searchParams.get("isRegisterDevice") === "true") {
      // URL has isRegisterDevice=true, show the checkbox
      setIsAgentDisabled(false); // Allow the fields to be editable initially
    }
  }, [searchParams]);
  const handleCheckboxChange = async (e) => {
    // Get devices from localStorage
    const devicesUID = JSON.parse(localStorage.getItem("devices")) || [];
    if (isAgentDisabled) {
      setIsAgentDisabled(!isAgentDisabled);
      return;
    }
    try {
      // If no devices, log error and return
      if (!devicesUID || devicesUID.length === 0) {
        console.error("No devices found in localStorage");
        return;
      }
      setIsAgentLoading(true);
      // Fetch agent ID for each device using getDefualtAgentID
      const agentIds = await Promise.all(
        devicesUID.map(async (deviceUID) => {
          try {
            const response = await getDefualtAgentID(deviceUID);
            return response.agent_id; // Assuming response is { agent_id: "68244c3ce24c70c34f866442" }
          } catch (error) {
            console.error(
              `Failed to fetch agent ID for device ${deviceUID}:`,
              error
            );
            return null;
          }
        })
      );

      // Filter out any null responses (failed API calls)
      const validAgentIds = agentIds.filter((id) => id !== null);

      // Check if all valid agent IDs are the same
      const allSameAgent =
        validAgentIds.length > 0 &&
        validAgentIds.every((id) => id === validAgentIds[0]);

      if (!allSameAgent) {
        console.error(
          "Failed to toggle agent ID field: Devices are not under the same distributor. " +
            "Please verify the devices or contact your senior."
        );
        toast.error(
          "Devices are not from the same distributor. Please verify that the devices are from the same distributor or contact support."
        );
        return;
      }

      const agentID = await getDefualtAgentID(devicesUID[0]);
      setAgentID(agentID.agent_id);
      setValue("agent_id", agentID.agent_id);
      setError("agent_id", null);
      setIsAgentDisabled(!isAgentDisabled);
    } catch (error) {
      console.error("Error in handleCheckboxChange:", error);
    } finally {
      setIsAgentLoading(false);
    }
  };
  const onSubmit = async (data) => {
    // // Perform client-side validation
    // const validationErrors = validateForm(data);
    // if (Object.keys(validationErrors).length > 0) {
    //   // Set errors in the form
    //   Object.keys(validationErrors).forEach(key => {
    //     setError(key, {
    //       type: "manual",
    //       message: validationErrors[key]
    //     });
    //   });
    //   return; // Stop submission if there are validation errors
    // }
    // Check if password is at least 6 characters long

    const formattedData = {
      agent_id: isAgentDisabled ? agentID : data.agent_id,
      email: data.customer_email,
      name: data.customer_first_name,
      last_name: data.customer_last_name,
      address: data.customer_address,
      address2: data.customer_address_2,
      city: data.customer_city,
      // country_id: "682f6cca2c67829ed16d85eb",
      country_id: data.customer_country_id,
      post_Code: data.customer_zipcode,
      state: data.customer_state,
      // contact_code: "+61",
      contact_code: data.country_code?.split("_")[0],
      contact_number: data.contact_number,
      password: data.password,
      customer_info: {
        // country_id: "682f6cca2c67829ed16d85eb",
        // country_id: data.installation_country_id,
        address: data.customer_address,
        address2: data.customer_address_2,
        city: data.customer_city,
        // country_id: "682f6cca2c67829ed16d85eb",
        country_id: data.customer_country_id,
        post_Code: data.customer_zipcode,
        state: data.customer_state,
        contact_number: data.contact_number,
        installation_date: data.installation_date || null,
        // contact_code: "+61",
        contact_code: data.country_code?.split("_")[0],
        elderly_Count: data.live_with === "alone" ? 1 : 2,
        lead: data.source_lead,
        // installer_id: , // Using customer's country_id as installer_id for now
      },
    };
    // const formattedData = {
    //   agent_id: isAgentDisabled ? agentID : data.agent_id,
    //   email: data.customer_email,
    //   name: data.customer_first_name,
    //   last_name: data.customer_last_name,
    //   address: data.customer_address,
    //   address2: data.customer_address_2,
    //   city: data.customer_city,
    //   country_id: data.customer_country_id,
    //   post_Code: data.customer_zipcode,
    //   state: data.customer_state,
    //   contact_code: data.country_code,
    //   contact_number: data.customer_contact_number,
    //   password: data.password,
    //   customer_info: {
    //     country_id: data.installation_country_id,
    //     address: data.installation_address,
    //     address2: data.installation_address_2,
    //     city: data.installation_city,
    //     contact_number: data.customer_contact_number,
    //     contact_code: data.country_code,
    //     post_Code: data.installation_zipcode,
    //     state: data.installation_state,
    //     installation_date: data.installation_date || null,
    //     elderly_Count: data.live_with === "alone" ? 1 : 2, // Assuming "alone" means 1, otherwise 2
    //     lead: data.source_lead,
    //     // installer_id: , // Using customer's country_id as installer_id for now
    //   },
    // };
    localStorage.setItem(
      "agent_details",
      JSON.stringify({
        agent_id: formattedData.agent_id,
        agent_name: formattedData.customer_info.agent_name,
      })
    );
    localStorage.setItem(
      "installation_details",
      JSON.stringify({
        installation_date: formattedData?.customer_info?.installation_date,
        address: formattedData?.customer_info?.address,
        address2: formattedData?.customer_info?.address2,
        city: formattedData?.customer_info?.city,
        country: formattedData?.customer_info?.country_id,
        postal_code: formattedData?.customer_info?.post_Code,
        state: formattedData?.customer_info?.state,
      })
    );
    setLoading(true);
    try {
      const response = await registerUser(formattedData);
      // Check if user registration was successful

      if (!response || !response.status) {
        throw new Error(response.message || "User registration failed.");
      }
      if (response.status) {
        setEmail(formattedData.email);
        localStorage.setItem(
          "user_credentials",
          JSON.stringify({
            email: formattedData.email,
            password: formattedData.password,
          })
        );
        setIsOtpSent(true);
      } else {
        console.error(
          response.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      // console.log(err);
      // if (err?.errorResponse?.keyValue) {
      //   let key = Object.keys(err.errorResponse.keyValue)[0];
      //   setError(
      //     key === "contact_number"
      //       ? "Phone Number Already Exist!"
      //       : key === "email"
      //       ? "E-mail Address Already Exist!"
      //       : ""
      //   );
      // }

      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((err) => {
          const field = err.property;
          const errorMessage =
            Object.values(err.message)?.[0] || "Invalid value";

          setError(field, {
            type: "server",
            message: errorMessage,
          });
        });
      }
      if (err?.message)
        console.log(err?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (otp) => {
    setLoading2(true);
    try {
      const response = await verifyOtp({
        email,
        otp: otp,
      });
      if (response.status) {
        localStorage.setItem("isUserVerified", JSON.stringify(true));
        toast.success(response?.message || "OTP Verified Successfully!");
        // router.push("/payment");
        await processPayment();
      } else {
        console.error(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      console.log(err?.message || "An error occurred during OTP verification");
    } finally {
      setLoading2(false);
    }
  };
  const processPayment = async () => {
    const stripeCustomerId = await getStripeCustomerId();
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (!stripeCustomerId) {
      router.push("/sign-up");
      return;
    }
    if (
      !orderDetails ||
      !orderDetails.products ||
      orderDetails.products.length === 0
    ) {
      toast.error("No products found in order details. Please try again.");
      // router.push("/get-started");
      return;
    }
    try {
      setIsProcessing(true);

      const user_credentials = JSON.parse(
        localStorage.getItem("user_credentials")
      );
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
      const session = await createStripeSession({
        customer: stripeCustomerId,
        line_items: lineItems,
        return_url: returnURL,
        sessionMode: "payment",
        email: user_credentials?.email,
        // success_url: successUrl,
        // cancel_url: cancelUrl,
      });

      // Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error("Error processing payment:", error);
      setIsProcessing(false);
    }
  };
  const handleResendOtp = async () => {
    console.log("resend OTP");
    try {
      const response = await resendOtp({
        email,
      });
    } catch (err) {
      console.log(err.message || "An error occurred while resending OTP");
    }
  };

  if (isOtpSent && !isOtpVerified) {
    return (
      <SingUpOpt
        setIsOtpPageOpen={setIsOtpSent}
        email={email}
        onVerify={handleOtpVerification}
        onResend={handleResendOtp}
        error={error}
        setError={setError2}
        isPaymentSessionProcessing={isProcessing}
        loading={loading2}
      />
    );
  }
  const handleUseCustomerAddressChange = (e) => {
    console.log(e);

    setUseCustomerAddress(!useCustomerAddress);

    if (!useCustomerAddress) {
      setValue("installation_address", watch("customer_address"));
      setValue("installation_address_2", watch("customer_address_2"));
      setValue("installation_city", watch("customer_city"));
      setValue("installation_country_id", watch("customer_country_id"));
      setValue("installation_zipcode", watch("customer_zipcode"));
      setValue("installation_state", watch("customer_state"));
    } else {
      setValue("installation_address", "");
      setValue("installation_address_2", "");
      setValue("installation_city", "");
      setValue("installation_country_id", "");
      setValue("installation_zipcode", "");
      setValue("installation_state", "");
    }
  };
  // Watch the password field for validation in confirm password
  const renderField = ({
    label,
    name,
    type,
    placeholder,
    options,
    required = true,
    customErrorMessage,
    isDisabled,
    validate,
  }) => {
    const value = watch(name);
    console.log(value);

    return (
      <div className="w-full flex flex-col items-start gap-[0.25rem] self-stretch">
        <Heading
          size="headingmd"
          as="h6"
          className="text-[1.13rem] font-semibold capitalize text-text"
        >
          {label}{" "}
          {/* {!required && type !== "country_code" && (
          <span className="text-sm font-normal italic">(optional)</span>
        )} */}
        </Heading>
        {name === "country_code" && type === "select" ? (
          // Phone number input with country code selection
          <SelectBox
            name={name}
            placeholder={placeholder}
            options={countriesForCode.map((country) => ({
              value: `${country.value}_${country.label}`,
              label: `${country.label} (${country.value})`,
            }))}
            {...register(name, { required })}
            onChange={(e) => {
              const code = e.target.value.split("_");
              setValue(name, code[0]);
              trigger(name);
            }}
            // defaultValue={"+61"}
            className="w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem] bg-white"
          />
        ) : type === "select" ? (
          <SelectBox
            name={name}
            placeholder={placeholder}
            options={
              name === "badge_id"
                ? agents
                : name.includes("country")
                ? countries
                : options
            }
            {...register(name, { required })}
            // value={"682f6cca2c67829ed16d85eb"}
            onChange={(e) => {
              setValue(name, e.target.value);
              trigger(name);
            }}
            className="w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem] bg-white"
          />
        ) : (
          <Input
            type={type}
            name={name}
            disabled={isDisabled}
            placeholder={placeholder}
            {...register(name, { required, validate })}
            className={`w-full rounded-[12px] !border px-[1.63rem] capitalize !text-text sm:px-[1.25rem] bg-white disabled:bg-red-300 ${
              type === "date" ? "!text-slate-500" : ""
            }`}
          />
        )}

        {errors[name] && (
          <p className="text-red-500 text-xs">{errors[name]?.message}</p>
        )}
      </div>
    );
  };

  return (
    <>
      <AuthFormTemplate
        title="Sign Up to Seenyor"
        description="To create your account, please fill in the required information."
        isBack={true}
        backButtonText="Back"
        maxwidth="800px"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          // className=" md:min-h-screen mb-[9.75rem] mt-[2rem] flex flex-1 flex-col items-center gap-[2.25rem] px-[3.50rem] md:self-stretch md:px-[1.25rem] sm:overflow-x-hidden custom-scrollbar "
        >
          {/* <div className="flex flex-col gap-[1.88rem] max-w-[800px] w-full">
            <div className="flex w-full flex-col items-center justify-center gap-[0.50rem] md:w-full">
              <Heading
                size="heading7xl"
                as="h1"
                className="text-[2.13rem] font-bold text-text md:text-[2.00rem] sm:text-[1.88rem]"
              >
                Sign Up to Seenyor
              </Heading>
            </div> */}

          <div className="flex w-full flex-col items-center justify-center gap-[3.25rem] md:w-full sm:gap-[1.63rem] ">
            <div className="flex flex-col items-center self-stretch gap-0">
              {/* <============= Agent Name and Badge ID - S.4 ==============> */}
              <div className="w-full pb-8">
                {renderField({
                  label: "Agent ID",
                  name: "agent_id",
                  type: "text",
                  placeholder: "Enter your agent ID",
                  required: isAgentDisabled ? false : true,
                  isDisabled: isAgentDisabled,
                })}

                {searchParams.get("isRegisterDevice") === "true" &&
                  isRegisterDeviceExist &&
                  isRegisterDeviceExist.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <Checkbox
                        checked={isAgentDisabled}
                        onChange={handleCheckboxChange}
                        id="isAgentDisable"
                        label="I do not have agent ID at the moment"
                        className="text-gray-700 text-sm"
                        isLoading={isAgentLoading}
                      />
                    </div>
                  )}
              </div>
              {/* <============= Customer Information Fields - S.1 ==============> */}
              <div className=" w-full border-t pt-8 border-gray-300 pb-8">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {renderField({
                      label: "First Name",
                      name: "customer_first_name",
                      type: "text",
                      placeholder: "First name",
                    })}
                    {renderField({
                      label: "Last Name",
                      name: "customer_last_name",
                      type: "text",
                      placeholder: "Last name",
                    })}
                  </div>

                  {/* Email */}
                  {renderField({
                    label: "Email Address",
                    name: "customer_email",
                    type: "email",
                    placeholder: "Enter your email address",
                  })}
                  {/* Country Code + Phone Number Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      {renderField({
                        label: "Country Code",
                        name: "country_code",
                        type: "select",
                        placeholder: "Select Code",
                        options: countries,
                        required: false,
                      })}
                    </div>
                    <div className="col-span-2">
                      {renderField({
                        label: "Phone Number",
                        name: "contact_number",
                        type: "number",
                        placeholder: "Enter phone number",
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" w-full border-t pt-8 border-gray-300 pb-8">
                <div className="space-y-4">
                  {/* Address Line 1 */}
                  {renderField({
                    label: "Address",
                    name: "customer_address",
                    type: "text",
                    placeholder: "Street address",
                  })}

                  {/* Address Line 2 */}
                  {renderField({
                    label: "Address Line 2",
                    name: "customer_address_2",
                    type: "text",
                    required: false,
                    placeholder: "Apartment, suite, etc. (optional)",
                  })}

                  {/* Country + City Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {renderField({
                      label: "Country",
                      name: "customer_country_id",
                      type: "select",
                      placeholder: "Select country",
                      options: countries,
                      required: false,
                    })}
                    {renderField({
                      label: "City",
                      name: "customer_city",
                      type: "text",
                      placeholder: "City",
                    })}
                  </div>

                  {/* Zip Code + State Row */}
                  <div className="grid grid-cols-2 gap-3">
                    {renderField({
                      label: "Zip Code",
                      name: "customer_zipcode",
                      type: "text",
                      placeholder: "Zip code",
                    })}
                    {renderField({
                      label: "State",
                      name: "customer_state",
                      type: "text",
                      placeholder: "State",
                    })}
                  </div>
                </div>
              </div>
              {/* <============= Installation Addresses Fields - S.2 ==============> */}
              {/* <div
                id="EndUser_info"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div>
                  <Heading size="heading3xl" as="h2">
                    Installation Information
                  </Heading>
                  <Text
                    as="p"
                    className="w-[76%] text-[1rem] font-normal capitalize leading-[1.69rem] text-body md:w-full text-slate-500"
                  >
                    Information about The Installation and Installation address
                  </Text>
                </div>
                <div className="flex items-center gap-2 w-full mb-4 ">
                  <Checkbox
                    checked={useCustomerAddress}
                    onChange={handleUseCustomerAddressChange}
                    id="sameAddress"
                    label="Same as Customer Address"
                  />
                </div>
                <div id="Fields" className="flex flex-col gap-4">
                  {renderField({
                    label: "Address",
                    name: "installation_address",
                    type: "text",
                    placeholder: "Address  Line 1",
                  })}
                  {renderField({
                    label: "address Line 2",
                    name: "installation_address_2",
                    type: "text",
                    required: false,
                    placeholder: "Address  Line 2",
                  })}

                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Country",
                      name: "installation_country_id",
                      type: "select",
                      placeholder: "Select Country",
                      options: countries,
                    })}
                    {renderField({
                      label: "City",
                      name: "installation_city",
                      type: "text",
                      placeholder: "City",
                    })}
                  </div>
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Postal / Zip Code",
                      name: "installation_zipcode",
                      type: "text",
                      placeholder: "Zip Code",
                    })}
                    {renderField({
                      label: "State / Province",
                      name: "installation_state",
                      type: "text",
                      placeholder: "State Name",
                    })}
                  </div>
                </div>
              </div> */}
              {/* <============= Preferred Installation Date - S.3 ==============> */}
              {/* {orderDetails?.installationPrice !== 0 && (
                <div
                  id="Installation_Date"
                  className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
                >
                  <div id="Fields" className="flex flex-col">
                    {renderField({
                      label: "Preferred Installation Date",
                      name: "installation_date",
                      type: "date",
                    })}
                  </div>
                </div>
              )} */}

              {/* <============= Live With - S.5 ==============> */}
              {/* <div
                id="Live_With"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  {renderField({
                    label: "Live alone or with someone?",
                    name: "live_with",
                    type: "select",
                    placeholder: "Select",
                    options: liveWith,
                    required: false,
                  })}
                </div>
              </div> */}
              {/* <============= Source of Lead - S.6 ==============> */}
              {/* <div
                id="Live_With"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  {renderField({
                    label: "Source of Lead",
                    name: "source_lead",
                    type: "text",
                    placeholder: "Write The Source of Lead",
                    required: false,
                  })}
                </div>
              </div> */}
              {/* <============= Password - S.7 ==============> */}
              <div className="pb-8 w-full border-t pt-8 border-gray-300">
                <div className="space-y-4">
                  {renderField({
                    label: "Password",
                    name: "password",
                    type: "password",
                    placeholder: "Create password",
                  })}
                  {renderField({
                    label: "Confirm Password",
                    name: "confirm_password",
                    type: "password",
                    placeholder: "Confirm password",
                  })}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <Button
                  loading={loading}
                  type="submit"
                  shape="round"
                  color="green_200_green_400_01"
                  className=" w-[76%] sm:w-full rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] mt-3"
                >
                  Sign Up
                </Button>
                {error && (
                  <Text className="text-red-500 text-center">{error}</Text>
                )}
                <Text
                  as="p"
                  className="text-center mt-5 text-lg text-body w-[75%] md:pb-2 md:w-auto"
                >
                  <span className="inline-flex items-center">
                    Already have an account?
                    <Link
                      href="/login"
                      className="font-semibold text-primary ml-2"
                    >
                      Sign In
                    </Link>
                  </span>
                </Text>
              </div>
            </div>
          </div>
          {/* </div> */}
        </form>
      </AuthFormTemplate>
    </>
  );
}
