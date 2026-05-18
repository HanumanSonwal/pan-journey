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
  const { searchData } = useHotelSearchStore();
  const ActiveForm = FORM_MAP[activeTab];

  const handleSearch = () => {
    const query = new URLSearchParams({
      city: searchData?.city || "",
      cityId: searchData?.cityData?.id || "",
      checkIn: searchData?.checkIn || "",
      checkOut: searchData?.checkOut || "",
      rooms: String(searchData?.rooms || 1),
      adults: String(searchData?.adults || 2),
      children: String(searchData?.children || 0),
      pets: searchData?.pets ? "true" : "false",
    });
    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <section className="relative w-full bg-[#EDF7FF] pb-60 md:pb-60 lg:pb-40 xl:pb-54">
      <div className={styles.heroBg} />
      <div className="absolute top-[35%] left-1/2 h-[60%] w-[85.83%] -translate-x-1/2 px-4 max-lg:top-[32%] max-lg:w-[92%] max-md:top-[25%] max-md:w-[95%] xl:top-[40%]">
        <div className="w-full rounded-[10px] bg-white !pb-14 shadow-2xl max-lg:p-6 max-md:p-4 md:p-8">
          <Tabs
            tabs={HOME_TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <h2 className="mb-2 text-center text-xl font-bold text-[#72C0F0] max-lg:text-[28px] max-md:text-[22px] md:text-3xl">
            Find What You Are Looking For
          </h2>
          {ActiveForm && <ActiveForm />}
          <SearchButton onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
