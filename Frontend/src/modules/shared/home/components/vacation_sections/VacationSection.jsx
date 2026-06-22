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
    <SectionWrapper className="mt-0 bg-[#edf7ff] md:mt-[-4px]">
      {/* Heading */}
      <div className="mt-0 pt-8 sm:pt-10 md:mt-12 md:pt-0 lg:mt-20 xl:mt-8 2xl:mt-32">
        <SectionHeading
          title="Places As Per Your Vibe"
          description="We're committed to offering more than just products—we provide exceptional experiences."
        />
      </div>

      {/* Tabs */}
      <div className="scrollbar-hide mt-6 mb-8 flex justify-center overflow-x-auto px-0 sm:mt-8 md:mt-10 lg:mt-12">
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
