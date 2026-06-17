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
    <SectionWrapper className="bg-[#edf7ff] mt-[-4px] ">
      <div className="mt-[-20px] md:mt-[70px] lg:mt-[180px] !xl:mt-[26px] 2xl:mt-[134px] ">
        <SectionHeading
          title="Places As Per Your Vibe"
          description="We're committed to offering more than just products— we provide exceptional experiences."
        />
      </div>
      <div className="scrollbar-hide mb-8 flex justify-center overflow-x-auto mt-19">
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
