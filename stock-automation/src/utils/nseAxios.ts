import axios from "axios";
import { baseHeaders, baseUrl } from "../utils/constants";

const NseAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    ...baseHeaders,
  },
});

export default NseAxios;
