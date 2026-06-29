import { api } from "@/services/axios";

export const subscribeNewsletterApi = async (payload) => {
  const response = await api.post("/newsletter/subscribe", payload);

  return response?.data;
};