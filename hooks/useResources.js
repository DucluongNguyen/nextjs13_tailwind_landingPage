import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_API_URL } from "const/api";
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

// Metadata 1 tài nguyên (title, mimeType, fileName...) — công khai. Trang xem
// dùng để biết mimeType mà chọn render bằng pdf.js hay mammoth.
export const useResourceById = (id) => {
  return useQuery({
    queryKey: ["resource", id],
    queryFn: () => fetcher(`/resources/${id}`).then((res) => res.data),
    enabled: !!id,
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

// URL file PDF thô (endpoint /view trả Content-Disposition: inline, công
// khai không cần đăng nhập). Dùng làm "file" cho trang xem PDF (pdf.js tự
// fetch và tự render từng trang theo đúng chiều rộng khung chứa) — không còn
// dựa vào trình xem PDF gốc của trình duyệt nữa vì mỗi trình duyệt/mobile xử
// lý toolbar, sidebar và zoom khác nhau, không ép fit-width nhất quán được.
export const getResourceViewUrl = (id) => `${BASE_API_URL}/resources/${id}/view`;
