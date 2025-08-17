import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
// Chnage Email schema ===============>

export const chnageEmailSchema = yup.object({
  tempEmail: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
  password: yup.string().required("Password is required"),
});
// Chnage Password schema ===============>

export const chnagePasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain one special character (!@#$%^&*)"
    ),
  oldPassword: yup.string().required("Old password is required"),
});
export const updateAddressSchema = yup.object({
  contact_code: yup.string().required("Please select country code"),
  // post_Code: yup
  //   .string()
  //   .required("Zip code is required")
  //   .matches(/^[A-Za-z0-9\s-]{2,10}$/, "Invalid zip code format"),
  // state: yup.string().required("State is required"),
  contact_number: yup
    .string()
    .required("Contact number is required")
    .test(
      "country-code-check",
      "Please select country code first",
      function (value) {
        const { contact_code } = this.parent;
        return Boolean(contact_code);
      }
    )
    .test("is-valid-phone", "Invalid phone number", function (value) {
      const { contact_code } = this.parent;
      if (!contact_code || !value) return true;
      try {
        const phoneNumber = parsePhoneNumberFromString(
          contact_code.split("_")[1] + value
        );
        return phoneNumber && phoneNumber.isValid();
      } catch {
        return false;
      }
    }),

  address: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),

  address2: yup.string().optional(),
  city: yup.string().required("City is required"),
});
