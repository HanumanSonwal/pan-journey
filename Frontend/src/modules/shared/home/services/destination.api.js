import { api } from "@/services/axios";

export const getDestinationsApi = async (
  type,
) => {
  const response = await api.get(
    `/destinations?type=${type}`,
  );

  return response?.data?.data || [];
};