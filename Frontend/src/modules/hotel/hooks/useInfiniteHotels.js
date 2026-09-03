"use client";

import { useCurrencyStore } from "@/modules/shared/store/currency.store";
import { useInfiniteQuery } from "@tanstack/react-query";

import { searchHotels } from "../services/hotel.service";

const PAGE_SIZE = 10;

export const useInfiniteHotels = (params) => {
  const currency = useCurrencyStore((state) => state.selectedCurrency.code);

  return useInfiniteQuery({
    /*
     * Filter / sorting params queryKey ka part hain.
     *
     * Isliye:
     * - destination change → new search
     * - filter change → page 1 se new search
     * - sorting change → page 1 se new search
     */

    queryKey: ["hotels", params, currency],

    /*
     * =========================================================
     * API REQUEST
     * =========================================================
     */

    queryFn: ({ pageParam }) => {
      return searchHotels({
        ...params,

        // Pagination backend ko yahin se jayegi
        page: pageParam,
        limit: PAGE_SIZE,
      });
    },

    /*
     * First API request:
     *
     * page = 1
     * limit = 10
     */

    initialPageParam: 1,

    /*
     * =========================================================
     * NEXT PAGE
     * =========================================================
     *
     * Backend pagination response aane ke baad
     * yahan uske exact fields use karenge.
     *
     * Abhi response mein pagination information
     * available nahi hai, isliye next page ko
     * blindly request nahi karna.
     */

    getNextPageParam: (lastPage) => {
      const pagination =
        lastPage?.data?.pagination ||
        lastPage?.data?.Pagination ||
        lastPage?.pagination ||
        lastPage?.Pagination;

      if (!pagination) {
        return undefined;
      }

      const currentPage = Number(
        pagination?.page ?? pagination?.currentPage ?? pagination?.current_page,
      );

      const totalPages = Number(
        pagination?.totalPages ??
          pagination?.totalPage ??
          pagination?.total_pages,
      );

      if (
        Number.isFinite(currentPage) &&
        Number.isFinite(totalPages) &&
        currentPage < totalPages
      ) {
        return currentPage + 1;
      }

      return undefined;
    },

    /*
     * =========================================================
     * ENABLED
     * =========================================================
     */

    enabled:
      !!params?.destination?.city && !!params?.checkIn && !!params?.checkOut,

    /*
     * =========================================================
     * CACHE / REFETCH
     * =========================================================
     */

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,

    refetchOnReconnect: false,

    refetchOnMount: false,
  });
};
