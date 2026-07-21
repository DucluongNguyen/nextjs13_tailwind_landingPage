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

// Dùng cho upload file (multipart/form-data), vd upload tài nguyên
export const postFormData = async (url, formData) => {
  const response = await httpService.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Tải file nhị phân về (dùng cho nút "Tải về" tài nguyên)
export const getBlob = async (url) => {
  const response = await httpService.get(url, { responseType: "blob" });
  return response;
};
