import { api } from "@/services/axios";

export const createBooking = async (payload) => {
  try {
    const response = await api.post("/hotelTempBooking", payload);

    return response.data;
  } catch (error) {
    console.error("HOTEL BOOKING ERROR:", error);

    throw new Error(error?.response?.data?.message || "Booking failed");
  }
};
