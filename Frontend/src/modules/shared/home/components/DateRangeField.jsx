"use client";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
  const nights = start && end ? Math.max(0, end.diff(start, "day")) : 0;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const picker = (
    <RangePicker
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen?.(nextOpen);
      }}
      inputReadOnly
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
      renderExtraFooter={() =>
        isMobile ? (
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-white! hover:bg-gray-800"
          >
            ✕
          </button>
        ) : null
      }
      onChange={(dates) => {
        if (!dates) return;

        onChange(dates);

        if (dates?.[0] && dates?.[1]) {
          requestAnimationFrame(() => {
            setOpen?.(false);
          });
        }
      }}
      className="absolute top-[-20px] right-2 h-0 w-0 -translate-x-1/2 opacity-0 lg:left-0 lg:translate-x-0"
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
              <span className="font-jost! text-[18px] leading-none font-semibold! text-black">
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
    <div className="relative z-50 h-[82px] rounded border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:border-[#0077b6] hover:shadow-md">
      {/* LABEL */}
      <span className="absolute -top-2.5 left-4 rounded bg-white px-2 text-[14px] font-bold  tracking-wide text-[#0F6A75] font-bold min-[700px]:text-[16px]! min-[700px]:font-bold!">
        Check In - Check Out
      </span>
      {/* DISPLAY */}
      <div
        className="flex h-full cursor-pointer items-center justify-between"
        onClick={() => setOpen(true)}
      >

        {/* CHECK IN */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-center gap-1 leading-none sm:gap-2">
            <span className="font-jost text-[20px] font-normal  sm:text-[24px] md:text-[28px] lg:text-[30px] text-gray-700 min-[700px]: font-medium! min-[700px]:text-gray-800!">
              {start?.format("DD")}
            </span>

            <div className="flex flex-col">
              <span className="text-[11px] leading-none font-semibold text-gray-700 sm:text-[13px] md:text-[15px] lg:text-[16px] ">
                {start?.format("MMM")}
              </span>

              <span className="text-[10px] leading-none text-gray-500 sm:text-[11px] md:text-[13px] lg:text-[14px]">
                {start?.format("YY")}
              </span>
            </div>
          </div>

          <span className="mt-1 truncate text-[10px] font-medium text-gray-500 sm:text-xs md:text-sm">
            {start?.format("dddd")}
          </span>
        </div>

        {/* CENTER */}
        <div className="mx-1 flex h-7 w-7 items-center justify-center rounded bg-[#e6f4fb] sm:mx-2 sm:h-8 sm:w-8 md:mx-3 md:h-9 md:w-9">
          <span className="text-sm font-bold text-[#0077b6] sm:text-base md:text-lg">
            →
          </span>
        </div>

        {/* CHECK OUT */}
        <div className="flex min-w-0 flex-1 flex-col items-end justify-center">
          <div className="flex items-center gap-1 leading-none sm:gap-2">
             <span className="font-jost text-[20px] font-normal  sm:text-[24px] md:text-[28px] lg:text-[30px] text-gray-700 min-[700px]: font-medium! min-[700px]:text-gray-800!">
              {end?.format("DD")}
            </span>

            <div className="flex flex-col">
              <span className="text-[11px] leading-none font-semibold text-gray-700 sm:text-[13px] md:text-[15px] lg:text-[16px]">
                {end?.format("MMM")}
              </span>

              <span className="text-[10px] leading-none text-gray-500 sm:text-[11px] md:text-[13px] lg:text-[14px]">
                {end?.format("YY")}
              </span>
            </div>
          </div>

          <span className="mt-1 truncate text-right text-[10px] font-medium text-gray-500 sm:text-xs md:text-[14px]">
            {end?.format("dddd")}
          </span>
        </div>
        {/* NIGHTS */}
        {nights > 0 && (
          <div className="ml-3 rounded bg-[#0077b6] px-3 py-1 text-xs font-bold text-white shadow-sm">
            {nights}N
          </div>
        )}
      </div>
      {/* PICKER */}
      {picker}
    </div>
  );
}
