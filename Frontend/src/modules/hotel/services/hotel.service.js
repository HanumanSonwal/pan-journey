import { api } from "@/services/axios";

export const searchHotels = async (payload) => {
  try {
    const response = await api.post("/Hotels/search", payload);
    return response.data;
  } catch (error) {
    console.error("HOTEL SEARCH ERROR:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch hotels");
  }
};
