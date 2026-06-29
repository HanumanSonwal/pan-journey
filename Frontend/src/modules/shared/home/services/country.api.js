import { api } from "@/services/axios";

export const getCountriesApi = async (search = "") => {
  const response = await api.get(
    `/countries?search=${encodeURIComponent(search)}`,
  );

  return response?.data?.data || [];
};