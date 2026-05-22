import { api } from "@/services/axios";

export const HotelDetailApi = async (payload) => {
  const response = await api.post("/Hoteldetails", payload);

  return response?.data?.data || {};
};
