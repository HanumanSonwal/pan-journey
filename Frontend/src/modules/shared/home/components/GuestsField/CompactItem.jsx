"use client";

import { memo } from "react";

function CompactItem({ value, label, center = false, right = false }) {
  return (
    <div
      className={`flex flex-col ${
        center ? "items-center" : right ? "items-end" : "items-start"
      }`}
    >
      <span className="font-jost text-[18px] leading-none font-semibold text-black">
        {value}
      </span>
      <span className="mt-1 text-[11px] text-gray-500">{label}</span>
    </div>
  );
}

export default memo(CompactItem);
