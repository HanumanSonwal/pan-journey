import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;

    console.log("❌ API ERROR:", status);

    if (status === 401) {
      console.log("⚠️ 401 received");
      const session = await getSession();

      if (session?.error === "RefreshAccessTokenError") {
        console.log("❌ Refresh failed → logout");

        await signOut({ redirect: false });

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);
