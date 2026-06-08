import { api } from "@/services/axios";

export const getCurrencyApi = async () => {
  const response = await api.get(`/currency/list`);

  return response?.data?.data || [];
};
