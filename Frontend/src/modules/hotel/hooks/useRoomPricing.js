"use client";

import { useQuery } from "@tanstack/react-query";
import { getRoomPricing } from "../services/roomPricing.service";

export const useRoomPricing = ({ hotelDetailId = "", roomId = "" }) => {
  return useQuery({
    queryKey: ["hotel-room-pricing", hotelDetailId, roomId],

    queryFn: () =>
      getRoomPricing({
        hotelDetailId,
        roomId,
      }),

    enabled: Boolean(hotelDetailId && roomId),

    staleTime: 0,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
