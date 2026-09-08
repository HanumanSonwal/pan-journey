import { api } from "@/services/axios";

export const getRoomPricing = async (payload) => {
  try {
    const response = await api.post("/HotelDetails/room-pricing", payload);

    return response?.data?.data || {};
  } catch (error) {
    console.error("ROOM PRICING API ERROR:", error?.response?.data || error);

    throw new Error(
      error?.response?.data?.message || "Unable to fetch room pricing",
    );
  }
};
