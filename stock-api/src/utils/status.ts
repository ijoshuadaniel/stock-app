export const code200 = (data) => {
  return {
    status: 200,
    message: "success",
    data,
  };
};

export const code400 = (error) => {
  return {
    status: 400,
    message: "failed",
    error,
  };
};

export const codeError = (data) => {
  return {
    status: data.status,
    message: data.message,
    error: data.error,
  };
};
