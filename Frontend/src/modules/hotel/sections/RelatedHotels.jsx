"use client";

import { slugify } from "@/utils/slug/slugify";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import RelatedHotelCard from "../cards/RelatedHotelCard";
import { useInfiniteHotels } from "../hooks/useInfiniteHotels";
import { useSelectedHotelStore } from "../store/selectedHotel.store";

export default function RelatedHotels({
  cityId,
  currentHotelId,
  cityName,
  searchData,
}) {
  const router = useRouter();
  const { setSelectedHotel } = useSelectedHotelStore();
  const params = useMemo(() => {
    if (!searchData?.cityData?.id) return null;
    return {
      HotelSeedValue: "",
      CheckInDate: searchData?.checkIn,
      CheckOutDate: searchData?.checkOut,
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
    };
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
    const hotelSlug = slugify(hotel?.hotelName);

    setSelectedHotel({
      hotelMeta: {
        hotelId: hotel.hotelId,
        cityId: searchData?.cityData?.id,
        stateName: searchData?.cityData?.stateName,
        countryCode: searchData?.cityData?.countryCode,
        cityName: searchData?.city,
        hotelSlug,
      },
      hotelKey: hotel?.hotelkey,
    });
    router.push(
      `/hotel-details/${slugify(
        cityName || "",
      )}/${hotelSlug}?hid=${hotel.hotelId}&cityId=${searchData?.cityData?.id}`,
    );
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
