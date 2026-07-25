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
    <SectionWrapper className="bg-[#edf7ff] pt-32 md:pt-36 lg:pt-24 xl:pt-22">
      {/* Heading */}
      <div className="!mt-[124px]">
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
