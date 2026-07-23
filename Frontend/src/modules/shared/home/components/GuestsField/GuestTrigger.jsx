"use client";

import CompactItem from "./CompactItem";
import SummaryItem from "./SummaryItem";

export default function GuestTrigger({ variant = "default", value }) {
  console.log("GuestTrigger Render");
  if (variant === "compact") {
    return (
      <div
        onClick={() => console.log("Trigger Clicked")}
        className="h-[54px] cursor-pointer rounded border border-gray-300 bg-white px-10 transition-all hover:border-[#0077b6] sm:h-[50px]"
      >
        <div className="flex h-full items-center justify-between gap-2">
          <CompactItem value={value.rooms} label="Room" />
          <CompactItem value={value.adults} label="Adults" center />
          <CompactItem value={value.children} label="Children" right />
        </div>
      </div>
    );
  }

  return (
    <>
      <span className="mb-2 block text-[14px] font-semibold text-[#222]">
        Rooms & Guests
      </span>

      <div className="h-[80px] rounded-md border border-[#d9d9d9] bg-white px-6 py-3 transition-all hover:border-[#0077b6]">
        <div className="flex h-full items-center justify-between">
          <SummaryItem value={value.rooms} label="ROOM" />
          <SummaryItem value={value.adults} label="ADULTS" center />
          <SummaryItem value={value.children} label="CHILDREN" right />
        </div>
      </div>
    </>
  );
}
