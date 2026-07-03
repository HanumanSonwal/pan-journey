"use client";

import { useCurrencyStore } from "@/modules/shared/store/currency.store";
import { useQuery } from "@tanstack/react-query";
import { HotelDetailApi } from "../services/hotelDetail.service";

export const useHotelDetails = (payload) => {
  const currency = useCurrencyStore((state) => state.selectedCurrency.code);

  return useQuery({
    queryKey: ["hotel-details", payload, currency],
    queryFn: () => HotelDetailApi(payload),
    enabled: !!payload?.hotelId && !!payload?.hotelMeta?.cityId,
  });
};
