import { api } from "@/services/axios";

// 🔹 OTP
export const sendOtpApi = (mobile) =>
  api.post("/customer/auth/otp/send", { mobile });

export const verifyOtpApi = (data) =>
  api.post("/customer/auth/otp/verify", data);

// 🔹 USER
export const getMeApi = () => api.get("/customer/auth/me");

export const updateProfileApi = (data) => api.patch("/customer/profile", data);
