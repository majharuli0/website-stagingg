"use client";

import { useUserService } from "@/services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "..";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { callbackSchema } from "../../../schema";

const CallbackForm = ({ accessToken }) => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sendContactInfo } = useUserService();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(callbackSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      type: "",
      full_name: "",
      email: "",
      company_name: "",
      phone_number: "",
      country: "",
      city: "",
      preferred_time: "",
      message: "",
    },
  });

  useEffect(() => {
    fetch("/countryData.json")
      .then((response) => response.json())
      .then((data) => setCountryData(data))
      .catch((error) => console.error("Error loading country data:", error));
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    //remove selectedDialCode feilds from data
    try {
      const payload = { ...formData };
      delete payload.selectedDialCode;
      console.log(formData);

      await sendContactInfo(payload);
      reset();
      toast.success(
        "Form submitted successfully! We will get back to you soon."
      );
    } catch (err) {
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
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const userTypeOptions = [
    { label: "End User", value: "end_user" },
    { label: "Monitoring Company", value: "monitoring_station" },
    { label: "Nursing Home", value: "nursing_home" },
    { label: "Distributor", value: "distributor" },
    { label: "Other", value: "other" },
  ];

  return (
    <div
      id="call_back_form"
      className="max-w-[1320px] my-0 mx-auto w-full p-5 rounded-xl md:p-5 sm:p-0"
    >
      <p className="text-[40px] md:text-3xl tab:text-2xl font-semibold text-center py-2">
        Request a Call-Back
      </p>
      <p className="text-center text-xl md:text-2xl tab:text-lg">
        Tell us a little about your needs, and our team will{" "}
        <br className="tab:hidden" /> reach out to provide the best solution for
        you.
      </p>

      <div className="w-full max-w-5xl mx-auto p-4">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* User type */}
          <div className="flex text-sm mb-4">
            <span className=" text-xl md:text-base tab:text-xs w-1/5 font-semibold">
              I am a
            </span>
            <div className="w-4/5 sm:w-full">
              <div className="flex tab:flex-col flex-wrap gap-2 w-full">
                {userTypeOptions.map(({ label, value }) => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-gray-600"
                      value={value}
                      {...register("type")}
                    />
                    <span className="ml-2 text-base md:text-sm tab:text-xs">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          {/* Full name, Email, Company */}
          {[
            {
              id: "full-name",
              label: "Full name:",
              placeholder: "Enter a Full Name",
              name: "full_name",
            },
            {
              id: "email",
              label: "E-Mail:",
              placeholder: "Enter your E-Mail address",
              name: "email",
            },
            {
              id: "company",
              label: "Company:",
              placeholder: "Enter a Company name if applicable",
              name: "company_name",
            },
          ].map((field) => (
            <div key={field.id} className="flex flex-row tab:items-center">
              <label
                htmlFor={field.id}
                className="w-1/5 text-xl md:text-base tab:text-xs font-semibold mb-1 sm:mb-0"
              >
                {field.label}
              </label>
              <div className="w-4/5">
                <input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Phone */}
          <div className="flex items-center">
            <label
              htmlFor="phone"
              className="w-1/5 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0"
            >
              Phone:
            </label>
            <div className="w-4/5">
              <div className="flex items-center w-full">
                <select
                  className="px-3 py-3 md:py-2 w-[20%] bg-[#f5f5f5] rounded-l text-sm focus:outline-none"
                  {...register("selectedDialCode")}
                >
                  <option value="">Country Code</option>
                  {countryData.map((country, i) => (
                    <option key={i} value={country.dial_code}>
                      {country.dial_code} ({country.name})
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  type="number"
                  placeholder="Enter phone number"
                  {...register("phone_number")}
                  className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded-r placeholder-gray-400 focus:outline-none"
                />
              </div>
              {errors.phone_number && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>

          {/* Country + City */}
          <div className="flex items-center">
            <label className="w-1/4 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0">
              Country
            </label>
            <div className="w-full flex gap-4">
              <div className="sm:w-full w-4/5">
                <select
                  className="w-full px-3 py-2 text-sm bg-[#f5f5f5] rounded focus:outline-none"
                  {...register("country")}
                >
                  <option value="">Select Country</option>
                  {countryData.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="w-full flex items-center">
                <label className="tab:text-xs w-1/4 text-xl md:text-base font-semibold mb-1 sm:mb-0">
                  City
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Enter a city"
                    {...register("city")}
                    className="sm:w-full w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preferred time */}
          <div className="flex items-center">
            <label
              htmlFor="preferred-time"
              className="w-1/5 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0"
            >
              Time:
            </label>
            <div className="w-4/5">
              <input
                id="preferred-time"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("preferred_time", {
                  required: "Preferred time is required",
                  validate: (value) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // remove time part
                    const selectedDate = new Date(value);
                    return (
                      selectedDate >= today || "You cannot select a past date"
                    );
                  },
                })}
                className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
              />
              {errors.preferred_time && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.preferred_time.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex items-start">
            <label className="tab:text-xs w-1/5 text-xl md:text-base font-semibold mb-1 sm:mb-0 pt-2">
              Message:
            </label>
            <div className="w-4/5">
              <textarea
                placeholder="Write a message"
                {...register("message")}
                className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none resize-none"
                rows={4}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <Button
              loading={loading}
              type="submit"
              shape="round"
              color="green_200_green_400_01"
              className="w-[300px] rounded-[14px] px-[2.13rem] font-semibold"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallbackForm;
