import { api } from "@/services/axios";

export const getBookingDetails = async (bookingRefNo) => {
  const response = await api.get(`/get-booking-details/${bookingRefNo}`);

  return response.data;
};
