import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Sign up form schema ===============>
export const registerSchema = yup.object({
  customer_first_name: yup
    .string()
    .required("First Name is required")
    .min(2, "Name must be at least 2 characters"),

  customer_last_name: yup
    .string()
    .required("Last Name is required")
    .min(2, "Name must be at least 2 characters"),

  country_code: yup.string().required("Please select country code"),

  customer_email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
    .email("Invalid email format"),

  customer_city: yup.string().required("City is required"),
  customer_zipcode: yup
    .string()
    .required("Zip code is required")
    .matches(/^[A-Za-z0-9\s-]{2,10}$/, "Invalid zip code format"),
  customer_state: yup.string().required("State is required"),
  installation_date: yup.string().optional(),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain one special character (!@#$%^&*)"
    ),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  contact_number: yup
    .string()
    .required("Contact number is required")
    .test(
      "country-code-check",
      "Please select country code first",
      function (value) {
        const { country_code } = this.parent;
        return Boolean(country_code);
      }
    )
    .test("is-valid-phone", "Invalid phone number", function (value) {
      const { country_code } = this.parent;
      if (!country_code || !value) return true;
      try {
        const phoneNumber = parsePhoneNumberFromString(
          country_code.split("_")[0] + value
        );
        return phoneNumber && phoneNumber.isValid();
      } catch {
        return false;
      }
    }),

  customer_address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),

  customer_address_2: yup.string().optional(),
  customer_country_id: yup.string().required("Country is required"),
  agent_id: yup
    .string()
    .required("Agent ID is required")
    .matches(/^\d+$/, "Agent ID must be numbers")
    .length(6, "Agent ID must be 6 characters"),
});
// Login form schema ===============>
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
  password: yup.string().required("Password is required"),
});
// Forgot password schema ===============>
export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
    .required("Email is required"),
});

// Set password schema ===============>
export const setPasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain one special character (!@#$%^&*)"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
export const callbackSchema = yup.object({
  type: yup.string().required("Please select your user type"),

  full_name: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),

  email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
    .email("Invalid email format"),

  company_name: yup
    .string()
    .required("Company name is required")
    .min(2, "Company must be at least 2 characters"),

  country: yup.string().required("Country is required"),

  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),

  selectedDialCode: yup.string().required("Please select country code"),

  phone_number: yup
    .string()
    .required("Phone number is required")
    .test("is-valid-phone", "Invalid phone number", function (value) {
      const { selectedDialCode } = this.parent;
      if (!selectedDialCode || !value) return false;
      try {
        const phoneNumber = parsePhoneNumberFromString(
          selectedDialCode + value
        );
        return phoneNumber && phoneNumber.isValid();
      } catch {
        return false;
      }
    }),

  preferred_time: yup.string().required("Preferred time is required"),

  message: yup
    .string()
    .required("Message is required")
    .min(5, "Message must be at least 5 characters"),
});
