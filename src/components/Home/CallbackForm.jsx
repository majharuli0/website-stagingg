"use client";

import { useUserService } from "@/services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "..";

const CallbackForm = ({ accessToken }) => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    full_name: "",
    email: "",
    company_name: "",
    phone_number: "",
    country: "",
    // selectedDialCode: "",
    city: "",
    preferred_time: "",
    message: "",
  });
  const { sendContactInfo } = useUserService();
  // Fetch country data
  useEffect(() => {
    fetch("/countryData.json")
      .then((response) => response.json())
      .then((data) => setCountryData(data))
      .catch((error) => console.error("Error loading country data:", error));
  }, []);

  // Centralized change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle country and dial code changes
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: country,
    }));
  };

  const handleDialCodeChange = (event) => {
    const dialCode = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedDialCode: dialCode,
    }));
  };

  const [formErrors, setFormErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!formData.type) errors.type = "Please select your user type.";
    if (!formData.full_name) errors.full_name = "Full name is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Invalid email format.";
    if (!formData.phone_number)
      errors.phone_number = "Phone number is required.";
    if (!formData.country) errors.country = "Country is required.";
    if (!formData.company_name) errors.company_name = "Company is required.";
    if (!formData.city) errors.city = "City is required.";
    if (!formData.message) errors.message = "Message is required.";
    if (!formData.preferred_time)
      errors.preferred_time = "Preferred time is required.";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setLoading(true);

    try {
      const response = await sendContactInfo(formData);
      setFormData({
        type: "",
        full_name: "",
        email: "",
        company_name: "",
        phone_number: "",
        country: "",
        // selectedDialCode: "",
        city: "",
        preferred_time: "",
        message: "",
      });
      toast.success(
        "Form submitted successfully! We will get back to you soon."
      );
    } catch (error) {
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
      <p className="text-center text-3xl md:text-2xl tab:text-lg">
        Tell us a little about your needs, and our team will{" "}
        <br className="tab:hidden" /> reach out to provide the best solution for
        you.
      </p>
      <div className="w-full max-w-5xl mx-auto p-4">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex text-sm mb-4">
            <span className=" text-xl md:text-base tab:text-xs w-1/5 font-semibold">
              I am a
            </span>
            <div className="w-4/5 sm:w-full ">
              <div className="flex tab:flex-col flex-wrap gap-2 w-full">
                {userTypeOptions.map(({ label, value }) => (
                  <label key={value} className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-gray-600"
                      name="type"
                      value={value}
                      checked={formData.type === value}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2 text-base md:text-sm tab:text-xs">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              {formErrors.type && (
                <p className="text-red-500 text-sm mt-1 w-full">
                  {formErrors.type}
                </p>
              )}
            </div>
          </div>

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
                className="w-1/5  text-xl md:text-base tab:text-xs font-semibold mb-1 sm:mb-0"
              >
                {field.label}
              </label>
              <div className="w-4/5 ">
                <input
                  id={field.id}
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
                />
                {formErrors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors[field.name]}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="flex items-center">
            <label
              htmlFor="phone"
              className=" w-1/5 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0"
            >
              Phone:
            </label>
            <div className="w-4/5 ">
              <div className="flex items-center w-full">
                <select
                  className="px-3 py-3 md:py-2 w-[20%] bg-[#f5f5f5] rounded-l text-sm focus:outline-none"
                  // value={formData.selectedDialCode}
                  name="selectedDialCode"
                  // onChange={handleDialCodeChange}
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
                  name="phone_number"
                  placeholder="Enter phone number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded-r placeholder-gray-400 focus:outline-none"
                />
              </div>
              {formErrors["phone_number"] && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors["phone_number"]}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-1/4 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0">
              Country
            </label>
            <div className="w-full flex gap-4">
              <div className="sm:w-full w-4/5">
                <select
                  className="w-full px-3 py-2 text-sm bg-[#f5f5f5] rounded focus:outline-none"
                  value={formData.country}
                  name="country"
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countryData.map((country, i) => (
                    <option key={i} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {formErrors["country"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors["country"]}
                  </p>
                )}
              </div>
              <div className=" w-full flex items-center">
                <label className=" tab:text-xs w-1/4 text-xl md:text-base font-semibold mb-1 sm:mb-0">
                  City
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter a city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="sm:w-full w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
                  />
                  {formErrors["city"] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors["city"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="preferred-time"
              className=" w-1/5 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0"
            >
              Time:
            </label>
            <div className=" w-4/5">
              <input
                id="preferred-time"
                type="date"
                name="preferred_time"
                placeholder="Enter a Preferred Contact Time"
                value={formData.preferred_time}
                onChange={handleInputChange}
                className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
              />
              {formErrors["preferred_time"] && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors["preferred_time"]}
                </p>
              )}
            </div>
          </div>
          <div className="flex  items-start">
            <label className="tab:text-xs w-1/5 text-xl md:text-base font-semibold mb-1 sm:mb-0 pt-2">
              Message:
            </label>
            <div className=" w-4/5">
              <textarea
                name="message"
                placeholder="Write a message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none resize-none"
                rows={4}
              />
              {formErrors["message"] && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors["message"]}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6 ">
            {/* <button
              type="submit"
              className="py-2 tab:hidden px-8 bg-primary rounded text-white hover:bg-primary/90 transition duration-300"
            >
              Submit
            </button> */}
            <Button
              loading={loading}
              type="submit"
              shape="round"
              color="green_200_green_400_01"
              className="w-[280px] rounded-[14px] px-[2.13rem] font-semibold"
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
