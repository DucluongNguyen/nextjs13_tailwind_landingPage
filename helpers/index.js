export const getErrorMsg = (error) => {
  if (Array.isArray(error?.response?.data?.message)) {
    return error?.response?.data?.message.join(", ");
  }

  if (typeof error?.response?.data?.error === "string") {
    return error.response.data.error;
  }

  if (typeof error?.response?.data?.error?.message === "string") {
    return error.response.data.error.message;
  }

  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  if (error?.toString()) {
    return error?.toString();
  }

  return "Something wrong!";
};
