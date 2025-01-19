import axios from "axios";
import { baseHeaders } from "./constants";
import { constructNseUrl } from "./functions";

const getCookies = async () => {
  try {
    const response = await axios.get(constructNseUrl(""), {
      headers: baseHeaders,
    });
    if (response.status === 200) {
      const setCookies = response.headers["set-cookie"];
      const cookies: string[] = [];
      setCookies &&
        setCookies.forEach((cookie: string) => {
          const requiredCookies: string[] = [
            "nsit",
            "nseappid",
            "ak_bmsc",
            "AKA_A2",
          ];
          const cookieKeyValue = cookie.split(";")[0];
          const cookieEntry = cookieKeyValue.split("=");
          if (requiredCookies.includes(cookieEntry[0])) {
            cookies.push(cookieKeyValue);
          }
        });
      return {
        status: "Failed",
        done: false,
        cookies: cookies.join("; "),
      };
    } else {
      return {
        status: "Failed",
        done: false,
      };
    }
  } catch (error) {
    return {
      status: "Failed",
      done: false,
    };
  }
};

export default getCookies;
