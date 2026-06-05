"use client";

import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../services/booking.service";

export const useHotelBooking = () => {
  return useMutation({
    mutationFn: createBooking,
  });
};