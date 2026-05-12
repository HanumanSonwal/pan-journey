"use client";

import { useState } from "react";

import { tabs } from "../data/VacationTabs";
import ButtonTab from "./ButtonTab";
import HotelType from "./VacationType";

export default function VacationSection() {
  const [activeTab, setActiveTab] = useState("beach");

  return (
    <div className="relative bg-[#edf7ff] pt-12 pb-10">
      <div className="mx-auto w-[96%] px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
            Places As Per Your Vibe
          </h1>

          <p className="mx-auto max-w-md text-sm text-gray-500 sm:text-base">
            We're committed to offering more than just products—
            <br className="hidden sm:block" />
            we provide exceptional experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="scrollbar-hide mb-10 flex justify-center overflow-x-auto">
          <ButtonTab
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Hotels */}
        <HotelType activeTab={activeTab} />
      </div>
    </div>
  );
}
