"use client";

import { Spin } from "antd";
import { useMemo } from "react";
import { useInfiniteHotels } from "../hooks/useInfiniteHotels";
import RelatedHotelCard from "../cards/RelatedHotelCard";

function slugify(value) {
  return value
    ?.toLowerCase()
    ?.replace(/[^a-z0-9\s-]/g, "")
    ?.replace(/\s+/g, "-");
}

export default function RelatedHotels({ cityId, currentHotelId, cityName }) {
  const params = useMemo(() => {
    return {
      id: cityId,
    };
  }, [cityId]);

  const { data, isLoading } = useInfiniteHotels(params);

  const hotels = useMemo(() => {
    const rawHotels = data?.pages?.[0]?.data?.hotels || [];

    return rawHotels
      .filter((hotel) => String(hotel?.hotelId) !== String(currentHotelId))
      .slice(0, 4);
  }, [data, currentHotelId]);

  console.log("RELATED HOTELS", hotels);

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

  return (
    <div className="mt-8">
      <h3 className="mb-5 text-2xl font-semibold text-[#303030]">
        Similar Hotels
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {hotels.map((hotel) => {
          const hotelSlug = slugify(hotel?.hotelName);

          const citySlug = slugify(cityName || "hotel");

          return (
            <RelatedHotelCard
              key={hotel?.hotelId}
              hotel={hotel}
              href={`/hotel-details/${citySlug}/${hotelSlug}`}
            />
          );
        })}
      </div>
    </div>
  );
}
