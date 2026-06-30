"use client";

import { memo } from "react";

function SummaryItem({ value, label, center = false, right = false }) {
  return (
    <div
      className={`flex flex-col ${
        center ? "items-center" : right ? "items-end" : "items-start"
      }`}
    >
      <span className="font-jost text-[22px] leading-none font-bold text-gray-900">
        {value}
      </span>

      <span className="mt-1 text-[12px] font-medium text-gray-500">
        {label}
      </span>
    </div>
  );
}

export default memo(SummaryItem);
