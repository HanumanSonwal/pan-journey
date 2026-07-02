"use client";

import HotelContentLoader from "@/components/common/loder/HotelContentLoader";
import { useCurrencyStore } from "@/modules/shared/store/currency.store";
import { useWishlistIds } from "@/modules/wishlist/hooks/useWishlistIds";
import dayjs from "dayjs";
import { memo, useEffect, useMemo, useRef } from "react";
import HotelCard from "../../cards/HotelCard";
import { useInfiniteHotels } from "../../hooks/useInfiniteHotels";
function HotelList({
  searchData,
  filters,
  sort,
  onHotelsChange,
  onLoadingChange,
  onResultChange,
}) {
  console.log("searchData in paylaod", searchData);
  const { selectedCurrency } = useCurrencyStore();
  const { data: wishlistIdsData } = useWishlistIds();
  const wishlistIds = useMemo(
    () => new Set(wishlistIdsData || []),
    [wishlistIdsData],
  );
  console.log("wishlistIdsData", wishlistIdsData);
  console.log("wishlistIds", wishlistIds);
  const payload = useMemo(() => {
    if (!searchData?.city && !searchData?.cityData?.id) {
      return null;
    }

    return {
      HotelSeedValue: "",
      CheckInDate: searchData?.checkIn
        ? dayjs(searchData.checkIn).format("MM/DD/YYYY")
        : "",
      CheckOutDate: searchData?.checkOut
        ? dayjs(searchData.checkOut).format("MM/DD/YYYY")
        : "",
      currency: selectedCurrency?.code || "INR",
      HotelRoomDetail: [
        {
          AdultCount: searchData?.adults || 1,
          ChildCount: searchData?.children || 0,
          Child1Age: searchData?.childAges?.[0] || 0,
          Child2Age: searchData?.childAges?.[1] || 0,
        },
      ],
      fullName: searchData?.city || "",
      id: searchData?.cityData?.id || "",
      stateName: searchData?.cityData?.stateName || "",
      countryCode: searchData?.cityData?.countryCode || "",
      RoomCount: searchData?.rooms || 1,
      filters: {
        search: filters?.search || "",
        freeCancellation: filters?.freeCancellation || false,
        starRating: filters?.starRating || "",
        minPrice: filters?.minPrice || "",
        maxPrice: filters?.maxPrice || "",
      },
      sort: sort || "",
    };
  }, [searchData, filters, sort, selectedCurrency?.code]);

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
        /*
          EARLY TRIGGER
        */
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
    console.log("RAW API RESPONSE", data?.pages?.[0]?.data?.hotels?.[0]);
    return Array.from(
      new Map(allHotels.map((hotel) => [hotel.hotelId, hotel])).values(),
    );
  }, [data]);

  console.log("HOTELS in hotelList page ", hotels);
  const currencySymbol = data?.pages?.[0]?.data?.currencySymbol || "₹";
  const mappedHotels = useMemo(() => {
    return hotels.map((hotel) => ({
      id: hotel.hotelId,
      currencySymbol: currencySymbol,
      name: hotel.hotelName || "Hotel Name",
      hotelkey: hotel.hotelkey || hotel.hotelkey || hotel.hotelkey || "",
      facilities: hotel.facilities || [],
      location: hotel.location || hotel.address || "Location",
      latitude: hotel.latitude || 0,
      longitude: hotel.longitude || 0,
      address: hotel.address || "",
      rating: Number(hotel.starRating || 0),
      reviews: hotel.reviewCount || 0,
      price: Number(hotel.basePrice  || hotel.basePrice  || 0) || 0,
      oldPrice:
        hotel.oldPrice || (hotel.price ? Number(hotel.price) + 1500 : 0),
      propertyType: hotel.propertyType || "Hotel",
      searchKey:
        data?.pages?.[0]?.data?.searchKey ||
        data?.pages?.[0]?.data?.SearchKey ||
        "",
      image:
        hotel.image ||
        hotel.thumbnail ||
        hotel.hotelImage ||
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
      images:
        hotel.images?.length > 0
          ? hotel.images
          : [
              hotel.image ||
                hotel.thumbnail ||
                hotel.hotelImage ||
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
            ],

      tags: hotel.facilities?.slice(0, 3) || [],
      starRating: hotel.starRating || "",
      description: hotel.description || "",
      freeCancellation: hotel.freeCancellation || false,
      tax: hotel.platformfeeandtax || 0,
    }));
  }, [hotels, data]);

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
