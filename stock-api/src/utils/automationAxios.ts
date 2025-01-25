import axios from "axios";
import { baseUrl } from "./constants";

const AutomationAxios = axios.create({
  baseURL: baseUrl,
});

export default AutomationAxios;
