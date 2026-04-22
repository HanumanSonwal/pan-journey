import { showMessage } from "@/lib/antdMessage";
import { useAuthStore } from "@/store/auth.store";
import { useLoaderStore } from "@/store/loader.store";
import axios from "axios";

const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (!config.skipLoader && !config.url?.includes("/auth/refresh-token")) {
    useLoaderStore.getState().start();
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (
      !response.config.skipLoader &&
      !response.config.url?.includes("/auth/refresh-token")
    ) {
      useLoaderStore.getState().stop();
    }

    const data = response.data;

    if (
      data?.success &&
      response.config.method !== "get" &&
      !response.config.skipToast
    ) {
      showMessage.success(data.message || "Success");
    }

    return response;
  },

  async (error) => {
    const originalRequest = error.config || {};
    const status = error?.response?.status;

    if (
      !originalRequest.skipLoader &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      useLoaderStore.getState().stop();
    }

    if (originalRequest.url?.includes("/auth/refresh-token")) {
      useAuthStore.getState().clearUser();
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshApi.post("/auth/refresh-token");
        return api(originalRequest); // retry original
      } catch {
        useAuthStore.getState().clearUser();
        return Promise.reject(error);
      }
    }

    if (
      !originalRequest.url?.includes("/auth/me") &&
      !originalRequest.skipToast
    ) {
      const msg = error?.response?.data?.message || "Something went wrong";
      showMessage.error(msg);
    }

    return Promise.reject(error);
  },
);
export default api;
