"use client";

import { useCurrencyStore } from "@/modules/shared/store/currency.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchHotels } from "../services/hotel.service";

export const useInfiniteHotels = (params) => {
  const currency = useCurrencyStore((state) => state.selectedCurrency.code);

  return useInfiniteQuery({
    queryKey: ["hotels", params, currency],

    /*
     * Backend me abhi pagination nahi hai.
     *
     * Isliye फिलहाल same payload directly bhej rahe hain.
     *
     * Future me backend pagination aane par
     * yahin pageParam + pagination add karenge.
     */
    queryFn: () => searchHotels(params),

    initialPageParam: 1,

    /*
     * Backend response me abhi page / totalPage
     * nahi aa raha.
     *
     * Isliye next page फिलहाल disabled hai.
     */
    getNextPageParam: () => undefined,

    /*
     * Old payload me params.id tha.
     *
     * New payload me destination object hai,
     * isliye enabled condition bhi new payload
     * ke according hai.
     */
    enabled:
      !!params?.destination?.city && !!params?.checkIn && !!params?.checkOut,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
