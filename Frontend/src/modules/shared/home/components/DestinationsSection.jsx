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

  return (
    <section className="mt-[-10px] overflow-hidden bg-[#EDF7FF] px-4 py-16 text-black md:pb-15">
      <div className="mx-auto w-[88.87%] !mt-[-66] ">
        {/* Heading */}
        <SectionHeading
          title=" Popular Destinations"
          description=" We’re committed to offering more than just products  we provide exceptional experiences."
        />

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="scrollbar-hide mb-[-14] flex max-w-full items-center gap-8 overflow-x-auto pb-2 text-[20px] md:gap-10 mt-5 ">
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

        {/* First Layout */}
        {activeDestinations.length >= 2 && (
          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
            {activeDestinations.slice(0, 2).map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Second Layout */}
        {activeDestinations.length > 2 && (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {activeDestinations.slice(2, 5).map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Third Layout */}
        {activeDestinations.length > 5 && (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {activeDestinations.slice(5, 7).map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Fourth Layout */}
        {activeDestinations.length > 7 && (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            {activeDestinations.slice(7, 10).map((item) => (
              <DestinationCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* Card Component */
function DestinationCard({ item }) {
  return (
    <div
      className={`relative ${item.height} group cursor-pointer overflow-hidden rounded-[20px]`}
    >
      {/* Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-7 left-7 z-10">
        <h3 className="text-3xl font-bold text-white md:text-4xl">
          {item.title}
        </h3>

        <p className="mt-2 text-lg text-white/90">{item.subtitle}</p>
      </div>
    </div>
  );
}
