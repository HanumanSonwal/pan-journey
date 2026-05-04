"use client";

import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

export default function DateRangeField({ value, onChange }) {
  const start = value?.[0];
  const end = value?.[1];

  const nights = start && end ? end.diff(start, "day") : 0;

  return (
    <div className="relative border border-gray-300 rounded-xl px-3 py-2 !h-[96px]">
      <span className="absolute -top-2 left-3 bg-white px-1 text-[15px] text-gray-800 font-medium">
        Check In - Check Out
      </span>

      <div
        className="flex items-center justify-between cursor-pointer min-h-[56px] px-1 md:px-2 py-1"
        onClick={() => {
          document.querySelector(".hidden-range-input input")?.click();
        }}
      >
        <div className="flex flex-col justify-center flex-1 leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-black">
              {start?.format("DD")}
            </span>
            <span className="text-sm md:text-base text-gray-600">
              {start?.format("MMM, YY")}
            </span>
          </div>

          <span className="text-xs md:text-sm text-gray-500 truncate">
            {start?.format("dddd")}
          </span>
        </div>

        <div className="mx-3 text-gray-400 text-lg">-</div>

        <div className="flex flex-col justify-center flex-1 leading-tight text-right">
          <div className="flex items-baseline justify-end gap-2">
            <span className="text-2xl md:text-3xl font-bold text-black">
              {end?.format("DD")}
            </span>
            <span className="text-sm md:text-base text-gray-600">
              {end?.format("MMM, YY")}
            </span>
          </div>

          <span className="text-xs md:text-sm text-gray-500 truncate">
            {end?.format("dddd")}
          </span>
        </div>

        {nights > 0 && (
          <div className="ml-3 text-xs text-[#0077b6] font-semibold whitespace-nowrap">
            {nights}N
          </div>
        )}
      </div>

      <RangePicker
        value={value}
        onChange={(dates) => onChange(dates)}
        className="hidden-range-input absolute opacity-0 pointer-events-none"
        getPopupContainer={(trigger) => trigger.parentNode}
      />
    </div>
  );
}
