import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = Cookies.get("role") || "teacher";
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
  return config;
});
