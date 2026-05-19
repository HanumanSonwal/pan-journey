"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
export default function DateRangeField({
  value,
  onChange,
  open,
  setOpen,
  variant = "default", // default | compact
}) {
  const start = value?.[0] || dayjs();
  const end = value?.[1] || dayjs().add(1, "day");
  const nights = start && end ? end.diff(start, "day") : 0;

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const picker = (
    <RangePicker
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen?.(nextOpen);
      }}
      value={value}
      disabledDate={disabledDate}
      allowClear={false}
      format="DD MMM YYYY"
      placement="bottomLeft"
      classNames={{
        popup: {
          root: "premium-hotel-calendar",
        },
      }}
      onChange={(dates) => {
        if (!dates) return;

        onChange(dates);

        if (dates?.[0] && dates?.[1]) {
          requestAnimationFrame(() => {
            setOpen?.(false);
          });
        }
      }}
      className="absolute top-[-20] left-0 h-0 w-0 opacity-0"
    />
  );

  // =========================
  // COMPACT UI
  // =========================
  if (variant === "compact") {
    return (
      <div
        className="relative h-[50px] w-full cursor-pointer rounded border border-gray-300 bg-white px-3 transition-all hover:border-[#0077b6]"
        onClick={() => setOpen(true)}
      >
        {/* FULL WIDTH WRAPPER */}
        <div className="flex h-full w-full items-center justify-between gap-2">
          {/* CHECK IN */}
          <div className="flex flex-1 flex-col justify-center leading-tight">
            <span className="text-[9px] leading-none text-gray-500">
              Check In
            </span>
            <div className="mt-[2px] flex items-center gap-1">
              <span className="text-[18px] leading-none font-bold text-black">
                {start?.format("DD")}
              </span>
              <span className="text-[10px] leading-none text-gray-600">
                {start?.format("MMM")}
              </span>
            </div>
          </div>
          {/* CENTER */}
          <div className="flex flex-col items-center px-1">
            <div className="h-[1px] w-4 bg-gray-300" />
            {nights > 0 && (
              <span className="mt-[2px] text-[8px] leading-none font-semibold text-[#0077b6]">
                {nights}N
              </span>
            )}
          </div>

          {/* CHECK OUT */}
          <div className="flex flex-1 flex-col items-end justify-center leading-tight">
            <span className="text-[9px] leading-none text-gray-500">
              Check Out
            </span>
            <div className="mt-[2px] flex items-center gap-1">
              <span className="text-[18px] leading-none font-bold text-black">
                {end?.format("DD")}
              </span>
              <span className="text-[10px] leading-none text-gray-600">
                {end?.format("MMM")}
              </span>
            </div>
          </div>
        </div>

        {/* PICKER */}
        {picker}
      </div>
    );
  }

  // =========================
  // DEFAULT PREMIUM UI
  // =========================
  return (
    <div className="relative z-50 h-[82px] rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:border-[#0077b6] hover:shadow-md">
      {/* LABEL */}
      <span className="absolute -top-2.5 left-4 rounded-md bg-white px-2 text-[14px] font-semibold tracking-wide text-[#0F6A75]">
        Check In - Check Out
      </span>
      {/* DISPLAY */}
      <div
        className="flex h-full cursor-pointer items-center justify-between"
        onClick={() => setOpen(true)}
      >
        {/* CHECK IN */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-[30px] font-extrabold text-gray-900">
              {start?.format("DD")}
            </span>
            <div className="flex flex-col">
              <span className="text-[16px] leading-none font-semibold text-gray-700">
                {start?.format("MMM")}
              </span>

              <span className="text-[14px] leading-none text-gray-500">
                {start?.format("YY")}
              </span>
            </div>
          </div>
          <span className="mt-1 text-sm font-medium text-gray-500">
            {start?.format("dddd")}
          </span>
        </div>
        {/* CENTER */}
        <div className="mx-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#e6f4fb]">
          <span className="text-lg font-bold text-[#0077b6]">→</span>
        </div>
        {/* CHECK OUT */}
        <div className="flex min-w-0 flex-1 flex-col items-end justify-center">
          <div className="flex items-center gap-2 leading-none">
            <span className="text-[30px] font-extrabold text-gray-900">
              {end?.format("DD")}
            </span>

            <div className="flex flex-col">
              <span className="text-[16px] leading-none font-semibold text-gray-700">
                {end?.format("MMM")}
              </span>

              <span className="text-[14px] leading-none text-gray-500">
                {end?.format("YY")}
              </span>
            </div>
          </div>
          <span className="mt-1 text-right text-sm font-medium text-gray-500">
            {end?.format("dddd")}
          </span>
        </div>
        {/* NIGHTS */}
        {nights > 0 && (
          <div className="ml-3 rounded-full bg-[#0077b6] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {nights}N
          </div>
        )}
      </div>
      {/* PICKER */}
      {picker}
    </div>
  );
}
