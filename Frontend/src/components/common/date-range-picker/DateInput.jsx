"use client";

import dayjs from "dayjs";

export default function DateInput({
  value,
  onClick,
}) {
  const start = value?.[0];
  const end = value?.[1];

  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border bg-white p-4 text-left shadow-sm"
    >
      <div className="text-xs text-gray-500">
        Check In - Check Out
      </div>

      <div className="mt-1 text-lg font-semibold">
        {start
          ? start.format("DD MMM")
          : "Select"}

        {"  -  "}

        {end
          ? end.format("DD MMM")
          : "Select"}
      </div>
    </button>
  );
}