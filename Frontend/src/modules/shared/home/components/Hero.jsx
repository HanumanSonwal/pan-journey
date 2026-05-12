"use client";

import { HOME_TABS } from "@/modules/shared/config/homeTabs";
import { useState } from "react";
import styles from "./styles/Hero.module.css";

import SearchButton from "./SearchButton";
import Tabs from "./Tabs";

import BusSearchForm from "@/modules/bus/components/BusSearchForm";
import FlightSearchForm from "@/modules/flight/components/FlightSearchForm";
import HotelSearchForm from "@/modules/hotel/components/hotels/HotelSearchForm";
import { useRouter } from "next/navigation";

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

  const [formData, setFormData] = useState(null);

  const ActiveForm = FORM_MAP[activeTab];

  const handleSearch = () => {
    console.log("🚀 FINAL DATA:", formData);
    router.push("/hotels");
  };

  return (
    <section className="relative w-full bg-[#EDF7FF] pb-60">
      {/* Hero Background */}
      <div className={styles.heroBg} />

      {/* Search Card */}
      <div
        className="absolute left-1/2
          top-[35%]
          w-[85.83%]
          h-[60%]
          -translate-x-1/2
          px-4

          /* Tablet Responsive */
          max-lg:w-[92%]
          max-lg:top-[32%]

          /* Mobile */
          max-md:w-[95%]
          max-md:top-[25%]
        "
      >
        <div
          className="w-full
            rounded-[10px]
            bg-white
            shadow-2xl
            !pb-14
            md:p-8

            /* Tablet */
            max-lg:p-6

            /* Mobile */
            max-md:p-4
          "
        >
          {/* Tabs */}
          <Tabs
            tabs={HOME_TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Heading */}
          <h2 className="/* Tablet */ /* Mobile */ mb-2 text-center text-xl font-bold text-[#72C0F0] max-lg:text-[28px] max-md:text-[22px] md:text-3xl">
            Find What You Are Looking For
          </h2>

          {/* Dynamic Form */}
          {ActiveForm && <ActiveForm setFormData={setFormData} />}

          {/* Search Button */}
          <SearchButton onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
