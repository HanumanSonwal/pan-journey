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
    <section className="relative w-full pb-60 bg-[#EDF7FF] ">
      <div className={styles.heroBg} />

      <div className="absolute left-1/2 -translate-x-1/2 w-[85.83%] h-[60%] top-[35%] px-4">
        <div className="bg-white rounded-[10px] shadow-2xl w-full !pb-14 h-86 md:p-8">
          <Tabs
             tabs={HOME_TABS} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <h2 className="text-center text-[#72C0F0] text-xl md:text-3xl font-bold mb-2">
            Find What You Are Looking For
          </h2>

          {ActiveForm && <ActiveForm setFormData={setFormData} />}

          <SearchButton onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
}
