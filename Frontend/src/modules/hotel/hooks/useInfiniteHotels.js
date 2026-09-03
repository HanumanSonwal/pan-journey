"use client";

import { useCurrencyStore } from "@/modules/shared/store/currency.store";
import { useInfiniteQuery } from "@tanstack/react-query";

import { searchHotels } from "../services/hotel.service";

const PAGE_SIZE = 10;

export const useInfiniteHotels = (params) => {
  const currency = useCurrencyStore((state) => state.selectedCurrency.code);

  return useInfiniteQuery({
    queryKey: ["hotels", params, currency],

    queryFn: ({ pageParam = 1 }) => {
      return searchHotels({
        ...params,
        page: pageParam,
        limit: PAGE_SIZE,
      });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const meta = lastPage?.data?.meta;

      if (!meta) {
        return undefined;
      }

      if (meta.hasNextPage) {
        return Number(meta.page) + 1;
      }

      return undefined;
    },

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
