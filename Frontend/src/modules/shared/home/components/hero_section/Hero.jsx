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
  console.log(draftSearchData, "draft search home");

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
      className="relative w-full bg-[#EDF7FF] pb-0 md:pb-30 lg:pb-45 xl:pb-15"
      id="hero-search"
    >
      <div className={styles.heroBg} />
      <div className="absolute top-10 left-1/2 w-[92%] -translate-x-1/2 px-0 min-[700px]:top-[22%] min-[700px]:w-[92%] lg:top-[27%] lg:w-[80.83%] xl:top-[50%]">
        <div className="w-full rounded-xl bg-[#f8f8f8] p-6 pb-20 shadow-2xl min-[700px]:p-6 md:p-8 md:pb-6">
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
