"use client";

import { Spin } from "antd";
import { useMemo } from "react";
import { useInfiniteHotels } from "../hooks/useInfiniteHotels";

export default function RelatedHotels({ cityId, currentHotelId }) {
  const params = useMemo(() => {
    return {
      id: cityId,
    };
  }, [cityId]);

  const { data, isLoading } = useInfiniteHotels(params);

  const hotels =
    data?.pages?.[0]?.data?.data
      ?.filter((hotel) => hotel?.hotelMeta?.hotelId !== currentHotelId)
      ?.slice(0, 4) || [];

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
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-xl font-semibold text-gray-900">
        Similar Hotels
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {hotels.map((hotel) => (
          <div
            key={hotel?.hotelMeta?.hotelId}
            className="rounded-xl border border-gray-100 p-4"
          >
            <h4 className="line-clamp-2 font-medium text-gray-900">
              {hotel?.hotelMeta?.hotelName || "Hotel"}
            </h4>

            <p className="mt-2 text-sm text-gray-500">
              {hotel?.hotelMeta?.cityName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
