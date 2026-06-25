"use client";

import BusSearchForm from "@/modules/bus/components/BusSearchForm";
import FlightSearchForm from "@/modules/flight/components/FlightSearchForm";
import HotelSearchForm from "@/modules/hotel/components/hotels/HotelSearchForm";
import { useHotelSearchStore } from "@/modules/hotel/store/serchData.store";
import { HOME_TABS } from "@/modules/shared/config/homeTabs";
import styles from "@/modules/shared/home/components/styles/Hero.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchButton from "./SearchButton";
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
    const updatedSearch = {
      ...draftSearchData,
      cityData: {
        id: draftSearchData?.cityData?.id || "",
        stateName:
          draftSearchData?.cityData?.stateName ||
          draftSearchData?.cityData?.state ||
          "",
        countryCode:
          draftSearchData?.cityData?.countryCode ||
          draftSearchData?.cityData?.country ||
          "",
      },
    };
    // APPLY SEARCH
    console.log("UPDATED SEARCH in hero =>", updatedSearch);
    console.log("CITY GOING TO URL in hero =>", updatedSearch?.city);
    applySearch();

    const citySlug =
      updatedSearch?.city
        ?.split(",")[0]
        ?.trim()
        ?.toLowerCase()
        ?.replace(/[^a-z0-9\s-]/g, "")
        ?.replace(/\s+/g, "-") || "";

    const query = new URLSearchParams({
      city: citySlug,
      cityId: updatedSearch?.cityData?.id || "",
      stateName: updatedSearch?.cityData?.stateName || "",
      countryCode: updatedSearch?.cityData?.countryCode || "",
      checkIn: updatedSearch?.checkIn || "",
      checkOut: updatedSearch?.checkOut || "",
      rooms: String(updatedSearch?.rooms || 1),
      adults: String(updatedSearch?.adults || 2),
      children: String(updatedSearch?.children || 0),
      pets: updatedSearch?.pets ? "true" : "false",
    });
    router.push(`/hotels?${query.toString()}`);
  };
  return (
    <section
      className="relative w-full bg-[#EDF7FF] pb-0 md:pb-30 lg:pb-45 xl:pb-15"
      id="hero-search"
    >
      <div className={styles.heroBg} />
      <div className="absolute top-10 left-1/2 w-[92%] -translate-x-1/2 px-0 min-[700px]:top-[22%] min-[700px]:w-[92%] lg:top-[27%] lg:w-[80.83%] xl:top-[40%]">
        <div className="w-full rounded-xl bg-white p-6 pb-20 shadow-2xl min-[700px]:p-6 md:p-8 md:pb-20">
          <Tabs
            tabs={HOME_TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <h2 className="mb-3 text-center text-[16px] font-bold text-[#72C0F0] min-[480px]:text-[18px] min-[700px]:text-[22px] lg:text-[28px] xl:text-[32px]">
            Find What You Are Looking For
          </h2>
          {ActiveForm && (
            <ActiveForm
              destinationError={destinationError}
              setDestinationError={setDestinationError}
            />
          )}
          <SearchButton onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
