import { api } from "@/services/axios";

export const searchHotels = async (payload) => {
  try {
    const response = await api.post("/Hotels/search", payload);
    return response.data;
  } catch (error) {
    console.log("🚨 SEARCH ERROR RESPONSE", error?.response?.data);
    throw error;
  }
};
