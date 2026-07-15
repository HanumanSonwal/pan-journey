"use client";

import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import RelatedHotelCard from "../cards/RelatedHotelCard";
import { useInfiniteHotels } from "../hooks/useInfiniteHotels";
import { useSelectedHotelStore } from "../store/selectedHotel.store";
import { buildHotelPayload } from "../utils/buildHotelPayload";
import { navigateToHotelDetails } from "../utils/navigateToHotelDetails";

export default function RelatedHotels({
  cityId,
  currentHotelId,
  cityName,
  searchData,
}) {
  const router = useRouter();
  const { setSelectedHotel } = useSelectedHotelStore();

  const params = useMemo(() => {
    return buildHotelPayload({
      searchData,
    });
  }, [searchData]);

  const { data, isLoading } = useInfiniteHotels(params);
  const hotels = useMemo(() => {
    const rawHotels = data?.pages?.[0]?.data?.hotels || [];
    const filtered = rawHotels.filter(
      (hotel) => String(hotel?.hotelId) !== String(currentHotelId),
    );
    const uniqueHotels = filtered.filter(
      (hotel, index, self) =>
        index ===
        self.findIndex((h) => String(h.hotelId) === String(hotel.hotelId)),
    );
    return uniqueHotels.slice(0, 4);
  }, [data, currentHotelId]);

  if (!cityId) return null;

  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <Spin />
      </div>
    );
  }

  if (!hotels.length) {
    return null;
  }

  const handleHotelClick = (hotel) => {
    navigateToHotelDetails({
      router,
      hotel,
      searchData,
      setSelectedHotel,
    });
  };
  return (
    <div className="mt-8">
      <h3 className="mb-5 text-2xl font-semibold text-[#303030]">
        Similar Hotels
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {hotels.map((hotel) => {
          return (
            <RelatedHotelCard
              key={hotel?.hotelId}
              hotel={hotel}
              onClick={() => handleHotelClick(hotel)}
            />
          );
        })}
      </div>
    </div>
  );
}
