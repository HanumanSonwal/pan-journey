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
      // API RESPONSE
      // lastPage.data.page
      // lastPage.data.totalPage

      const currentPage =
        lastPage?.data?.page || 1;

      const totalPages =
        lastPage?.data?.totalPage || 1;

      console.log(
        "CURRENT PAGE:",
        currentPage,
      );

      console.log(
        "TOTAL PAGES:",
        totalPages,
      );

      // HAS NEXT PAGE
      if (currentPage < totalPages) {
        return currentPage + 1;
      }

      // STOP
      return undefined;
    },

    enabled: !!params?.id,

    staleTime: 1000 * 60 * 5,

    retry: 1,

    refetchOnWindowFocus: false,
  });
};