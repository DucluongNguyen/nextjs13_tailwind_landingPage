import { useMutation } from "@tanstack/react-query";
import { getErrorMsg } from "helpers";
import { toast } from "react-toastify";
import { postData } from "services/apiService";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data) => postData(`/users/register`, data),
    onError: (error) => {
      toast.error(getErrorMsg(error));
    },
    onSuccess :()=> {
      toast.success("Đăng ký thành công thành công");
    },
  });
};
