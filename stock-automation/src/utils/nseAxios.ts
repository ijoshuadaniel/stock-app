import axios from "axios";
import { baseHeaders, baseUrl } from "../utils/constants";

const NseAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    ...baseHeaders,
  },
});

NseAxios.interceptors.response.use(
  (response) => {
    // console.log("Response Received:", {
    //   url: response.config.url,
    //   status: response.status,
    //   data: response.data,
    // });
    return response;
  },
  (error) => {
    // console.error("Request Error:", {
    //   message: error.message,
    //   url: error.config?.url,
    //   data: error.response?.data,
    // });
    return Promise.reject(error);
  }
);

export default NseAxios;
