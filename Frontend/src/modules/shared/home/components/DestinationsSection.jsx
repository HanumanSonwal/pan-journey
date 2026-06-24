"use client";

import SectionHeading from "@/components/common/SectionHeading";
import {
  destinations,
  tabs,
} from "@/modules/shared/home/components/data/destinationsData";
import Image from "next/image";
import { useState } from "react";
import ButtonTab from "./vacation_sections/ButtonTab";

export default function DestinationsSection() {
  const [activeTab, setActiveTab] = useState("All Destinations");

  const activeDestinations =
    destinations[activeTab] || destinations["All Destinations"];

  return (<section className="!mt-[-30px] overflow-hidden bg-[#EDF7FF] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-0 sm:py-0 md:py-0 text-black">
    <div className="mx-auto w-full max-w-[1600px] lg:w-[88.87%]">
      {/* Heading */}
      <SectionHeading
        title="Popular Destinations"
        description="We’re committed to offering more than just products we provide exceptional experiences."
      />

      {/* Tabs */}
      <div className="mt-5 flex justify-center">
        <div className="scrollbar-hide flex max-w-full items-center gap-4 sm:gap-6 lg:gap-8 overflow-x-auto whitespace-nowrap pb-2">
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
      <div className="mt-8 md:hidden">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {activeDestinations.map((item) => (
            <div
              key={item.id}
              className="w-[230px] flex-shrink-0"
            >
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
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-xl
        sm:rounded-2xl
        lg:rounded-[20px]
        group
        cursor-pointer
        shadow-md
        hover:shadow-xl
        transition-all
        duration-500

        h-[260px]
        sm:h-[300px]
        md:h-[340px]
        ${item.height}
      `}
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
      <div className="absolute left-3 bottom-3 z-10 sm:left-5 sm:bottom-5 lg:left-7 lg:bottom-7">
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          {item.title}
        </h3>

        <p className="mt-1 text-xs sm:text-sm md:text-base lg:text-lg text-white/90">
          {item.subtitle}
        </p>
      </div>
    </div>

  );

}
