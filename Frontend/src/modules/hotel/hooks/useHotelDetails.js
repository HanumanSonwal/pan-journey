"use client";

import { useQuery } from "@tanstack/react-query";
import { HotelDetailApi } from "../services/hotelDetail.service";


export const useHotelDetails = (payload) => {
  return useQuery({
    queryKey: ["hotel-details", payload],

    queryFn: () => HotelDetailApi(payload),

    enabled:
      !!payload?.hotelKey &&
      !!payload?.searchKey &&
      !!payload?.hotelMeta?.hotelId,

    staleTime: 1000 * 60 * 5,

    retry: 1,
  });
};