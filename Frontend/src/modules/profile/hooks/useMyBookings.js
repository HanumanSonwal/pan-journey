"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyBookingsApi } from "../api/booking.api";

export const useMyBookings = () => {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => getMyBookingsApi(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
