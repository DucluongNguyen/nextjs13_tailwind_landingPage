import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "context/AuthContext";

// Chặn truy cập trang cho tới khi biết chắc trạng thái đăng nhập.
// adminOnly=true -> chỉ cho phép role "admin" (dùng cho trang quản trị tài nguyên).
const useRequireAuth = ({ adminOnly = false } = {}) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`);
      return;
    }

    if (adminOnly && !isAdmin) {
      router.replace("/tai-nguyen");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAuthenticated, isAdmin]);

  const ready = !loading && isAuthenticated && (!adminOnly || isAdmin);

  return { user, ready, loading };
};

export default useRequireAuth;
