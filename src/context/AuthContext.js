"use client";
import { useUserService } from "@/services/userService";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
// Utility function to determine the country code based on the hostname
const getCountryCode = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.endsWith(".com")) return "global";
    if (hostname.endsWith(".au")) return "au";
  }
  return "global"; // Default to "global" if window is not defined
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [lastUserName, setLastUserName] = useState("");
  const [customerMail, setCustomerMail] = useState("");
  const [isLogin, setIsLogin] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const { removeStripeCustomerId, getUserDetailsById } = useUserService();

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

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setAccessToken(token);
      setIsLogin(token);
    } else {
      setIsLogin(null);
    }
  }, [email, customerMail]);

  const login = (token) => {
    const cookieOptions = {
      expires: 1, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    };
    const domain = getCookieDomain();
    if (domain) {
      cookieOptions.domain = domain; // Set the domain for the cookie
    }
    Cookies.set("access_token", token, cookieOptions);
    setAccessToken(token);
  };

  const logout = () => {
    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    };

    const domain = getCookieDomain();
    if (domain) {
      cookieOptions.domain = domain;
    }

    Cookies.remove("access_token", cookieOptions);
    localStorage.clear();
    window.location.href = "/login";
    setIsLogin(null);
    setAccessToken(null);
  };
  const country = useMemo(() => getCountryCode(), []);
  const storedUserId = localStorage.getItem("user_id");
  useEffect(() => {
    if (storedUserId && !userDetails) {
      fetchUserDetails();
    }
  }, []);

  const fetchUserDetails = async (id = storedUserId) => {
    try {
      const userDetails = await getUserDetailsById(id ? id : storedUserId);
      setUserName(userDetails.data.name);
      setLastUserName(userDetails.data.last_name);
      setEmail(userDetails.data.email);
      localStorage.setItem("user_email", userDetails.data.email);
      setCustomerMail(userDetails.data.email);
      localStorage.setItem("subscription_id", userDetails.data.subscription_id);
      setUserDetails(userDetails.data);
      localStorage.setItem("isUserVerified", true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        login,
        logout,
        accessToken,
        user,
        setUser,
        userName,
        setUserName,
        lastUserName,
        setLastUserName,
        customerMail,
        setCustomerMail,
        country,
        isLogin,
        userDetails,
        setUserDetails,
        fetchUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
