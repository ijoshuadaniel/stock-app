import NseAxios from "./nseAxios";

const getNseData = async (url, cookie) => {
  try {
    const response = await NseAxios.get(url, {
      headers: {
        Cookie: cookie,
      },
    });
    if (response.status === 200) {
      return {
        status: response.status,
        msg: "Success",
        done: true,
        data: response.data,
      };
    } else {
      return {
        status: response.status,
        msg: "Failed",
        done: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "Falied",
      done: false,
    };
  }
};

export default getNseData;
