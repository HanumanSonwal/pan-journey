import { api } from "@/services/axios";

export const searchHotels = async (payload) => {
  const { data } = await api.post("/HotelSearch/search", payload);

  return data;
};
