"use client";

import HotelContentLoader from "@/components/common/loder/HotelContentLoader";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import { memo, useEffect, useMemo, useRef } from "react";
import HotelCard from "../../cards/HotelCard";
import { useInfiniteHotels } from "../../hooks/useInfiniteHotels";
import { buildHotelPayload } from "../../utils/buildHotelPayload";
import { mapHotelsForCard } from "../../utils/mapHotelsForCard";

function HotelList({
  searchData,
  filters,
  sort,
  onHotelsChange,
  onLoadingChange,
  onResultChange,
}) {
  const { data: wishlistIdsData } = useWishlistIds();

  const wishlistIds = useMemo(
    () => new Set(wishlistIdsData || []),
    [wishlistIdsData],
  );

  const payload = useMemo(() => {
    return buildHotelPayload({
      searchData,
      filters,
      sort,
    });
  }, [searchData, filters, sort]);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteHotels(payload);

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target) return;

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

  const hotels = useMemo(() => {
    const allHotels =
      data?.pages?.flatMap((page) => page?.data?.hotels || []) || [];
    return Array.from(
      new Map(allHotels.map((hotel) => [hotel.hotelId, hotel])).values(),
    );
  }, [data]);

  const currencySymbol = data?.pages?.[0]?.data?.currencySymbol || "₹";

  const searchKey =
    data?.pages?.[0]?.data?.searchKey ||
    data?.pages?.[0]?.data?.SearchKey ||
    "";

  const mappedHotels = useMemo(() => {
    return mapHotelsForCard({
      hotels,
      currencySymbol,
      searchKey,
    });
  }, [hotels, currencySymbol, searchKey]);

  useEffect(() => {
    onHotelsChange?.(mappedHotels);
  }, [mappedHotels, onHotelsChange]);

  useEffect(() => {
    onResultChange?.(mappedHotels.length > 0);
  }, [mappedHotels, onResultChange]);

  // LOADING
  if (isLoading) {
    return <HotelContentLoader />;
  }

  // ERROR
  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error?.message || "Failed to fetch hotels"}
      </div>
    );
  }

  // EMPTY
  if (!mappedHotels.length) {
    return <div className="py-10 text-center">No hotels found </div>;
  }

  return (
    <div className="mt-3 flex flex-col gap-4">
      {/* HOTELS */}
      {mappedHotels.map((hotel, index) => (
        <HotelCard
          key={hotel.id || index}
          hotel={hotel}
          wishlistIds={wishlistIds}
        />
      ))}

      {/* LOAD MORE */}
      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isFetchingNextPage && (
          <div className="text-sm text-gray-500">Loading more hotels...</div>
        )}

        {!hasNextPage && (
          <div className="text-sm text-gray-400">No more hotels</div>
        )}
      </div>
    </div>
  );
}

export default memo(HotelList);
