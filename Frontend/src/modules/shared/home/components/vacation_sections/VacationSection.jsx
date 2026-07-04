"use client";

import { useState } from "react";
import { tabs } from "../data/VacationTabs";
import ButtonTab from "./ButtonTab";
import HotelType from "./VacationType";

import SectionHeading from "@/components/common/SectionHeading";
import SectionWrapper from "@/components/common/SectionWrapper";

export default function VacationSection() {
  const [activeTab, setActiveTab] = useState("beach");

  return (
    <SectionWrapper className="-mt-10 bg-[#edf7ff] md:mt-[-1px]  !px-0 sm:!px-0 md:!px-2 lg:!px-3 xl:!px-4 2xl:!px-0">
      {/* Heading */}
      <div className="mt-[-12px] pt-8 min-[375px]:mt-[40px] min-[425px]:mt-[34px] min-[430px]:mt-[16px]  !xl:!px-9 md:mt-[66px] lg:mt-[-39px] xl:mt-[109px] !2xl:mt-[76px]">
        <SectionHeading
          title="Places As Per Your Vibe"
          description="We're committed to offering more than just products—we provide exceptional experiences."
        />
      </div>

      {/* Tabs */}
      <div className="scrollbar-hide mt-2 mb-8 flex justify-center overflow-x-auto px-0 sm:mt-6 md:mt-6 lg:mt-6">
        <ButtonTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Hotels */}
      <div className="pb-8">
        <HotelType activeTab={activeTab} />
      </div>
    </SectionWrapper>
  );
}
