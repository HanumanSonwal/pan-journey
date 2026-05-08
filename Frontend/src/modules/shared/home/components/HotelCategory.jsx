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
    <div className="py-10 bg-[#edf7ff] mt-[-45px] ">
      <div className="!w-[96%] mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="!text-4xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Places As Per Your Vibe
          </h1>

          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
            We're committed to offering more than just products—<br/>
            we provide exceptional experiences.
          </p>
        
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 text-[#3D3D3D] text-xl">
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

