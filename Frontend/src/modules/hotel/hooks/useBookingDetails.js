"use client";

import { useQuery } from "@tanstack/react-query";
import { getBookingDetails } from "../services/hotelCheckout.service";

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
