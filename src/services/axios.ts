import axios from "axios";
// import { useNavigate } from "react-router-dom";

const getApiConfig = () => {
  const isProduction = import.meta.env.MODE === "production";
  const VERSION = import.meta.env.VITE_API_HOST_VERSION;

  const BASE_URL = isProduction
    ? import.meta.env.VITE_API_HOST
    : import.meta.env.VITE_API_HOST;
  const PORT = isProduction
    ? import.meta.env.VITE_API_HOST_PORT
    : import.meta.env.VITE_API_HOST_PORT;

  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  return {
    baseURL: `${BASE_URL}:${PORT}/api/${VERSION}`,
    headers,
  };
};

export const api = axios.create(getApiConfig());

api.interceptors.response.use(
  (response) => response,
  (error) => {
  
    if (
      error.message === "Network Error" &&
      error?.response?.status === undefined
    ) {
      console.log("Server is unreachable");
    }
    return Promise.reject(error);
  }
);

export default api;
