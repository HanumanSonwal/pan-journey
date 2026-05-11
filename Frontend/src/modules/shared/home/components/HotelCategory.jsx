"use client";

import HotelType from "@/modules/shared/home/components/data/HotelType";
import { useState } from "react";
import ButtonTab from "./ButtonTab";

const HotelCategory_Map = {
  Beachvacations: "Beach Vacations",
  MountainVacations: "Mountain Vacations",
  LuxuryStays: "Luxury Stays",
  WeekendGetaways: "Weekend Getaways",
};

export default function HotelCategory() {
  const enabledTabs = Object.keys(HotelCategory_Map);

  const tabs = enabledTabs.map((key) => ({
    key: key,
    label: HotelCategory_Map[key],
    icon: `/icons/${key}.png`,
  }));

  const [activeTab, setActiveTab] = useState(enabledTabs[0]);

  return (
    <div className="bg-[#edf7ff] pt-12 pb-10 relative z-[-10] mt-[-4]   mt-[-10px] max-lg:mt-[-50px] max-md:mt-[-10px]">
      <div className="w-[96%] mx-auto px-4 !boder-none">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
            Places As Per Your Vibe
          </h1>

          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            We're committed to offering more than just products—
            <br className="hidden sm:block" />
            we provide exceptional experiences.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide">
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

