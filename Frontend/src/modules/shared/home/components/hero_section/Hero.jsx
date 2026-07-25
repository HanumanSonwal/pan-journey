"use client";

import BusSearchForm from "@/modules/bus/components/BusSearchForm";
import FlightSearchForm from "@/modules/flight/components/FlightSearchForm";
import HotelSearchForm from "@/modules/hotel/components/hotels/HotelSearchForm";
import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import { navigateToHotels } from "@/modules/hotel/utils/hotelNavigation";
import { HOME_TABS } from "@/modules/shared/config/homeTabs";
import styles from "@/modules/shared/home/components/styles/Hero.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Tabs from "./Tabs";

const FORM_MAP = {
  hotel: HotelSearchForm,
  flight: FlightSearchForm,
  bus: BusSearchForm,
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState(
    HOME_TABS.find((t) => t.enabled)?.key,
  );

  const router = useRouter();

  const { draftSearchData, applySearch } = useHotelSearchStore();

  const ActiveForm = FORM_MAP[activeTab];

  const [destinationError, setDestinationError] = useState(false);

  const handleSearch = () => {
    if (!draftSearchData?.city?.trim()) {
      setDestinationError(true);
      return;
    }

    applySearch();
    navigateToHotels(router, draftSearchData);
  };

  return (
    <section
      id="hero-search"
      className="relative w-full overflow-visible bg-[#EDF7FF]"
    >
      {/* Hero Background */}
      <div className={styles.heroBg} />

      {/* Search Card */}
      <div className="!2xl:max-w-[99%] absolute top-8 left-1/2 z-20 w-[95%] -translate-x-1/2 sm:top-10 sm:w-[94%] md:top-12 md:w-[92%] lg:top-[56%] lg:w-[94%] xl:top-[61%] xl:w-[82%] 2xl:top-[66%]">
        <div className="w-full rounded-2xl border border-gray-200 bg-[#F8F8F8] p-4 shadow-xl sm:p-5 md:p-6 lg:p-7 xl:p-8">
          <Tabs
            tabs={HOME_TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {ActiveForm && (
            <ActiveForm
              destinationError={destinationError}
              setDestinationError={setDestinationError}
              onSearch={handleSearch}
            />
          )}
        </div>
      </div>
    </section>
  );
}
