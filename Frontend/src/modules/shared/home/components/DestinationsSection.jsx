"use client";

import Image from "next/image";
import { useState } from "react";

const tabs = [
  "All Destinations",
  "India",
  "Maldives",
  "Bali",
  "Vietnam",
  "London",
  "Dubai",
  "Thailand",
];

const destinations = [
  {
    id: 1,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination1.png",
    height: "h-[260px] md:h-[320px]",
  },
  {
    id: 2,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination2.png",
    height: "h-[260px] md:h-[320px]",
  },

  {
    id: 3,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination3.png",
    height: "h-[260px] md:h-[420px]",
  },
  {
    id: 4,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination4.png",
    height: "h-[260px] md:h-[420px]",
  },
  {
    id: 5,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination5.png",
    height: "h-[260px] md:h-[420px]",
  },

  {
    id: 6,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination1.png",
    height: "h-[260px] md:h-[320px]",
  },
  {
    id: 7,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination2.png",
    height: "h-[260px] md:h-[320px]",
  },

  {
    id: 8,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination3.png",
    height: "h-[260px] md:h-[420px]",
  },
  {
    id: 9,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination4.png",
    height: "h-[260px] md:h-[420px]",
  },
  {
    id: 10,
    title: "Bali",
    subtitle: "Land of the Gods",
    image: "/images/destination5.png",
    height: "h-[260px] md:h-[420px]",
  },
];

export default function DestinationsSection() {
  const [activeTab, setActiveTab] = useState("All Destinations");

  return (
    <section className="overflow-hidden bg-[#F5F7F9] px-4 py-16 text-black md:pb-15  mt-[-10px]">
      <div className="mx-auto w-[88.87%]">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[#222] md:text-4xl">
            Popular Destinations
          </h2>

          <p className="mx-auto mt-5 max-w-[620px] text-lg  text-gray-600">
            We’re committed to offering more than just products— we provide
            exceptional experiences.
          </p>
        </div>

        {/* Tabs */}
        {/* Tabs */}
        <div className="flex justify-center">
          <div className="scrollbar-hide mt-14 flex max-w-full items-center gap-8 overflow-x-auto pb-4 md:gap-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-[22px] font-medium whitespace-nowrap transition-all duration-300 md:text-[28px] ${activeTab === tab
                    ? "font-semibold text-[#69B8E7]"
                    : "text-[#333] hover:text-[#69B8E7]"
                  }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute -bottom-3 left-0 h-[3px] w-full rounded-full bg-[#69B8E7]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 2 Image Layout */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {destinations.slice(0, 2).map((item) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div>

        {/* 3 Image Layout */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {destinations.slice(2, 5).map((item) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div>

        {/* 2 Image Layout */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          {destinations.slice(5, 7).map((item) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div>

        {/* 3 Image Layout */}
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          {destinations.slice(7, 10).map((item) => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div>
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
