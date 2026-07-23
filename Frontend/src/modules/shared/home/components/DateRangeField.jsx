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
      // DateRangePicker
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
    <>
      <span className="mb-2 block text-[14px] font-semibold text-[#222]">
        Check In - Check Out
      </span>

      <div className="relative h-[65px] rounded-md border border-[#d9d9d9] bg-white px-6 py-3 transition-all hover:border-[#0077b6]">
        {/* DISPLAY */}
        <div
          className="flex h-full cursor-pointer items-center justify-between"
          onClick={() => setOpen(true)}
        >
          {/* CHECK IN */}
          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-1">
              <span className="text-[26px] leading-none font-semibold text-[#222]">
                {start?.format("DD")}
              </span>

              <div className="mt-2 flex flex-col leading-none">
                <span className="text-[12px] font-semibold text-[#444]">
                  {start?.format("MMM")}     {start?.format("YY")}
                </span>

                {/* <span className="text-[16px] text-[#666]">
                  {start?.format("YY")}
                </span> */}
              </div>
            </div>

            <span className="mt-2 text-[12px] font-medium text-[#777] uppercase">
              {start?.format("dddd")}
            </span>
          </div>

          {/* CENTER */}
          <div className="mx-4">
            <span className="text-[28px] text-[#05144B]">→</span>
          </div>

          {/* CHECK OUT */}
          <div className="flex flex-col items-end justify-center">
            <div className="flex items-start gap-1">
              <span className="text-[26px] leading-none font-semibold text-[#222]">
                {end?.format("DD")}
              </span>

              <div className="mt-2 flex flex-col leading-none">
                <span className="text-[12px] font-semibold text-[#444]">
                  {end?.format("MMM")}  {end?.format("YY")}
                </span>

                {/* <span className="text-[12px] text-[#666]">
                  {end?.format("YY")}
                </span> */}
              </div>
            </div>

            <span className="mt-2 text-[12px] font-medium text-[#777] uppercase">
              {end?.format("dddd")}
            </span>
          </div>
          {/* NIGHTS */}
          {nights > 0 && (
            <div className="ml-5 rounded-md bg-[#05144B] px-2 py-1 text-[10px] font-semibold text-white">
              {nights}N
            </div>
          )}
        </div>
        {/* PICKER */}
        {picker}
      </div>
    </>
  );
}
