"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyBookingsApi } from "../api/booking.api";

export const useBookingDetails = (bookingRefNo) => {
  return useQuery({
    queryKey: ["booking-details", bookingRefNo],

    queryFn: () => getMyBookingsApi(bookingRefNo),

    enabled: !!bookingRefNo,

    staleTime: 1000 * 60 * 5,

    retry: 1,
  });
};