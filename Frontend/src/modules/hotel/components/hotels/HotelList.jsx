"use client";

import HotelContentLoader from "@/components/common/loder/HotelContentLoader";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import { memo, useEffect, useMemo, useRef } from "react";

import HotelCard from "../../cards/HotelCard";
import { useInfiniteHotels } from "../../hooks/useInfiniteHotels";
import { buildHotelPayload } from "../../utils/buildHotelPayload";
import { mapHotelsForCard } from "../../utils/mapHotelsForCard";
import HotelNotFound from "./HotelNotFound";

function HotelList({
  searchData,
  filters,
  sort,
  onHotelsChange,
  onLoadingChange,
  onResultChange,
}) {
  /* =========================================================
     WISHLIST
  ========================================================= */

  const { data: wishlistIdsData } = useWishlistIds();

  const wishlistIds = useMemo(
    () => new Set(wishlistIdsData || []),
    [wishlistIdsData],
  );

  /* =========================================================
     BUILD API PAYLOAD
     
     searchData + filters + sort
     are converted into the backend payload.
  ========================================================= */

  const payload = useMemo(() => {
    return buildHotelPayload({
      searchData,
      filters,
      sort,
    });
  }, [searchData, filters, sort]);

  /* =========================================================
     HOTEL API
     
     Pagination is handled inside useInfiniteHotels.
  ========================================================= */

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHotels(payload);

  /* =========================================================
     LOADING CALLBACK
  ========================================================= */

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  /* =========================================================
     LOAD MORE / INFINITE SCROLL
  ========================================================= */

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "400px 0px",
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  /* =========================================================
     COMBINE ALL PAGES
  ========================================================= */

  const hotels = useMemo(() => {
    const allHotels =
      data?.pages?.flatMap((page) => {
        const hotelDetailId = page?.data?.hotelDetailId || "";

        return (page?.data?.hotels || []).map((hotel) => ({
          ...hotel,
          hotelDetailId,
        }));
      }) || [];

    return Array.from(
      new Map(
        allHotels.map((hotel, index) => [
          hotel?.id || hotel?.hotelId || hotel?.HotelId || `hotel-${index}`,
          hotel,
        ]),
      ).values(),
    );
  }, [data]);

  /* =========================================================
     RESPONSE META
  ========================================================= */

  const currencySymbol =
    data?.pages?.[0]?.data?.currencySymbol ||
    data?.pages?.[0]?.data?.CurrencySymbol ||
    "₹";

  const searchKey =
    data?.pages?.[0]?.data?.searchKey ||
    data?.pages?.[0]?.data?.SearchKey ||
    "";

  /* =========================================================
     MAP API HOTELS → HOTEL CARD DATA
  ========================================================= */

  const mappedHotels = useMemo(() => {
    return mapHotelsForCard({
      hotels,
      currencySymbol,
      searchKey,
    });
  }, [hotels, currencySymbol, searchKey]);

  /* =========================================================
     HOTELS CALLBACK
  ========================================================= */

  useEffect(() => {
    onHotelsChange?.(mappedHotels);
  }, [mappedHotels, onHotelsChange]);

  /* =========================================================
     RESULT CALLBACK
  ========================================================= */

  useEffect(() => {
    onResultChange?.(mappedHotels.length > 0);
  }, [mappedHotels, onResultChange]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (isLoading) {
    return <HotelContentLoader />;
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (isError) {
    return <HotelNotFound type="error" />;
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!mappedHotels.length) {
    return <HotelNotFound type="not-found" />;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="w-full space-y-4">
      {/* HOTEL LIST */}

      {mappedHotels.map((hotel, index) => (
        <HotelCard
          key={hotel?.id || hotel?.hotelId || index}
          hotel={hotel}
          wishlistIds={wishlistIds}
        />
      ))}

      {/* =====================================================
          LOAD MORE
          
          This appears only when another page is available.
      ===================================================== */}

      {(hasNextPage || isFetchingNextPage) && (
        <div ref={loadMoreRef} className="flex justify-center py-6">
          {isFetchingNextPage && (
            <div className="text-sm text-gray-500">Loading more hotels...</div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(HotelList);
