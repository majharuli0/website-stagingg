import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useApi = () => {
  const post = async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred!");
      throw error.response
        ? error.response.data
        : new Error("An error occurred");
    }
  };
  const get = async (url, params) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : new Error("An error occurred");
    }
  };
  // New PATCH method
  const patch = async (url, data) => {
    try {
      const response = await api.patch(url, data);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred!");
      throw error.response
        ? error.response.data
        : new Error("An error occurred");
    }
  };

  return { post, get, patch };
};
