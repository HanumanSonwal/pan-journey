"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  applyCoupon,
  getBookingDetails,
  removeCoupon,
} from "../services/hotelCheckout.service";

export const useBookingDetails = (bookingRefNo) => {
  return useQuery({
    queryKey: ["hotel-booking-details", bookingRefNo],
    queryFn: () => getBookingDetails(bookingRefNo),
    enabled: !!bookingRefNo,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

/**
 * Apply Coupon
 */
export const useApplyCoupon = (options = {}) => {
  return useMutation({
    mutationFn: applyCoupon,
    ...options,
  });
};

/**
 * Remove Coupon
 */
export const useRemoveCoupon = (options = {}) => {
  return useMutation({
    mutationFn: removeCoupon,
    ...options,
  });
};
