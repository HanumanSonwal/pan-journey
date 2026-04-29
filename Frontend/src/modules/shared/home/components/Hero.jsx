"use client";

import { HOME_TABS } from "@/modules/shared/config/homeTabs";
import { useState } from "react";
import SearchButton from "./SearchButton";
import Tabs from "./Tabs";

import BusSearchForm from "@/modules/bus/components/BusSearchForm";
import FlightSearchForm from "@/modules/flight/components/FlightSearchForm";
import HotelSearchForm from "@/modules/hotel/components/HotelSearchForm";

const FORM_MAP = {
  hotel: HotelSearchForm,
  flight: FlightSearchForm,
  bus: BusSearchForm,
};

export default function Hero() {
  const enabledTabs = HOME_TABS.filter((t) => t.enabled);
  const [activeTab, setActiveTab] = useState(enabledTabs[0].key);

  const ActiveForm = FORM_MAP[activeTab];

  return (
    <div className="relative w-full min-h-[90vh]">
      
      {/* Background */}
      <div className="absolute top-0 w-full h-[50%] bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center" />
      <div className="absolute bottom-0 w-full h-[50%] bg-[#EDF7FF]" />

      {/* Content */}
      <div className="relative flex items-center justify-center min-h-[80vh] px-4">
        
        {/* MAIN BOX (WIDTH INCREASED) */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[1300px] mx-auto p-8 pb-24">

          {/* Tabs */}
          <Tabs
            tabs={enabledTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Heading */}
          <h2 className="text-center text-[#72C0F0] text-3xl font-bold mb-6">
            Find What You Are Looking For
          </h2>

          {/* Dynamic Form */}
          {ActiveForm && <ActiveForm />}

          {/* Search Button */}
          <SearchButton />
        </div>

      </div>
    </div>
  );
}
