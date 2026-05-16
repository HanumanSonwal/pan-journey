"use client";

import HotelContentLoader from "@/components/common/loder/HotelContentLoader";
import dayjs from "dayjs";
import { memo, useEffect, useMemo, useRef } from "react";
import HotelCard from "../../../shared/home/components/HotelCard";
import { useInfiniteHotels } from "../../hooks/useInfiniteHotels";
function HotelList({ searchData, filters, sort }) {
  const payload = useMemo(() => {
    if (!searchData?.cityData?.id) {
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

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.2,
      },
    );
    observer.observe(loadMoreRef.current);
    return () => {
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
  const mappedHotels = useMemo(() => {
    return hotels.map((hotel) => ({
      id: hotel.hotelId,
      name: hotel.hotelName || "Hotel Name",
      facilities: hotel.facilities || [],
      location: hotel.location || hotel.address || "Location",
      latitude: hotel.latitude || 0,
      longitude: hotel.longitude || 0,
      address: hotel.address || "",
      rating: Number(hotel.starRating || 0),
      reviews: hotel.reviewCount || 0,
      price: Number(hotel.price || hotel.minPrice || 0) || 0,
      oldPrice:
        hotel.oldPrice || (hotel.price ? Number(hotel.price) + 1500 : 0),
      propertyType: hotel.propertyType || "Hotel",
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
      tax: hotel.tax || 0,
    }));
  }, [hotels]);

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
    return <div className="py-10 text-center">No hotels found 😔</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* HOTELS */}
      {mappedHotels.map((hotel, index) => (
        <HotelCard key={hotel.id || index} hotel={hotel} />
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
