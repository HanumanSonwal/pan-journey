import { api } from "@/services/axios";

// 🔍 SEARCH HOTELS
export const searchHotels = async (payload) => {
  const response = await api.post("/Hotels/search", payload);

  return response.data;
};
