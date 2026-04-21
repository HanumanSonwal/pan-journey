import { message } from "antd";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ✅ RESPONSE SUCCESS
api.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data?.success && response.config.method !== "get") {
      message.success(data.message || "Success");
    }

    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    const msg = error?.response?.data?.message || "Something went wrong";

    // ❗ show error
    message.error(msg);

    // ❗ skip /auth/me
    if (originalRequest.url?.includes("/auth/me")) {
      window.location.replace("/");
      return Promise.reject(error);
    }

    // 🔄 refresh token
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
        window.location.replace("/");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
