"use client";

import dayjs from "dayjs";
import HotelCard from "../../../shared/home/components/HotelCard";
import { useHotels } from "../../hooks/useHotels";

export default function HotelList({ searchData, filters, sort, page }) {

  const params = {
    HotelSeedValue: "",
    CheckInDate: dayjs(searchData?.checkIn).format("MM/DD/YYYY"),
    CheckOutDate: dayjs(searchData?.checkOut).format("MM/DD/YYYY"),
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
      ...filters,
    },
    sort,
    pagination: {
      page,
      limit: 10,
    },
  };

  const { data, isLoading, isError, error } = useHotels(params);
  const hotels = data?.hotels || [];
  if (isLoading) {
    return <div className="py-10 text-center">Loading hotels...</div>;
  }
  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error?.message || "Failed to fetch hotels"}
      </div>
    );
  }

  if (!hotels.length) {
    return <div className="py-10 text-center">No hotels found 😔</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
