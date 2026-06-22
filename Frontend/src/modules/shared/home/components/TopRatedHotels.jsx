"use client";

import { Card, Rate, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import { useDestinations } from "@/modules/shared/home/hooks/useDestinations";

export default function TopRatedHotels() {
  const { data = [], isLoading } = useDestinations("Toprated");
  const { draftSearchData } = useHotelSearchStore();
  const router = useRouter();

  const [perRow, setPerRow] = useState(4);
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);

  const topStartX = useRef(0);
  const bottomStartX = useRef(0);

  // ✅ RESPONSIVE FIX
  useEffect(() => {
    const updatePerRow = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setPerRow(2); // 📱 mobile = 2 cards
      } else if (width < 768) {
        setPerRow(2); // small mobile
      } else if (width < 1024) {
        setPerRow(3); // 📟 tablet (768px = 3 cards)
      } else {
        setPerRow(4); // 💻 desktop = original
      }
    };

    updatePerRow();
    window.addEventListener("resize", updatePerRow);
    return () => window.removeEventListener("resize", updatePerRow);
  }, []);

  const topData = useMemo(() => data.slice(0, 10), [data]);
  const bottomData = useMemo(() => data.slice(10, 20), [data]);

  const handleSearch = (hotel) => {
    const citySlug =
      hotel?.name
        ?.toLowerCase()
        ?.replace(/[^a-z0-9\s-]/g, "")
        ?.replace(/\s+/g, "-") || "";

    const query = new URLSearchParams({
      city: citySlug,
      cityName: hotel?.name || "",
      cityId: hotel?.id || "",
      checkIn: draftSearchData?.checkIn || "",
      checkOut: draftSearchData?.checkOut || "",
      rooms: String(draftSearchData?.rooms || 1),
      adults: String(draftSearchData?.adults || 2),
      children: String(draftSearchData?.children || 0),
      pets: draftSearchData?.pets ? "true" : "false",
    });

    router.push(`/hotels?${query.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center bg-[#EDF7FF]">
        <Spin size="large" />
      </div>
    );
  }

  // ✅ CARD (FULL RESPONSIVE UI FIX)
  const renderCard = (hotel, idx) => (
    <div
      key={hotel.id}
      onClick={() => handleSearch(hotel)}
      className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 px-1 flex-shrink-0"
    >
      <Card
        hoverable
        className="
           w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl
          border-0 shadow-md transition
        "
        cover={
          <div className="relative overflow-hidden h-[190px] sm:h-[160px] md:h-[200px] lg:h-[240px]">
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              priority={idx < 2}
              className="object-cover"
            />
          </div>
        }
      >
        <div className="text-center">

          {/* NAME */}
          <h3
            className="
      font-semibold text-gray-800
      text-[12px]
      sm:text-sm
      md:text-base
      lg:text-lg
      leading-tight
    "
          >
            {hotel.name}
          </h3>

          {/* DESCRIPTION */}
          <p
            className="
      mt-1 text-gray-500 line-clamp-2 md:line-clamp-3
      text-[10px]
      sm:text-xs
      md:text-sm
      leading-4 sm:leading-5
    "
          >
            {hotel.desc}
          </p>

          {/* RATING */}
          <div className="mt-1 sm:mt-2 md:mt-3 flex justify-center">
            <Rate
              disabled
              allowHalf
              defaultValue={hotel.rating}
              className="scale-[0.75] sm:scale-90 md:scale-100"
            />
          </div>



        </div>
      </Card>
    </div>
  );

  return (
    <div className="mt-[-10px] bg-[#EDF7FF] px-0 sm:px-0 md:px-6 py-4 md:py-10">

      <div className="mx-auto w-full lg:w-[85.87%] rounded-[9px] sm:rounded-[9px] md:rounded-3xl bg-gradient-to-br from-sky-400 to-teal-700 px-2 sm:px-4 md:px-8 py-4 sm:py-8 md:py-12">

        {/* TITLE */}
        <div className="mb-4 md:mb-0 text-center text-white">
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-4xl font-bold">
            Top Rated Hotels
          </h2>
        </div>

        {/* TOP ROW */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${topIndex * (100 / perRow)}%)`,
            }}
          >
            {topData.map(renderCard)}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-3 sm:mt-6 md:mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${bottomIndex * (100 / perRow)}%)`,
            }}
          >
            {bottomData.map(renderCard)}
          </div>
        </div>

      </div>
    </div>
  );
}
