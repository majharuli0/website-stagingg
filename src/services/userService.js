import Cookies from "js-cookie";
import { useApi } from "../utils/api";

// Helper function to determine the appropriate cookie domain
const getCookieDomain = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return null; // No domain for localhost
    } else if (hostname.endsWith("seenyor.com")) {
      return ".seenyor.com"; // Dot prefix allows cookie to be shared across subdomains
    }
  }
  return null; // Default to no domain if we can't determine it
};

export const useUserService = () => {
  const { post, get, patch } = useApi();
  const validateUserData = (userData) => {
    const requiredFields = [
      "name",
      "email",
      "password",
      "contact_number",
      "address",
      "country_id",
      "city",
      "agent_id",
    ];

    for (const field of requiredFields) {
      if (!userData[field]) {
        return `${field.replace(/_/g, " ")} is required.`; // Return a user-friendly error message
      }
    }

    // if (userData.password !== userData.confirmPassword) {
    //   return "Passwords do not match."; // Check for password match
    // }

    return ""; // No errors
  };

  const registerUser = async (userData) => {
    const validationError = validateUserData(userData);
    if (validationError) {
      throw new Error(validationError); // Throw an error if validation fails
    }

    try {
      // Register user
      const userResponse = await post("/users/end-users", userData);

      // Check if user registration was successful
      if (!userResponse || !userResponse.status) {
        throw new Error(userResponse.message || "User registration failed.");
      }

      // Create Stripe customer
      const stripeCustomerResponse = await createStripeCustomer({
        email: userData.email,
        name: userData.name,
      });

      // Check if Stripe customer creation was successful
      if (!stripeCustomerResponse?.data || !stripeCustomerResponse?.data?.id) {
        throw new Error("Failed to create Stripe customer.");
      }

      // Combine user data with Stripe customer ID
      const combinedUserData = {
        ...userResponse,
        stripeCustomerId: stripeCustomerResponse?.data?.id,
      };

      // Store only the Stripe customer ID in a cookie
      const cookieOptions = {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      };

      const domain = getCookieDomain();
      if (domain) {
        cookieOptions.domain = domain;
      }

      Cookies.set(
        "stripeCustomerId",
        combinedUserData.stripeCustomerId,
        cookieOptions
      );
      return combinedUserData;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  };

  const verifyOtp = async (otpData) => {
    return post("/auth/verify-otp", otpData);
  };

  const resendOtp = async (emailData) => {
    return post("/auth/send-otp", emailData);
  };

  const login = async (credentials) => {
    try {
      const response = await post("/auth/login", credentials);
      const accessToken = response.data.access_token;
      // Set the access token in a cookie
      const cookieOptions = {
        expires: 10, // 1 day
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      };

      const domain = getCookieDomain();
      if (domain) {
        cookieOptions.domain = domain; // Set the domain for the cookie
      }

      Cookies.set("access_token", accessToken, cookieOptions); // Set the access token cookie
      return response;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const getProducts = async () => {
    // return get("orders/get-products"); //old one
    return get("/stripe/stripe-products"); // new one
  };
  const getCountries = async () => {
    return get("/countries");
  };

  const getAgents = async () => {
    return get("/users/agents");
  };
  const createStripeCustomer = async (userData) => {
    // return post("/orders/create-stripe-customer", userData); //old one
    return post("/stripe/create-stripe-customer", userData); // new one
  };

  const createStripeSession = async (sessionData) => {
    // return post("/orders/create-session", sessionData); // old one
    return post("/stripe/create-customer-session", sessionData); // new one
  };
  const renewSubscription = async (data) => {
    return post("/orders/renew-subscription", data);
  };

  const getStripeCustomerId = async () => {
    try {
      const stripeCustomerId = Cookies.get("stripeCustomerId");
      return stripeCustomerId || null;
    } catch (error) {
      console.error("Error getting Stripe customer ID:", error);
      return null;
    }
  };

  const removeStripeCustomerId = async () => {
    try {
      const cookieOptions = {
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      };

      const domain = getCookieDomain();
      if (domain) {
        cookieOptions.domain = domain;
      }

      Cookies.remove("stripeCustomerId", cookieOptions);
      return true; // Indicates successful removal
    } catch (error) {
      console.error("Error removing Stripe customer ID:", error);
      return false; // Indicates failure to remove
    }
  };

  const getSessionDetails = async (sessionId) => {
    // return get(`/orders/session-details/${sessionId}`);
    return get(`/stripe/session-details/${sessionId}`);
  };
  const getFirstOrderStatus = async (sessionId) => {
    return get(`/orders/first-order`);
  };

  //Nessesary API's For Make Subscription Stuff
  const handlePaymentStatus = async (sessionId) => {
    // return post(`/orders/handle-payment-success`, { session_id: sessionId });
    return post(`/stripe/handle-payment-success`, { session_id: sessionId });
  };
  const cancelSubscription = async (subs_id) => {
    // return post(`/orders/cancel-subscription`, { subscriptionId: subs_id });
    return post(`/stripe/cancel-subscription`, { subscriptionId: subs_id });
  };
  const handlePaymentSubscription = async (
    customerId,
    priceId,
    email,
    password
  ) => {
    // return post(`/orders/create-subscription`, {
    // return post(`/stripe/create-subscription`, {
    //   customerId: customerId,
    //   priceId: priceId,
    //   email: email,
    //   password: password,
    // });

    return null;
  };
  const subscriptionDetails = async (subscriptionId) => {
    // return get(`/orders/subscription-status/${subscriptionId}`);
    return get(`/stripe/subscription-status/${subscriptionId}`);
  };
  //=====End========//

  const createOrder = async (orderData) => {
    try {
      const response = await post("/orders", orderData);
      return response;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };
  const refundRequest = async (transactionId, refundData) => {
    return patch(`/orders/refunds-request/${transactionId}`, refundData);
  };
  const updateUserName = async (nameData) => {
    try {
      const response = await patch("/auth/update-name", nameData);
      return response; // Return the response if needed
    } catch (error) {
      console.error("Error updating user name:", error);
      throw error;
    }
  };
  const getUserDetailsById = async (id) => {
    try {
      const response = await get(
        `/users/${id}?role=end_user&soft_deleted=false`
      );
      return response; // Return the user details
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  };

  // Update Password Function
  const updatePassword = async (passwordData) => {
    try {
      const response = await patch("/auth/update-password", passwordData);
      return response; // Return the response if needed
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  // Update Password Function
  const updateEmail = async (emailData) => {
    try {
      const response = await patch("/auth/update-email", emailData);
      return response; // Return the response if needed
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  // Update Password Function
  const authEmail = async ({ email, otp }) => {
    try {
      const response = await patch("/auth/email", { email, otp });
      return response; // Return the response if needed
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  const getTransactionDetails = async (customerId) => {
    try {
      // const response = await get(`/orders/transaction-details/${customerId}`);
      const response = await get(`/stripe/transaction-details/${customerId}`);
      return response; // Return the transaction details
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      throw error; // Rethrow the error for handling in the component
    }
  };
  const getDefualtAgentID = async (uid) => {
    try {
      const response = await get(`/deals/agent-id?uid=${uid}`);
      return response; // Return the transaction details
    } catch (error) {
      console.error("Error fetching Agent ID:", error);
      throw error; // Rethrow the error for handling in the component
    }
  };
  const getCustomerId = async (customeremail) => {
    try {
      // const response = await get(`/orders/customer-email/${customeremail}`);
      const response = await get(`/stripe/customer-email/${customeremail}`);
      return response; // Return the transaction details
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  const resetPassword = async ({ otp, email, password }) => {
    // Make a PATCH request to the reset-password endpoint
    const response = await patch("/auth/reset-password", {
      otp,
      email,
      password,
    });

    // Return the response for further handling in the component
    return response;
  };

  // add payment method
  const AddNewPaymentMethod = async (methodInfo) => {
    try {
      const response = await post("/orders/add-payment-method", methodInfo);
      return response;
    } catch (error) {
      console.error("Error adding payment:", error);
      throw error;
    }
  };
  //Delete Payment Method
  const DeletePaymentMethod = async (methodInfo) => {
    try {
      const response = await post("/orders/delete-payment-method", methodInfo);
      return response;
    } catch (error) {
      console.error("Error adding payment:", error);
      throw error;
    }
  };
  const SetDefaultPaymentMethod = async (methodInfo) => {
    try {
      const response = await post("/orders/default-payment-method", methodInfo);
      return response;
    } catch (error) {
      console.error("Error adding payment:", error);
      throw error;
    }
  };

  // getmethod
  const getAllPaymentMethod = async (customerid) => {
    try {
      const response = await get(`/orders/payment-method/${customerid}`);
      return response; // Return the transaction details
    } catch (error) {
      console.error("Error fetching payment method:", error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  // Update Password Function
  const updateUserInfo = async (id, userData) => {
    try {
      const response = await patch(`/users/${id}`, userData);
      return response;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };
  const checkUserExist = async (email) => {
    try {
      const response = await get(`/users/exit?email=${email}`);
      return response;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  const chnageDeviceStatus = async (body) => {
    try {
      const response = await patch(`/deals/update-device-status`, body);
      return response;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  const submitTrial = async (data) => {
    try {
      const response = await post("/contacts/support", data);
      return response;
    } catch (error) {
      console.error("Error adding payment:", error);
      throw error;
    }
  };
  return {
    registerUser,
    verifyOtp,
    resendOtp,
    login,
    createStripeCustomer,
    createStripeSession,
    getProducts,
    getStripeCustomerId,
    removeStripeCustomerId,
    getCountries,
    getAgents,
    getSessionDetails,
    renewSubscription,
    chnageDeviceStatus,
    checkUserExist,
    createOrder,
    handlePaymentStatus,
    getDefualtAgentID,
    handlePaymentSubscription,
    subscriptionDetails,
    updateUserName,
    getUserDetailsById,
    updatePassword,
    submitTrial,
    updateEmail,
    getFirstOrderStatus,
    DeletePaymentMethod,
    updateUserInfo,
    getTransactionDetails,
    refundRequest,
    cancelSubscription,
    resetPassword,
    getCustomerId,
    authEmail,
    AddNewPaymentMethod,
    getAllPaymentMethod,
    SetDefaultPaymentMethod,
  };
};
