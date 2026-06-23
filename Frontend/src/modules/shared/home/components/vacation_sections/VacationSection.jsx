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
      <div
        className="
          mt-0
          pt-8
          mt-[39px]
        min-[375px]:mt-[40px]
        min-[425px]:mt-[34px]
        min-[430px]:mt-[66px]
        min-[430px]:mt-[16px]
        md:mt-[47px]
        lg:mt-[-39px]
        min-[1440px]:!mt-[59px]
        min-[2560px]:!mt-[76px]
        "
      >
        <SectionHeading
          title="Places As Per Your Vibe"
          description="We're committed to offering more than just products—we provide exceptional experiences."
        />
      </div>

      {/* Tabs */}
      <div
        className="
          scrollbar-hide
          mt-2
          sm:mt-6
          md:mt-6
          lg:mt-6
          mb-8
          flex
          justify-center
          overflow-x-auto
          px-0
        "
      >
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
