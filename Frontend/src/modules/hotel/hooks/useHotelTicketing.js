"use client";

import { useMutation } from "@tanstack/react-query";

import { hotelTicketing } from "../services/hotelTicketing.service";

export const useHotelTicketing = () => {
  return useMutation({
    mutationFn: hotelTicketing,
  });
};
