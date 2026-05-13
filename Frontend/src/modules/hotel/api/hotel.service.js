import { api } from "@/services/axios";

// 🔍 SEARCH HOTELS
export const searchHotels = async (params) => {
  const response = await api.get(
    "Hotelsearch/search",
    {
      params,
    },
  );

  return response.data;
};