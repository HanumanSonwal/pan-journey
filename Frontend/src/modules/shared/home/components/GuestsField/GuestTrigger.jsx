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
    <div className="relative min-w-0 rounded border border-gray-300 px-5 py-3 transition-all hover:border-[#0077b6]">
      <span className="absolute -top-2.5 left-4 rounded bg-white px-2 text-[14px] font-bold  tracking-wide text-[#0F6A75] font-bold min-[700px]:text-[16px]! min-[700px]:font-bold!">
        Rooms & Guests
      </span>

      <div className="flex min-h-[56px] items-center justify-between">
        <SummaryItem value={value.rooms} label="Room" />
        <SummaryItem value={value.adults} label="Adults" center />
        <SummaryItem value={value.children} label="Children" right />
      </div>
    </div>
  );
}
