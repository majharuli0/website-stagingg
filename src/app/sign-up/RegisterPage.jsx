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

const Checkbox = ({ checked, onChange, disabled, id, label }) => (
  <div key={id} className="flex gap-2 items-center">
    <div
      onClick={onChange}
      className={`flex items-center justify-center !h-6 !w-6 border-2 rounded-md cursor-pointer transition-colors duration-300 ${
        checked ? "bg-primary border-transparent" : "bg-white border-gray-300"
      } ${disabled ? "opacity-80 bg-slate-200" : "opacity-100"}`}
    >
      {checked && (
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
      )}
    </div>
    <p onClick={onChange} className="text-body text-slate-600 select-none">
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
    formState: { errors },
    trigger,
    setValue,
    watch,
    reset,
  } = useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    registerUser,
    verifyOtp,
    resendOtp,
    getCountries,
    getAgents,
    getDefualtAgentID,
  } = useUserService();
  const [countries, setCountries] = useState([]);
  const [countriesForCode, setCountriesForCode] = useState([]);
  const [agents, setAgents] = useState([]);
  const { setEmail, email, user } = useAuth();
  const [error, setError] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [useCustomerAddress, setUseCustomerAddress] = useState(false);
  const [isAgentDisabled, setIsAgentDisabled] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [isRegisterDeviceExist, setIsRegisterDeviceExist] = useState();
  const [agentID, setAgentID] = useState();

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
            (country) => ({
              label: country.country_name,
              value: country.country_code,
            })
          );
          setCountriesForCode(formattedCountriesCode);
          const tempAUS = formattedCountries.filter(
            (i) => i.value === "682f6cca2c67829ed16d85eb"
          );
          setCountries(tempAUS);
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
        setError("Failed to load necessary data. Please try again.");
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
    if (password.length < 6) {
      setPasswordStrength("Weak (minimum 6 characters)");
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
      setIsAgentDisabled(!isAgentDisabled);
    } catch (error) {
      console.error("Error in handleCheckboxChange:", error);
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
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return; // Stop submission if the password is invalid
    }
    const formattedData = {
      agent_id: isAgentDisabled ? agentID : data.agent_id,
      email: data.customer_email,
      name: data.customer_first_name,
      last_name: data.customer_last_name,
      address: data.customer_address,
      address2: data.customer_address_2,
      city: data.customer_city,
      country_id: "682f6cca2c67829ed16d85eb",
      // country_id: data.customer_country_id,
      post_Code: data.customer_zipcode,
      state: data.customer_state,
      // contact_code: "+61",
      contact_code: data.country_code,
      contact_number: data.customer_contact_number,
      password: data.password,
      customer_info: {
        country_id: "682f6cca2c67829ed16d85eb",
        // country_id: data.installation_country_id,
        address: data.customer_address,
        address2: data.customer_address_2,
        city: data.customer_city,
        country_id: "682f6cca2c67829ed16d85eb",
        // country_id: data.customer_country_id,
        post_Code: data.customer_zipcode,
        state: data.customer_state,
        contact_number: data.customer_contact_number,
        installation_date: data.installation_date || null,
        // contact_code: "+61",
        contact_code: data.country_code,
        elderly_Count: data.live_with === "alone" ? 1 : 2, // Assuming "alone" means 1, otherwise 2
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
    console.log(formattedData);

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
    try {
      setError("");
      const response = await registerUser(formattedData);
      console.log(response);

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
        setError(response.message || "Registration failed. Please try again.");
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
      if (err.errors) {
        console.log(err.errors[0].message.matches);
        toast.error(err.errors[0].message.matches);
      } else {
        if (err?.message) toast.error(err?.message);
      }
    }
  };

  const handleOtpVerification = async (otp) => {
    // Only proceed with OTP verification if there are no errors
    //     if (error) {
    //       console.error("Cannot verify OTP due to previous errors:", error);
    //       return; // Prevent OTP verification if there are errors
    //     }

    try {
      const response = await verifyOtp({
        email,
        otp: otp,
      });
      if (response.status) {
        localStorage.setItem("isUserVerified", JSON.stringify(true));
        setIsOtpVerified(true);
        reset();
        router.push("/payment");
      } else {
        setError(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      setError(err.message || "An error occurred during OTP verification");
    }
  };

  const handleResendOtp = async () => {
    console.log("resend OTP");
    try {
      const response = await resendOtp({
        email,
      });
      if (response.status) {
        setError("");
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while resending OTP");
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
        setError={setError}
      />
    );
  }

  // Watch the password field for validation in confirm password
  const password = watch("password");
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
  }) => (
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
            value: country.value,
            label: `${country.label} (${country.value})`,
          }))}
          {...register(name, { required })}
          onChange={(e) => {
            setValue(name, e.target.value);
            trigger(name);
          }}
          defaultValue={"+61"}
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
          value={"682f6cca2c67829ed16d85eb"}
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
        <p className="text-red-500 text-xs">
          {customErrorMessage
            ? customErrorMessage
            : errors[name].message || `${label} is required`}
        </p>
      )}
    </div>
  );

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
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" md:min-h-screen mb-[9.75rem] mt-[2rem] flex flex-1 flex-col items-center gap-[2.25rem] px-[3.50rem] md:self-stretch md:px-[1.25rem] sm:overflow-x-hidden custom-scrollbar "
      >
        <div className="flex flex-col gap-[1.88rem] max-w-[800px] w-full">
          <div className="flex w-full flex-col items-center justify-center gap-[0.50rem] md:w-full">
            <Heading
              size="heading7xl"
              as="h1"
              className="text-[2.13rem] font-bold text-text md:text-[2.00rem] sm:text-[1.88rem]"
            >
              Sign Up to Seenyor
            </Heading>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-[3.25rem] md:w-full sm:gap-[1.63rem] ">
            <div className="flex flex-col items-center self-stretch gap-7">
              {/* <============= Agent Name and Badge ID - S.4 ==============> */}
              <div
                id="Agent_Name&Badge_ID"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {/* {renderField({
                      label: "Sales Agent Name",
                      name: "agent_name",
                      type: "text",
                      placeholder: "Agent Name",
                      required: isAgentDisabled ? false : true,
                      isDisabled: isAgentDisabled,
                    })} */}
                    {renderField({
                      label: "Agent ID",
                      name: "agent_id",
                      type: "text",
                      placeholder: "Agent ID",
                      required: isAgentDisabled ? false : true,
                      isDisabled: isAgentDisabled,
                    })}
                  </div>
                  {/* Checkbox to disable fields */}
                  {/* {searchParams.get("isRegisterDevice") === "true" && (
                    <div className="flex items-center gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="noAgentInfo"
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                      <label htmlFor="noAgentInfo">
                        I do not have agent ID and name at the moment
                      </label>
                    </div>
                  )} */}
                  {searchParams.get("isRegisterDevice") === "true" &&
                    isRegisterDeviceExist &&
                    isRegisterDeviceExist.length > 0 && (
                      <div className="flex items-center gap-2 w-full mb-4 mt-4">
                        <Checkbox
                          checked={isAgentDisabled}
                          onChange={handleCheckboxChange}
                          id="isAgentDisable"
                          label="I do not have agent ID and name at the moment!"
                        />
                      </div>
                    )}
                </div>
              </div>
              {/* <============= Customer Information Fields - S.1 ==============> */}
              <div
                id="Customer_info"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <Heading size="heading3xl" as="h2">
                  Customer Information
                </Heading>
                <div id="Fields" className="flex flex-col gap-4">
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
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
                  {renderField({
                    label: "E-mail",
                    name: "customer_email",
                    type: "text",
                    placeholder: "E-Mail Address",
                  })}
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    <div className="w-[45%] md:w-full">
                      {renderField({
                        label: "Country Code",
                        name: "country_code",
                        type: "select",
                        placeholder: "Select Country Code",
                        options: countries,
                        required: false,
                      })}
                    </div>
                    {renderField({
                      label: "Phone Number",
                      name: "customer_contact_number",
                      type: "tel",
                      placeholder: "Enter Phone Number",
                    })}
                  </div>

                  {renderField({
                    label: "Address",
                    name: "customer_address",
                    type: "text",
                    placeholder: "Address  Line 1",
                  })}
                  {renderField({
                    label: "address Line 2",
                    name: "customer_address_2",
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
                      name: "customer_country_id",
                      type: "select",
                      placeholder: "Select Country",
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
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Postal / Zip Code",
                      name: "customer_zipcode",
                      type: "text",
                      placeholder: "Zip Code",
                    })}
                    {renderField({
                      label: "State / Province",
                      name: "customer_state",
                      type: "text",
                      placeholder: "State Name",
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
              {orderDetails?.installationPrice !== 0 && (
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
              )}

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
              <div
                id="Password"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col gap-4">
                  {renderField({
                    label: "Password",
                    name: "password",
                    type: "password",
                    placeholder: "Password",
                  })}
                  {renderField({
                    label: "Confirm Password",
                    name: "confirm_password",
                    type: "password",
                    placeholder: "Confirm Password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  <Text
                    className={`text-sm ${
                      passwordStrength === "Strong"
                        ? "text-green-600"
                        : passwordStrength === "Weak"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {passwordStrength} <br />
                  </Text>
                  {/* <Text className="text-red-600">{error}</Text> */}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <Button
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
        </div>
      </form>
    </>
  );
}
