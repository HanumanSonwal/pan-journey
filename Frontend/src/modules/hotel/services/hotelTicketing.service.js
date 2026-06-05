import { api } from "@/services/axios";

export const hotelTicketing = async (payload) => {
  try {
    const response = await api.post("/HotelTicketing", payload);

    return response.data;
  } catch (error) {
    console.error("HOTEL TICKETING ERROR:", error);

    throw new Error(error?.response?.data?.message || "Hotel ticketing failed");
  }
};
