import { api } from "@/services/axios";

export const sendOtpApi = (mobile) =>
  api.post("/customer/auth/otp/send", { mobile });

export const verifyOtpApi = (data) =>
  api.post("/customer/auth/otp/verify", data);

export const sendEmailOtpApi = (data) =>
  api.post("/customer/auth/email/send", data);

export const getMeApi = () => api.get("/customer/auth/me");

export const updateProfileApi = (data) => api.patch("/customer/auth/complete-profile", data);

export const logoutApi = (refreshToken) =>
  api.post("/customer/auth/logout", { refreshToken });


