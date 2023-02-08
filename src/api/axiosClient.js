import axios from "axios";
import { STATIC_HOST } from "../constants/common";
import storageKeys from "../constants/storage-keys";
const axiosClient = axios.create({
  baseURL: STATIC_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});
//Interceptor
// Add a request interceptor

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (
      config.url.indexOf("/auth/singup") >= 0 ||
      config.url.indexOf("/auth/login") >= 0 //  config.url.indexOf("/auth/refresh") >= 0
    ) {
      return config;
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token_chat"
    )}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(storageKeys.REFRESH_TOKEN);
      const response = await axiosClient.post('auth/refresh-token', {
        refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem(storageKeys.TOKEN, accessToken);
      axiosClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
