"use client";

import { useEffect, useState } from "react";
import ButtonTab from "./ButtonTab";
import HotelType from "./VacationType";

import SectionHeading from "@/components/common/SectionHeading";
import SectionWrapper from "@/components/common/SectionWrapper";

export default function VacationSection({ vibes }) {
  console.log("vibes", vibes);

  const categories = vibes?.categories || [];

  const [activeTab, setActiveTab] = useState(categories[0]?.category || "");

  // useEffect(() => {
  //   if (categories.length > 0) {
  //     setActiveTab(categories[0].category);
  //   }
  // }, [categories]);

  return (
    <SectionWrapper className="bg-[#edf7ff] pt-32 md:pt-36 lg:pt-24 xl:pt-22">
      {/* Heading */}
      <div className="!mt-[124px]">
        <SectionHeading title={vibes?.title || "Places As Per Your Vibe"} />
      </div>

      {/* Tabs */}
      <div className="scrollbar-hide mt-2 mb-8 flex justify-center overflow-x-auto px-0 sm:mt-6 md:mt-6 lg:mt-6">
        <ButtonTab
          tabs={categories}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Hotels */}
      <div className="pb-8">
        <HotelType activeTab={activeTab} vibes={categories} />
      </div>
    </SectionWrapper>
  );
}
