import { useLoaderStore } from "@/store/loader.store";
import { message } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  useLoaderStore.getState().start();
  return config;
});

api.interceptors.response.use(
  (response) => {
    const data = response.data;

    useLoaderStore.getState().stop(); // ⭐ loader OFF

    if (data?.success && response.config.method !== "get") {
      message.success(data.message || "Success");
    }

    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    useLoaderStore.getState().stop(); 

    const msg = error?.response?.data?.message || "Something went wrong";
    message.error(msg);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        return api(originalRequest);
      } catch {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
