"use client";

import BusSearchForm from "@/modules/bus/components/BusSearchForm";
import FlightSearchForm from "@/modules/flight/components/FlightSearchForm";
import HotelSearchForm from "@/modules/hotel/components/hotels/HotelSearchForm";
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
  const [formData, setFormData] = useState(null);
  const ActiveForm = FORM_MAP[activeTab];
  // 🔍 SEARCH
  const handleSearch = () => {
    console.log("🚀 FINAL DATA:", formData);
    if (!formData) return;
    const query = new URLSearchParams({
      city: formData.city || "",
      cityId: formData.cityData?.id || "",
      checkIn: formData.checkIn || "",
      checkOut: formData.checkOut || "",
      rooms: String(formData.rooms || 1),
      adults: String(formData.adults || 2),
      children: String(formData.children || 0),
      pets: formData.pets ? "true" : "false",
    });
    router.push(`/hotels?${query.toString()}`);
  };

  return (
    <section className="relative w-full bg-[#EDF7FF] pb-60 z-10">
      {/* Hero Background */}
      <div className={styles.heroBg} />

      {/* 🔹 SEARCH CARD */}
      <div className="absolute top-[35%] left-1/2 h-[60%] w-[85.83%] -translate-x-1/2 px-4 max-lg:top-[32%] max-lg:w-[92%] max-md:top-[25%] max-md:w-[95%]">
        <div className="w-full rounded-[10px] bg-white !pb-14 shadow-2xl max-lg:p-6 max-md:p-4 md:p-8">
          {/* 🔹 TABS */}
          <Tabs
            tabs={HOME_TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* 🔹 HEADING */}
          <h2 className="mb-2 text-center text-xl font-bold text-[#72C0F0] max-lg:text-[28px] max-md:text-[22px] md:text-3xl">
            Find What You Are Looking For
          </h2>

          {/* 🔹 FORM */}
          {ActiveForm && <ActiveForm setFormData={setFormData} />}

          {/* 🔹 BUTTON */}
          <SearchButton onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
