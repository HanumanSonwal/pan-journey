"use client";

import { useMutation } from "@tanstack/react-query";
import { cancelBookingApi } from "../api/booking.api";

export const useCancelBooking = () => {
  return useMutation({
    mutationFn: cancelBookingApi,
  });
};
