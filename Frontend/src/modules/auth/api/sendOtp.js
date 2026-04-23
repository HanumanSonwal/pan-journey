import { api } from "@/lib/axios";

export const sendOtp = async (phone) => {
  const res = await api.post("/auth/send-otp", { phone });
  return res.data;
};