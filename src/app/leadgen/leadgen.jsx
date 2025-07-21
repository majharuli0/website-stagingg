"use client";
import SingUpOpt from "@/components/SingUpOpt";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Heading, Input, Text } from "../../components";
import { useUserService } from "../../services/userService";
import { toast } from "react-toastify";
const liveWith = [
  { label: "Alone", value: "Alone" },
  { label: "With Someone", value: "With Someone" },
];

const SelectBox = forwardRef(
  ({ name, placeholder, options = [], onChange, className, ...rest }, ref) => (
    <select
      ref={ref}
      name={name}
      onChange={onChange}
      className={className}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {Array.isArray(options) &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  )
);

SelectBox.displayName = "SelectBox";

export default function Leadgen() {
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
  const { registerUser, verifyOtp, resendOtp, getCountries, getAgents } =
    useUserService();
  const [countries, setCountries] = useState([]);
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data from the REST Countries API
        const response = await fetch("https://restcountries.com/v3.1/all");

        // Check if the response is OK
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the JSON data
        const countries = await response.json();

        // Extract country names
        const countryNames = countries.map((country) => country.name.common);

        // Sort country names from A to Z
        const sortedCountries = countryNames.sort();

        // Output the sorted country names
        console.log(sortedCountries);

        // Format the countries for your application
        const formattedCountries = sortedCountries.map((countryName) => ({
          label: countryName,
          value: countryName, // or any other unique identifier
        }));

        // Set the countries state
        setCountries(formattedCountries);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setError("Failed to load necessary data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formattedData = {
      Name: data.customer_first_name + " " + data.customer_last_name,
      Email: data.customer_email,
      "Phone Number": "‎" + data.customer_contact_number,
      "Customer Address":
        data.customer_address +
        "," +
        data.customer_address_2 +
        "," +
        data.customer_city +
        "," +
        data.customer_state +
        "-" +
        data.customer_zipcode +
        "," +
        data.customer_country_id,
      "Installation Address":
        data.installation_address +
        "," +
        data.installation_address_2 +
        "," +
        data.installation_city +
        "," +
        data.installation_state +
        "-" +
        data.installation_zipcode +
        "," +
        data.installation_country_id,
      "Installation Date": "--",
      "Agent Name": data.agent_name,
      "Agent ID": "#" + data.agent_id,
      "Live Alone or With Someone": data.live_with,
      "Specialist Call Date": data.seenyor_call_date,
      "Source of Lead": data.source_lead,
    };
    const url =
      "https://script.google.com/macros/s/AKfycbz1gfzzJoZKEH9TWdpemvJl6L1AQFn0Ye1zMrI-QiSvK48i-piOL39NhR7nLCZVhTWGBQ/exec";
    console.log(formattedData);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formattedData),
    })
      .then((res) => {
        console.log(res);
        reset();
        toast.success("Form submitted successfully!");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again.");
        setIsLoading(false);
      });
  };

  // Helper function to render form fields
  const renderField = ({
    label,
    name,
    type,
    placeholder,
    options,
    required = true,
    customErrorMessage,
    validate,
    dateLimition,
  }) => (
    <div className="w-full flex flex-col items-start gap-[0.25rem] self-stretch">
      <Heading
        size="headingmd"
        as="h6"
        className="text-[1.13rem] font-semibold capitalize text-text"
      >
        {label}{" "}
        {required ? null : (
          <span className="text-sm font-normal italic">(optional)</span>
        )}
      </Heading>

      {type === "select" ? (
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
          onChange={(e) => {
            setValue(name, e.target.value);
            trigger(name);
          }}
          className={`w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem] bg-white`}
        />
      ) : (
        <Input
          type={type}
          name={name}
          dateLimition={dateLimition}
          placeholder={placeholder}
          {...register(name, { required, validate })}
          className={`w-full rounded-[12px] !border px-[1.63rem] capitalize !text-text sm:px-[1.25rem] bg-white ${
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
              Customer Pre-Order Form
            </Heading>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-[3.25rem] md:w-full sm:gap-[1.63rem] ">
            <div className="flex flex-col items-center self-stretch gap-7">
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
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "E-mail",
                      name: "customer_email",
                      type: "text",
                      placeholder: "E-Mail Address",
                    })}
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
              <div
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
              </div>
              {/* <============= Preferred Installation Date - S.3 ==============> */}
              {/* <div
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
              </div> */}
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
                    {renderField({
                      label: "Sales Agent Name",
                      name: "agent_name",
                      type: "text",
                      placeholder: "Agent Name",
                      required: true,
                    })}
                    {renderField({
                      label: "Agent ID",
                      name: "agent_id",
                      type: "text",
                      placeholder: "Agent ID",
                      required: true,
                    })}
                  </div>
                </div>
              </div>
              {/* <============= Live With - S.5 ==============> */}
              <div
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
              </div>
              {/* <============= Seenyor Product specialist call Date - S.6 ==============> */}
              <div
                id="Installation_Date"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  {renderField({
                    label: "Seenyor Product specialist call – Date and Time",
                    name: "seenyor_call_date",
                    type: "date",
                    dateLimition: true,
                  })}
                </div>
              </div>
              {/* <============= Source of Lead - S.7 ==============> */}
              <div
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
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <Button
                type="submit"
                disabled={isLoading}
                shape="round"
                color="green_200_green_400_01"
                className=" w-[76%] sm:w-full rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] mt-3"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
