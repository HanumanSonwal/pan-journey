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
    <SectionWrapper className="bg-[#edf7ff] mt-[-3]">
      <div className="mt-[-20px] md:mt-[40px] lg:mt-[80px] xl:mt-[56px] ">
        <SectionHeading
          title="Places As Per Your Vibe"
          description="We're committed to offering more than just products— we provide exceptional experiences."
        />
      </div>
      <div className="scrollbar-hide mb-10 flex justify-center overflow-x-auto">
        <ButtonTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <HotelType activeTab={activeTab} />
    </SectionWrapper>
  );
}
