export const getErrorMsg = (error) => {
  if (isArray(error?.response?.data?.message)) {
    return error?.response?.data?.message.join(", ");
  }

  if (isString(error?.response?.data?.error)) {
    return error.response.data.error;
  }

  if (isString(error?.response?.data?.error?.message)) {
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
