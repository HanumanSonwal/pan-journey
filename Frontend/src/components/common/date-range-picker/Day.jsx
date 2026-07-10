"use client";

import clsx from "clsx";
import { isPast, isSame, isToday } from "./utils";

export default function Day({ day, start, end, hovered, onClick, onHover }) {
  const disabled = isPast(day.date);

  const isStart = start && isSame(day.date, start);

  const isEnd = end && isSame(day.date, end);

  const hoverDate = hovered || day.date;

  const previewEnd = end || hoverDate;

  const inRange =
    start &&
    previewEnd &&
    day.date.isAfter(start, "day") &&
    day.date.isBefore(previewEnd, "day");

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick?.(day.date)}
      onMouseEnter={() => {
        if (start && !end) {
          onHover?.(day.date);
        }
      }}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-xl text-[15px] font-medium transition-all duration-200",

        !day.currentMonth && "text-gray-300",

        disabled && "cursor-not-allowed opacity-35",

        isToday(day.date) && "border border-[#0077B6] text-[#0077B6]",

        inRange && "rounded-none bg-[#D8F0FB]",

        isStart && "!rounded-l-xl !rounded-r-none bg-[#0077B6] text-white",

        isEnd && "!rounded-l-none !rounded-r-xl bg-[#0077B6] text-white",

        (isStart || isEnd) &&
          "rounded-xl bg-[#0077B6] font-semibold text-white",

        !disabled && !isStart && !isEnd && !inRange && "hover:bg-[#EAF7FD]",
      )}
    >
      <span className="relative z-10">{day.date.date()}</span>
    </button>
  );
}
