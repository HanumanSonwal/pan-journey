"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import { buildSearchData } from "@/modules/hotel/utils/buildSearchData";
import {
  destinations,
  tabs,
} from "@/modules/shared/home/components/data/destinationsData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonTab from "./vacation_sections/ButtonTab";
import { navigateToHotels } from "@/modules/hotel/utils/hotelNavigation";
export default function DestinationsSection() {
  const [activeTab, setActiveTab] = useState("All Destinations");

  const activeDestinations =
    destinations[activeTab] || destinations["All Destinations"];

  return (
    <section className="!mt-[-30px] overflow-hidden bg-[#EDF7FF] !px-0 px-3 py-0 text-black sm:!mt-[-30px] sm:!px-0 sm:py-0 md:!mt-[-30px] md:!px-2 md:py-24 lg:!mt-[-70px] lg:!px-3 xl:!mt-[-90px] xl:!px-4 2xl:!mt-[-50px] 2xl:!px-0">
      <div className="mx-auto w-full lg:!mt-[-170px] lg:w-[88.87%] xl:!mt-[10px]">
        {/* Heading */}
        <SectionHeading
          title="Popular Destinations"
          description="We’re committed to offering more than just products we provide exceptional experiences."
        />

        {/* Tabs */}
        <div className="mt-5 flex justify-center">
          <div className="scrollbar-hide flex max-w-full items-center gap-4 overflow-x-auto pb-2 whitespace-nowrap sm:gap-6 lg:gap-8">
            <ButtonTab
              tabs={tabs.map((tab) => ({
                key: tab,
                label: tab,
              }))}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="mt-4 md:hidden">
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
            {activeDestinations.map((item) => (
              <div key={item.id} className="w-[230px] flex-shrink-0">
                <DestinationCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block">
          {/* First Row */}
          {activeDestinations.length >= 2 && (
            <div className="mt-16 grid grid-cols-2 gap-5">
              {activeDestinations.slice(0, 2).map((item) => (
                <DestinationCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Second Row */}
          {activeDestinations.length > 2 && (
            <div className="mt-5 grid grid-cols-3 gap-5">
              {activeDestinations.slice(2, 5).map((item) => (
                <DestinationCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Third Row */}
          {activeDestinations.length > 5 && (
            <div className="mt-5 grid grid-cols-2 gap-5">
              {activeDestinations.slice(5, 7).map((item) => (
                <DestinationCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Fourth Row */}
          {activeDestinations.length > 7 && (
            <div className="mt-5 grid grid-cols-3 gap-5">
              {activeDestinations.slice(7, 10).map((item) => (
                <DestinationCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
/* ================= Destination Card ================= */

function DestinationCard({ item }) {
  const router = useRouter();
  const { draftSearchData } = useHotelSearchStore();

  const handleSearch = () => {
    const searchData = buildSearchData({
      baseSearchData: draftSearchData,
      city: item.title,
      cityId: item.id,
    });

    navigateToHotels(router, searchData);
  };

  return (
    <div
      onClick={handleSearch}
      className={`group relative h-[260px] cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-500 hover:shadow-xl sm:h-[300px] sm:rounded-2xl md:h-[340px] lg:rounded-[20px] ${item.height} `}
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width:1024px) 230px, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-3 left-3 z-10 sm:bottom-5 sm:left-5 lg:bottom-7 lg:left-7">
        <h3 className="text-lg font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
          {item.title}
        </h3>

        <p className="mt-1 text-xs text-white/90 sm:text-sm md:text-base lg:text-lg">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
