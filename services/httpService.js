import axios from "axios";
import { BASE_API_URL } from "const/api";

export const TOKEN_KEY = "access_token";

class Services {
  axios;

  constructor() {
    this.axios = axios.create({
      baseURL: BASE_API_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
      },
    });

    // Nếu đã có token trong localStorage (reload trang), gắn luôn vào header
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(TOKEN_KEY);
      if (token) this.setAuthToken(token);
    }

    //! Interceptor request
    this.axios.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (response) {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          this.clearAuthToken();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject(error);
        } else if (error.response?.status === 403) {
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  }

  // Gắn token vào header Authorization (đúng chuẩn "Bearer <token>" mà backend yêu cầu)
  // và lưu lại vào localStorage để giữ đăng nhập qua các lần reload.
  setAuthToken(token) {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  }

  clearAuthToken() {
    delete this.axios.defaults.headers.common["Authorization"];
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  }

  get(url, config) {
    return this.axios.get(url, config);
  }

  post(url, data, config) {
    return this.axios.post(url, data, config);
  }

  delete(url, config) {
    return this.axios.delete(url, config);
  }

  put(url, data, config) {
    return this.axios.put(url, data, config);
  }
}

export default new Services();
