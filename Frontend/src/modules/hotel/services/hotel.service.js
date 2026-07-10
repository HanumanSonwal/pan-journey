import { api } from "@/services/axios";

export const searchHotels = async (payload) => {
  const { data } = await api.post("/Hotels/search", payload);
  return data;
};
