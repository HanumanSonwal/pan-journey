"use client";

import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  Heading,
} from "react-aria-components";

import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function MobileDateRangeField({
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

  const [activeField, setActiveField] = useState(null);

  const todayDate = today(getLocalTimeZone());

  // ================================
  // CONVERSION
  // ================================

  const toCalendarDate = (date) => {
    if (!date) return null;

    const d = dayjs(date);

    return new CalendarDate(d.year(), d.month() + 1, d.date());
  };

  const toDayjs = (date) => {
    if (!date) return null;

    return dayjs(
      `${date.year}-${String(date.month).padStart(2, "0")}-${String(
        date.day,
      ).padStart(2, "0")}`,
    );
  };

  const checkInValue = toCalendarDate(value?.[0]);
  const checkOutValue = toCalendarDate(value?.[1]);

  // ================================
  // OPEN
  // ================================

  const handleOpen = () => {
    setActiveField("checkIn");
    setOpen?.(true);
  };

  // ================================
  // DATE SELECT
  // ================================

  const handleDateChange = (date) => {
    if (!date) return;

    const selectedDate = toDayjs(date);

    // CHECK IN
    if (activeField === "checkIn") {
      onChange?.([selectedDate, value?.[1] || null]);

      setActiveField("checkOut");

      return;
    }

    // CHECK OUT
    if (activeField === "checkOut") {
      const checkIn = value?.[0];

      if (checkIn && selectedDate.isBefore(dayjs(checkIn), "day")) {
        return;
      }

      onChange?.([checkIn, selectedDate]);

      setActiveField(null);
      setOpen?.(false);
    }
  };

  // ================================
  // CALENDAR
  // ================================

  const calendar = (
    <Calendar
      aria-label="Hotel date"
      value={
        activeField === "checkIn"
          ? checkInValue || undefined
          : checkOutValue || undefined
      }
      minValue={
        activeField === "checkOut" && checkInValue ? checkInValue : todayDate
      }
      onChange={handleDateChange}
      className="w-full"
    >
      {/* HEADER */}

      <div className="mb-4 flex items-center">
        <Button
          slot="previous"
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-[#F5F7FF] text-[#05144B] hover:bg-[#E8F0FF]"
        >
          <ChevronLeft size={19} />
        </Button>

        <Heading className="flex-1 text-center text-[16px] font-bold text-[#05144B]" />

        <Button
          slot="next"
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-[#F5F7FF] text-[#05144B] hover:bg-[#E8F0FF]"
        >
          <ChevronRight size={19} />
        </Button>
      </div>

      {/* SINGLE CALENDAR */}

      <CalendarGrid className="w-full">
        {(date) => (
          <CalendarCell
            date={date}
            className={({ isSelected, isDisabled }) =>
              `flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-medium outline-none ${
                isSelected
                  ? "bg-[#05144B] text-white"
                  : "text-[#222] hover:bg-[#EEF3FF]"
              } ${
                isDisabled
                  ? "cursor-not-allowed text-gray-300"
                  : "cursor-pointer"
              } `
            }
          />
        )}
      </CalendarGrid>
    </Calendar>
  );

  // ================================
  // DEFAULT UI
  // ================================

  return (
    <>
      <div className="mb-2 flex items-center justify-between px-1">
        <span
          className={`text-[14px] ${
            activeField === "checkIn"
              ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
              : "font-semibold text-[#222]"
          }`}
        >
          Check In
        </span>

        <span
          className={`text-[14px] ${
            activeField === "checkOut"
              ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
              : "font-semibold text-[#222]"
          }`}
        >
          Check Out
        </span>
      </div>

      <div className="relative z-[99999]">
        <div
          className="flex h-[65px] cursor-pointer items-center rounded-md border border-[#d9d9d9] bg-white px-2 py-3"
          onClick={handleOpen}
        >
          {icon}

          {/* CHECK IN */}

          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-1">
              <span className="text-[26px] leading-none font-semibold text-[#222]">
                {start.format("DD")}
              </span>

              <div className="mt-2 leading-none">
                <span className="text-[12px] font-semibold text-[#444]">
                  {start.format("MMM")} {start.format("YY")}
                </span>
              </div>
            </div>

            <span className="mt-2 text-[12px] font-medium text-[#777] uppercase">
              {start.format("dddd")}
            </span>
          </div>

          {/* ARROW */}

          <div className="mx-4">
            <span className="text-[28px] text-[#05144B]">→</span>
          </div>

          {/* CHECK OUT */}

          <div className="flex flex-col items-end justify-center">
            <div className="flex items-start gap-1">
              <span className="text-[26px] leading-none font-semibold text-[#222]">
                {end.format("DD")}
              </span>

              <div className="mt-2 leading-none">
                <span className="text-[12px] font-semibold text-[#444]">
                  {end.format("MMM")} {end.format("YY")}
                </span>
              </div>
            </div>

            <span className="mt-2 text-[12px] font-medium text-[#777] uppercase">
              {end.format("dddd")}
            </span>
          </div>

          {nights > 0 && (
            <div className="buttion-background-color ml-5 rounded-md px-2 py-1 text-[10px] font-semibold text-white">
              {nights}N
            </div>
          )}
        </div>

        {/* MOBILE POPUP */}

        {open && (
          <>
            {/* OVERLAY */}

            <div
              className="fixed inset-0 z-[999998] bg-black/40"
              onClick={() => {
                setActiveField(null);
                setOpen?.(false);
              }}
            />

            {/* POPUP */}

            <div className="fixed top-1/2 left-1/2 z-[999999] w-[calc(100vw-24px)] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-2xl">
              {/* HEADER */}

              <div className="mb-4 flex items-center justify-between border-b border-gray-200 px-1 pb-3">
                <span
                  className={
                    activeField === "checkIn"
                      ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
                      : "font-medium text-gray-500"
                  }
                >
                  Check In
                </span>

                <span className="text-gray-300">→</span>

                <span
                  className={
                    activeField === "checkOut"
                      ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
                      : "font-medium text-gray-500"
                  }
                >
                  Check Out
                </span>
              </div>

              {/* SINGLE CALENDAR */}

              {calendar}

              {/* BUTTON */}

              <div className="mt-4">
                {activeField === "checkIn" ? (
                  <button
                    type="button"
                    disabled={!value?.[0]}
                    onClick={() => {
                      setActiveField("checkOut");
                    }}
                    className="w-full rounded-lg bg-[#05144B] py-3 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!value?.[1]}
                    onClick={() => {
                      if (value?.[0] && value?.[1]) {
                        setActiveField(null);
                        setOpen?.(false);
                      }
                    }}
                    className="w-full rounded-lg bg-[#05144B] py-3 text-sm font-semibold text-white disabled:opacity-40"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
