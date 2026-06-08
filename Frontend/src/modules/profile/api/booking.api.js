import { api } from "@/services/axios";

export const getMyBookingsApi = async (bookingRefNo = "") => {
  const url = bookingRefNo
    ? `/hotel/mybookings?bookingRefNo=${bookingRefNo}`
    : "/hotel/mybookings";

  const response = await api.get(url);

  return response?.data?.data;
};
