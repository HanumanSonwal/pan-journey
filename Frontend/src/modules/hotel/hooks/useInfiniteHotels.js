"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { searchHotels } from "../services/hotel.service";

export const useInfiniteHotels = (params) => {
  const queryKey = useMemo(() => {
    return ["hotels", JSON.stringify(params || {})];
  }, [params]);
  return useInfiniteQuery({
    queryKey,

    queryFn: async ({ pageParam = 1 }) => {
      if (!params?.id) {
        return null;
      }
      return searchHotels({
        ...params,
        pagination: {
          page: pageParam,
          limit: 10,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data) {
        return undefined;
      }
      const currentPage = lastPage.data.page || 1;
      const totalPages = lastPage.data.totalPage || 1;
      if (currentPage >= totalPages) {
        return undefined;
      }
      return currentPage + 1;
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
