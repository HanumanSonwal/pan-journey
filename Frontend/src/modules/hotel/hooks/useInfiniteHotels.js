import { useInfiniteQuery } from "@tanstack/react-query";

import { searchHotels } from "../api/hotel.service";

export const useInfiniteHotels = (params) => {
  return useInfiniteQuery({
    queryKey: ["hotels", params],

    queryFn: async ({ pageParam = 1 }) => {
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
      const currentPage = lastPage?.data?.currentPage || 1;

      const totalPages = lastPage?.data?.totalPages || 1;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      return undefined;
    },

    enabled: !!params?.id,

    staleTime: 1000 * 60 * 5,

    retry: 1,

    refetchOnWindowFocus: false,
  });
};