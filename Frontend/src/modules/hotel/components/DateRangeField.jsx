"use client";

import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export default function DateRangeField({ value, onChange }) {
  const start = value?.[0];
  const end = value?.[1];

  const nights = start && end ? end.diff(start, "day") : 0;

  return (
    <div
      className="relative border border-gray-300 rounded px-3 h-[50px] bg-white hover:border-[#0077b6] transition-all cursor-pointer w-full"
      onClick={() => {
        document.querySelector(".hidden-range-input input")?.click();
      }}
    >
      {/* FULL WIDTH WRAPPER */}
      <div className="h-full w-full flex items-center justify-between gap-2">
        {/* CHECK IN */}
        <div className="flex flex-col justify-center leading-tight flex-1">
          <span className="text-[9px] text-gray-500 leading-none">
            Check In
          </span>

          <div className="flex items-center gap-1 mt-[2px]">
            <span className="text-[18px] font-bold text-black leading-none">
              {start?.format("DD")}
            </span>

            <span className="text-[10px] text-gray-600 leading-none">
              {start?.format("MMM")}
            </span>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center px-1">
          <div className="w-4 h-[1px] bg-gray-300" />

          {nights > 0 && (
            <span className="text-[8px] text-[#0077b6] font-semibold mt-[2px] leading-none">
              {nights}N
            </span>
          )}
        </div>

        {/* CHECK OUT */}
        <div className="flex flex-col justify-center items-end leading-tight flex-1">
          <span className="text-[9px] text-gray-500 leading-none">
            Check Out
          </span>

          <div className="flex items-center gap-1 mt-[2px]">
            <span className="text-[18px] font-bold text-black leading-none">
              {end?.format("DD")}
            </span>

            <span className="text-[10px] text-gray-600 leading-none">
              {end?.format("MMM")}
            </span>
          </div>
        </div>
      </div>

      {/* HIDDEN RANGE PICKER */}
      <RangePicker
        value={value}
        onChange={(dates) => onChange(dates)}
        className="hidden-range-input absolute opacity-0 pointer-events-none"
        getPopupContainer={(trigger) => trigger.parentNode}
      />
    </div>
  );
}
