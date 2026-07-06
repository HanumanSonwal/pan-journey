import { api } from "@/services/axios";

export const getBookingDetails = async (bookingRefNo) => {
  const response = await api.get(`/get-booking-details/${bookingRefNo}`);

  return response.data;
};

/**
 * Apply Coupon
 */
export const applyCoupon = async (payload) => {
  const response = await api.put("/hotel-temp-booking/couponApply", payload);

  return response.data;
};

/**
 * Remove Coupon
 */
export const removeCoupon = async (payload) => {
  const response = await api.put("/hotel-temp-booking/couponRemove", payload);

  return response.data;
};
