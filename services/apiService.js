import httpService from "./httpService";

export const fetcher = async (url) => {
  const response = await httpService.get(url);
  return response.data;
};

export const postData = async (url, data) => {
  const response = await httpService.post(url, data);
  return response.data;
};

export const putData = async (url, data) => {
  const response = await httpService.put(url, data);
  return response.data;
};

export const deleteData = async (url) => {
  const response = await httpService.delete(url);
  return response.data;
};
