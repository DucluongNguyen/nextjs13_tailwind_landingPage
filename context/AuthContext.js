import { createContext, useContext, useEffect, useState } from "react";
import { fetcher, postData } from "services/apiService";
import httpService, { TOKEN_KEY } from "services/httpService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lúc load app: nếu có token đã lưu, gọi /auth/me để lấy lại thông tin user (kèm role)
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(TOKEN_KEY)
        : null;

    if (!token) {
      setLoading(false);
      return;
    }

    fetcher("/auth/me")
      .then((res) => setUser(res.user))
      .catch(() => {
        httpService.clearAuthToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async ({ email, password }) => {
    const res = await postData("/auth/login", { email, password });
    httpService.setAuthToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const register = async ({ name, email, password }) => {
    const res = await postData("/auth/register", { name, email, password });
    httpService.setAuthToken(res.token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    httpService.clearAuthToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth phải được dùng bên trong <AuthProvider>");
  }
  return ctx;
};

export default AuthContext;
