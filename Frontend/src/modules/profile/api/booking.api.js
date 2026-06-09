import { api } from "@/services/axios";

export const getMyBookingsApi = async (bookingRefNo = "") => {
  const url = bookingRefNo
    ? `/hotel/mybookings?bookingRefNo=${bookingRefNo}`
    : "/hotel/mybookings";

  const response = await api.get(url);

  return response?.data?.data;
};

export const downloadInvoiceApi = async (bookingRefNo) => {
  const response = await api.get(`/hotel/invoice/${bookingRefNo}`, {
    responseType: "blob",
  });

  return response.data;
};

export const cancelBookingApi = async (bookingRefNo) => {
  const response = await api.post("/hotel/cancel", {
    bookingRefNo,
  });

  return response.data;
};
