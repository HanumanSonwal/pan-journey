"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import { useDestinations } from "@/modules/shared/home/hooks/useDestinations";
import { VacationsimageMap } from "../data/VacationsData";

export default function VacationType({ activeTab }) {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const { data = [] } = useDestinations(activeTab);
  const { draftSearchData } = useHotelSearchStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Responsive Cards
  useEffect(() => {
    if (!mounted) return;

    const updatePerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPerPage(data.length); // mobile
      } else if (width < 1024) {
        setPerPage(2); // tablet
      } else {
        setPerPage(4); // desktop FIXED (3 → 4)
      }
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => window.removeEventListener("resize", updatePerPage);
  }, [mounted, data.length]);

  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  const next = () => {
    if (index + perPage < data.length) {
      setIndex((prev) => prev + perPage);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - perPage);
    }
  };

  const visibleData =
    perPage === data.length
      ? data
      : data.slice(index, index + perPage);

  if (!mounted) return null;

  const handleSearch = (item) => {
    const query = new URLSearchParams({
      city:
        item?.City?.split(",")[0]
          ?.trim()
          ?.toLowerCase()
          ?.replace(/[^a-z0-9\s-]/g, "")
          ?.replace(/\s+/g, "-") || "",

      cityName: item?.City || "",
      cityId: item?.id || "",

      checkIn: draftSearchData?.checkIn || "",
      checkOut: draftSearchData?.checkOut || "",

      rooms: String(draftSearchData?.rooms || 1),
      adults: String(draftSearchData?.adults || 2),
      children: String(draftSearchData?.children || 0),

      pets: draftSearchData?.pets ? "true" : "false",
    });

    router.push(`/hotels?${query.toString()}`);
  };
  return (
    <div className="px-0 xs:px-1 sm:px-1 md:px-2 lg:px-4 xl:px-4 py-2 -mt-7 !sm:-mt-[50px] md:mt-[2px] lg:mt-[2px]
">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* PREV BUTTON - Hide on Mobile */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="hidden lg:flex h-10 w-10 items-center justify-center !text-[27px] !text-black"
        >
          <LeftOutlined />
        </button>

        {/* Cards */}
        <div className="flex-1 overflow-hidden">
          {/* Mobile Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide  lg:hidden">
            {data.map((item, idx) => {
              const image =
                VacationsimageMap?.[activeTab]?.[
                idx % VacationsimageMap?.[activeTab]?.length
                ];

              return (
                <div
                  key={item.id || idx}
                  className="min-w-[159px] max-w-[159px] overflow-hidden rounded-[2px] bg-white shadow-sm transition !p-0 !m-0"
                >
                  {/* Image */}
                  <div className="relative h-[150px] overflow-hidden ">
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="bg-white px-2 py-1 text-center">
                    <h2 className="text-[14px] font-semibold text-gray-900 leading-tight line-clamp-1">
                      {item.name}
                    </h2>

                    <p className=" text-[11px] text-gray-600 leading-tight line-clamp-1">
                      {item.City}
                    </p>

                    <button
                      onClick={() => handleSearch(item)}
                      className=" text-[12px] lg:text-[16px] font-medium !text-[#72C0F0]"
                    >
                      View Details
                    </button>

                    <div className="mx-auto mt-1 w-20 border-b border-dotted !border-[#5FA8C9]" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tablet + Desktop Grid */}
          <div className="hidden lg:grid mb-8 grid-cols-4 gap-4 ">
            {visibleData.map((item, idx) => {
              const image =
                VacationsimageMap?.[activeTab]?.[
                (index + idx) %
                VacationsimageMap?.[activeTab]?.length
                ];

              return (
                <div
                  key={item.id || idx}
                  className="overflow-hidden rounded-[5px] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-[302px] overflow-hidden">
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      priority={idx === 0}
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="mt-[-10px] bg-white px-4 py-5 text-center">
                    <h2 className="text-[22px] font-semibold text-gray-900">
                      {item.name}
                    </h2>

                    <p className="mt-[-7px] text-[14px] text-gray-700">
                      {item.City}
                    </p>
                    <button
                      onClick={() => handleSearch(item)}
                      className="flex w-full items-center justify-center gap-1 !text-[18px] font-medium !text-[#5FA8C9] hover:text-[#3D8FB3] transition-colors duration-200"
                    >
                      View Details →
                    </button>

                    <div className="mx-auto mt-1 w-36 border-b border-dotted border-[#5FA8C9]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NEXT BUTTON - Hide on Mobile */}
        <button
          onClick={next}
          disabled={index + perPage >= data.length}
          className="hidden lg:flex h-10 w-10 items-center justify-center !text-[27px] !text-black"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
