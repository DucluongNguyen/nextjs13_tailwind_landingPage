import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL } from "const/api";

class Services {
  axios;

  constructor() {
    // const token = localStorage.getItem("access_token");
    this.axios = axios.create({
      baseURL: BASE_API_URL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

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
      function (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          window.location.reload();

          return Promise.reject(error);
        } else if (error.response?.status === 403) {
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token) {
    this.axios.interceptors.request.use(
      function (config) {
        if (config.headers) {
          config.headers["Authorization"] = `token ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
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
