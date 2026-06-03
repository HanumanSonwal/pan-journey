"use client";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import { useDestinations } from "@/modules/shared/home/hooks/useDestinations";
import { useRouter } from "next/navigation";
import { VacationsimageMap } from "../data/VacationsData";

export default function VacationType({ activeTab }) {
  const [index, setIndex] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { data = [] } = useDestinations(activeTab);

  const { searchData } = useHotelSearchStore();

  console.log(data, "DATA in destinations");

  // FIX HYDRATION
  useEffect(() => {
    setMounted(true);
  }, []);

  // RESPONSIVE
  useEffect(() => {
    if (!mounted) return;

    const updatePerPage = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setPerPage(1);
      } else if (width < 1024) {
        setPerPage(2);
      } else {
        setPerPage(4);
      }
    };

    updatePerPage();

    window.addEventListener("resize", updatePerPage);

    return () => {
      window.removeEventListener("resize", updatePerPage);
    };
  }, [mounted]);

  // RESET SLIDER ON TAB CHANGE
  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  // NEXT
  const next = () => {
    if (index + perPage < data.length) {
      setIndex((prev) => prev + perPage);
    }
  };

  // PREV
  const prev = () => {
    if (index > 0) {
      setIndex((prev) => prev - perPage);
    }
  };

  // VISIBLE DATA
  const visibleData = data.slice(index, index + perPage);

  // PREVENT HYDRATION ERROR
  if (!mounted) return null;

  const handleSearch = (item) => {
    const query = new URLSearchParams({
      city: item?.City || "",
      cityId: item?.id || "",
      checkIn: searchData?.checkIn || "",
      checkOut: searchData?.checkOut || "",
      rooms: String(searchData?.rooms || 1),
      adults: String(searchData?.adults || 2),
      children: String(searchData?.children || 0),
      pets: searchData?.pets ? "true" : "false",
    });

    router.push(`/hotels?${query.toString()}`);
  };
  return (
    <div className="px-2 py-2">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* PREV BUTTON */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex h-10 w-10 items-center justify-center !text-[27px] !text-black"
        >
          <LeftOutlined />
        </button>

        {/* CARDS */}
        <div className="flex-1 overflow-hidden">
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleData.map((item, idx) => {
              const image =
                VacationsimageMap?.[activeTab]?.[
                  (index + idx) % VacationsimageMap?.[activeTab]?.length
                ];

              return (
                <div
                  key={item.id || idx}
                  className="overflow-hidden rounded-[5px] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* IMAGE */}
                  <div className="relative h-[310px] overflow-hidden">
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      priority={idx === 0}
                      loading={idx === 0 ? "eager" : "lazy"}
                      quality={85}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="mt-[-10px] bg-[#FFFFFF] px-4 py-5 text-center">
                    <h2 className="text-[14px] font-semibold text-gray-900 sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]">
                      {item.name}
                    </h2>

                    <p className="mt-[-7px] text-gray-800 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px]">
                      {item.City}
                    </p>

                    <button
                      onClick={() => handleSearch(item)}
                      className="flex w-full cursor-pointer items-center justify-center gap-1 !text-[14px] font-medium !text-[#5FA8C9] transition hover:text-[#3D8FB3] sm:!text-[16px] md:!text-[18px] lg:!text-[22px]"
                    >
                      View Details →
                    </button>

                    <div className="mx-auto mt-1 w-24 border-b border-dotted border-[#5FA8C9] sm:w-28 md:w-32 lg:w-36 xl:w-40" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={next}
          disabled={index + perPage >= data.length}
          className="flex h-10 w-10 items-center justify-center !text-[27px] !text-black"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
