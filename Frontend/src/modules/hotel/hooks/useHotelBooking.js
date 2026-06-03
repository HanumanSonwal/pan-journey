"use client";

import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { createBooking } from "../services/booking.service";

export const useHotelBooking = () => {
  return useMutation({
    mutationFn: createBooking,

    onSuccess: () => {
      message.success("Booking created successfully");
    },

    onError: (error) => {
      message.error(error?.message || "Booking failed");
    },
  });
};
