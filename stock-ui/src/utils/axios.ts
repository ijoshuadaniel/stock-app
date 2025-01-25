import axios from "axios";
import { baseHeaders, baseUrl } from "../utils/constants";

const request = axios.create({
  baseURL: baseUrl,
  headers: {
    ...baseHeaders,
  },
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Server Error:", error.response.status);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default request;
