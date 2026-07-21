import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getErrorMsg } from "helpers";
import { toast } from "react-toastify";
import { deleteData, fetcher, postData, putData } from "services/apiService";

const TREE_KEY = ["category-tree"];

// Lấy toàn bộ cây danh mục tài nguyên (Toán THCS/THPT -> Lớp -> Học kỳ...)
export const useCategoryTree = (options = {}) => {
  return useQuery({
    queryKey: TREE_KEY,
    queryFn: () => fetcher("/categories/tree").then((res) => res.data),
    ...options,
  });
};

// Tạo danh mục con (hoặc danh mục gốc nếu không truyền parent) — chỉ admin
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ name, parent, order }) =>
      postData("/categories", { name, parent, order }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TREE_KEY });
      toast.success("Tạo danh mục thành công");
    },
    onError: (error) => toast.error(getErrorMsg(error)),
  });
};

// Đổi tên / di chuyển danh mục — chỉ admin
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => putData(`/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TREE_KEY });
      toast.success("Cập nhật danh mục thành công");
    },
    onError: (error) => toast.error(getErrorMsg(error)),
  });
};

// Xoá danh mục (phải rỗng) — chỉ admin
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteData(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TREE_KEY });
      toast.success("Đã xoá danh mục");
    },
    onError: (error) => toast.error(getErrorMsg(error)),
  });
};
