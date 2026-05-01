"use client";

import styles from "./styles/Hero.module.css";

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
    <section className="relative w-full pb-60 bg-[#EDF7FF]">
      <div className={styles.heroBg} />
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-[80.83%] h-[46%] top-[53%]   px-4 ${styles.cardWrapper}`}
      >
        <div className="  bg-white rounded-[10px] shadow-2xl w-full  !pb-14  md:p-8">
          <Tabs
            tabs={enabledTabs}  
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />a
           

          <h2 className="text-center text-[#72C0F0] text-xl md:text-3xl font-bold mb-6 ">
            Find What You Are Looking For
          </h2>

          {ActiveForm && <ActiveForm />}

          <SearchButton />
        </div>
      </div>
    </section>
  );
}
