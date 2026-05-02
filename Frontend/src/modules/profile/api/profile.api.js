import { api } from "@/services/axios";

export const getProfileApi = () =>
  api.get("/customer/profile");

export const updateProfileApi = (data) =>
  api.patch("/customer/profile", data);

export const sendEmailOtpApi = (data) =>
  api.post("/customer/auth/email/send", data);

export const verifyEmailApi = (data) =>
  api.post("/customer/profile/email/verify", data);

export const sendMobileOtpApi = (data) =>
  api.post("/customer/auth/otp/send", data);

export const verifyMobileApi = (data) =>
  api.post("/customer/profile/mobile/verify", data);