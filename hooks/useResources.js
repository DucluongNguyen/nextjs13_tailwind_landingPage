import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMsg } from "helpers";
import { toast } from "react-toastify";
import {
  deleteData,
  fetcher,
  getBlob,
  postFormData,
} from "services/apiService";

const resourcesKey = (categoryId) => ["resources", categoryId];

// Danh sách tài nguyên trong 1 danh mục — cần đăng nhập
export const useResourcesByCategory = (categoryId) => {
  return useQuery({
    queryKey: resourcesKey(categoryId),
    queryFn: () =>
      fetcher(`/resources?category=${categoryId}`).then((res) => res.data),
    enabled: !!categoryId,
  });
};

// Upload tài nguyên mới — chỉ admin
export const useUploadResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, description, category, file }) => {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description || "");
      formData.append("category", category);
      formData.append("file", file);
      return postFormData("/resources", formData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: resourcesKey(variables.category),
      });
      toast.success("Tải lên tài nguyên thành công");
    },
    onError: (error) => toast.error(getErrorMsg(error)),
  });
};

// Xoá tài nguyên — chỉ admin
export const useDeleteResource = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => deleteData(`/resources/${id}`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: resourcesKey(variables.categoryId),
      });
      toast.success("Đã xoá tài nguyên");
    },
    onError: (error) => toast.error(getErrorMsg(error)),
  });
};

// Tải file tài nguyên về máy người dùng (yêu cầu đã đăng nhập — header
// Authorization được httpService tự gắn sẵn).
export const downloadResource = async (id, fileName) => {
  try {
    const response = await getBlob(`/resources/${id}/download`);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName || "tai-nguyen");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error(getErrorMsg(error));
    throw error;
  }
};

// Lấy blob URL để xem PDF trực tiếp trong trang (endpoint /view trả về
// inline thay vì attachment). Trình tự dùng: gọi hàm này lấy objectUrl,
// gán vào <iframe src>, rồi nhớ gọi window.URL.revokeObjectURL khi đóng.
export const getResourceViewUrl = async (id) => {
  const response = await getBlob(`/resources/${id}/view`);
  const blob = new Blob([response.data], { type: "application/pdf" });
  return window.URL.createObjectURL(blob);
};
