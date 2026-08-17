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
  variant = "default",
  icon,
}) {
  const start = value?.[0] || dayjs();
  const end = value?.[1] || dayjs().add(1, "day");
  const nights = start && end ? Math.max(0, end.diff(start, "day")) : 0;
  const [isMobile, setIsMobile] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickerKey, setPickerKey] = useState(0);

  console.log("date active", activeField);

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
      key={pickerKey}
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen?.(nextOpen);

        if (!nextOpen) {
          setActiveField(null);
        }
      }}
      onCalendarChange={(dates) => {
        if (dates?.[0]) {
          setActiveField("checkOut");
        }
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
      onChange={(dates) => {
        if (!dates) return;

        onChange(dates);

        if (dates?.[0] && dates?.[1]) {
          requestAnimationFrame(() => {
            setActiveField(null);
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
        onClick={() => {
          setActiveField("checkIn");
          setPickerKey((prev) => prev + 1);
          setOpen?.(true);
        }}
      >
        {/* FULL WIDTH WRAPPER */}
        <div className="mb-2 flex items-center justify-between px-1">
          <span
            className={`text-[14px] transition-all ${
              activeField === "checkIn"
                ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
                : "font-semibold text-[#222]"
            }`}
          >
            Check In
          </span>

          <span
            className={`text-[14px] transition-all ${
              activeField === "checkOut"
                ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
                : "font-semibold text-[#222]"
            }`}
          >
            Check Out
          </span>
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
      <div className="mb-2 flex items-center justify-between px-1">
        <span
          className={`text-[14px] transition-all ${
            activeField === "checkIn"
              ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
              : "font-semibold text-[#222]"
          }`}
        >
          Check In
        </span>

        <span
          className={`text-[14px] transition-all ${
            activeField === "checkOut"
              ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
              : "font-semibold text-[#222]"
          }`}
        >
          Check Out
        </span>
      </div>
      <div className="relative h-[65px] rounded-md border border-[#d9d9d9] bg-white px-2 py-3 transition-all hover:border-[#0077b6]">
        {/* DISPLAY */}
        <div
          className="flex h-full cursor-pointer items-center gap-0"
          onClick={() => {
            setActiveField("checkIn");
            setPickerKey((prev) => prev + 1);
            setOpen?.(true);
          }}
        >
          {icon}

          {/* CHECK IN */}
          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-1">
              <span className="text-[26px] leading-none font-semibold text-[#222]">
                {start?.format("DD")}
              </span>

              <div className="mt-2 flex flex-col leading-none">
                <span className="text-[12px] font-semibold text-[#444]">
                  {start?.format("MMM")} {start?.format("YY")}
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
                  {end?.format("MMM")} {end?.format("YY")}
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
            <div className="buttion-background-color ml-5 rounded-md px-2 py-1 text-[10px] font-semibold text-white">
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
