"use client";

import { useCurrencyStore } from "@/modules/shared/store/currency.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchHotels } from "../services/hotel.service";

const PAGE_SIZE = 10;

export const useInfiniteHotels = (params) => {
  const currency = useCurrencyStore((state) => state.selectedCurrency.code);

  return useInfiniteQuery({
    queryKey: ["hotels", params, currency],

    queryFn: ({ pageParam = 1 }) =>
      searchHotels({
        ...params,
        pagination: {
          page: pageParam,
          limit: PAGE_SIZE,
        },
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data) return undefined;

      const currentPage = lastPage.data.page ?? 1;
      const totalPages = lastPage.data.totalPage ?? 1;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },

    enabled: !!params?.id,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
