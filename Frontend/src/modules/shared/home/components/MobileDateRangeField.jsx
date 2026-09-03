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
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

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

  // Temporary selection inside popup
  const [selectedCheckIn, setSelectedCheckIn] = useState(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState(null);
  const [isSelectingNewCheckIn, setIsSelectingNewCheckIn] = useState(false);

  const todayDate = today(getLocalTimeZone());

  // ==========================================
  // DAYJS -> CALENDAR DATE
  // ==========================================

  const toCalendarDate = (date) => {
    if (!date) return null;

    const d = dayjs(date);

    return new CalendarDate(d.year(), d.month() + 1, d.date());
  };

  // ==========================================
  // CALENDAR DATE -> DAYJS
  // ==========================================

  const toDayjs = (date) => {
    if (!date) return null;

    return dayjs(
      `${date.year}-${String(date.month).padStart(
        2,
        "0",
      )}-${String(date.day).padStart(2, "0")}`,
    );
  };

  // ==========================================
  // OPEN
  // ==========================================

  const handleOpen = () => {
    setActiveField("checkIn");

    setSelectedCheckIn(toCalendarDate(value?.[0]));

    setSelectedCheckOut(toCalendarDate(value?.[1]));

    setIsSelectingNewCheckIn(false);

    setOpen?.(true);
  };

  useEffect(() => {
  if (!open) return;

  setActiveField("checkIn");
  setSelectedCheckIn(toCalendarDate(value?.[0]));
  setSelectedCheckOut(toCalendarDate(value?.[1]));
  setIsSelectingNewCheckIn(false);
}, [open]);

  // ==========================================
  // CLOSE
  // ==========================================

  const handleClose = () => {
    setActiveField(null);
    setSelectedCheckIn(null);
    setSelectedCheckOut(null);

    setOpen?.(false);
  };

  // ==========================================
  // DATE SELECT
  // ==========================================

  const handleDateChange = (date) => {
    if (!date) return;

    // ========================================
    // CHECK IN
    // ========================================

    if (activeField === "checkIn") {
      setSelectedCheckIn(date);
      setSelectedCheckOut(null);

      setActiveField("checkOut");

      return;
    }

    // ========================================
    // CHECK OUT
    // ========================================

    if (activeField === "checkOut") {
      // ----------------------------------------
      // CHECKOUT ALREADY SELECTED
      // ----------------------------------------
      // User ab next date click kar raha hai.
      // Ye click NEW CHECK-IN hona chahiye.
      // ----------------------------------------

      if (selectedCheckOut) {
        setSelectedCheckIn(date);
        setSelectedCheckOut(null);

        // New check-in select ho gaya,
        // ab checkout select karna hai.
        setActiveField("checkOut");

        return;
      }

      // ----------------------------------------
      // NORMAL CHECKOUT
      // ----------------------------------------

      if (!selectedCheckIn) return;

      // Checkout check-in se pehle nahi ho sakta
      if (date.compare(selectedCheckIn) < 0) {
        return;
      }

      setSelectedCheckOut(date);

      setActiveField("checkOut");
    }
  };

  // ==========================================
  // NEXT / DONE
  // ==========================================

  const handleNext = () => {
    // First step
    if (activeField === "checkIn") {
      if (!selectedCheckIn) return;

      setActiveField("checkOut");

      return;
    }

    // Second step
    if (activeField === "checkOut" && selectedCheckIn && selectedCheckOut) {
      const checkIn = toDayjs(selectedCheckIn);
      const checkOut = toDayjs(selectedCheckOut);

      onChange?.([checkIn, checkOut]);

      setActiveField(null);

      setSelectedCheckIn(null);
      setSelectedCheckOut(null);

      setOpen?.(false);
    }
  };

  // ==========================================
  // MIN DATE
  // ==========================================

  const calendarMinDate =
    activeField === "checkOut" && selectedCheckIn && !selectedCheckOut
      ? selectedCheckIn
      : todayDate;

  // ==========================================
  // DATE STATE
  // ==========================================

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;

    return (
      date1.year === date2.year &&
      date1.month === date2.month &&
      date1.day === date2.day
    );
  };

  const isBetweenRange = (date) => {
    if (!selectedCheckIn || !selectedCheckOut) {
      return false;
    }

    return (
      date.compare(selectedCheckIn) > 0 && date.compare(selectedCheckOut) < 0
    );
  };

  // ==========================================
  // CALENDAR
  // ==========================================

  const calendar = (
    <Calendar
      aria-label="Hotel date"
      value={
        activeField === "checkIn"
          ? selectedCheckIn || undefined
          : selectedCheckOut || undefined
      }
      minValue={calendarMinDate}
      onChange={handleDateChange}
      className="w-full"
    >
      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-4 flex items-center">
        <Button
          slot="previous"
          aria-label="Previous month"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-[#F5F7FF] text-[#05144B] transition hover:bg-[#E8F0FF] active:scale-95"
        >
          <ChevronLeft size={19} />
        </Button>

        <Heading className="flex-1 text-center text-[16px] font-bold text-[#05144B]" />

        <Button
          slot="next"
          aria-label="Next month"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-[#F5F7FF] text-[#05144B] transition hover:bg-[#E8F0FF] active:scale-95"
        >
          <ChevronRight size={19} />
        </Button>
      </div>

      {/* ======================================
          SINGLE CALENDAR
      ====================================== */}

      <CalendarGrid className="w-full">
        {(date) => (
          <CalendarCell
            date={date}
            className={({ isDisabled }) => {
              const isCheckIn = isSameDate(date, selectedCheckIn);

              const isCheckOut = isSameDate(date, selectedCheckOut);

              const isRange = isBetweenRange(date);

              // CHECK IN / CHECK OUT
              if (isCheckIn || isCheckOut) {
                return `flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#05144B] text-[13px] font-semibold text-white`;
              }

              // BETWEEN RANGE
              if (isRange) {
                return `flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#E8F0FF] text-[13px] font-medium text-[#05144B]`;
              }

              // DISABLED
              if (isDisabled) {
                return `flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-medium text-gray-300`;
              }

              // NORMAL
              return `flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[13px] font-medium text-[#222] transition hover:bg-[#EEF3FF]`;
            }}
          />
        )}
      </CalendarGrid>
    </Calendar>
  );

  // ==========================================
  // DEFAULT FIELD
  // ==========================================

  return (
    <>
      {/* LABEL */}

      <div className="mb-2 flex items-center justify-between px-1">
        <span
          className={`text-[14px] transition-all ${
            activeField === "checkIn"
              ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
              : "font-semibold text-[#222]"
          } `}
        >
          Check In
        </span>

        <span
          className={`text-[14px] transition-all ${
            activeField === "checkOut"
              ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
              : "font-semibold text-[#222]"
          } `}
        >
          Check Out
        </span>
      </div>

      {/* FIELD */}

      <div className="relative z-[99999] w-full">
        <div
          className="flex h-[65px] w-full cursor-pointer items-center gap-3 rounded-md border border-[#d9d9d9] bg-white px-2 py-3"
          onClick={handleOpen}
        >
          {icon}

          {/* CHECK IN */}

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="flex items-start gap-1">
              <span className="font-jost text-[22px] leading-none text-gray-700 min-[700px]:font-medium! min-[700px]:text-gray-800! sm:text-[22px] md:text-[28px] lg:text-[26px]">
                {start.format("DD")}
              </span>

              <div className="!mt-1 leading-none">
                <span className="text-[12px] font-semibold text-[#444]">
                  {start.format("MMM")} {start.format("YY")}
                </span>
              </div>
            </div>

            <span className="mt-2 truncate text-[12px] font-medium text-[#777] uppercase">
              {start.format("dddd")}
            </span>
          </div>

          {/* ARROW */}

          <div className="mx-3 shrink-0">
            <span className="text-[26px] text-[#05144B]">→</span>
          </div>

          {/* CHECK OUT */}

          <div className="flex min-w-0 flex-1 flex-col items-end justify-center">
            <div className="flex items-start gap-1">
              <span className="font-jost text-[22px] leading-none text-gray-700 min-[700px]:font-medium! min-[700px]:text-gray-800! sm:text-[22px] md:text-[28px] lg:text-[26px]">
                {end.format("DD")}
              </span>

              <div className="mt-1 leading-none">
                <span className="text-[12px] font-semibold text-[#444]">
                  {end.format("MMM")} {end.format("YY")}
                </span>
              </div>
            </div>

            <span className="mt-2 truncate text-[12px] font-medium text-[#777] uppercase">
              {end.format("dddd")}
            </span>
          </div>

          {/* NIGHTS */}

          {nights > 0 && (
            <div className="buttion-background-color ml-2 hidden rounded-md px-2 py-1 text-[10px] font-semibold text-white sm:block">
              {nights}N
            </div>
          )}
        </div>

        {/* ======================================
            MOBILE BOTTOM SHEET
        ====================================== */}

        {open && (
          <>
            {/* OVERLAY */}

            <div
              className="fixed inset-0 z-[999998] bg-black/40"
              onClick={handleClose}
            />

            {/* BOTTOM SHEET */}

            <div className="fixed bottom-0 left-0 z-[999999] w-full animate-[slideUp_0.25s_ease-out] rounded-t-2xl bg-white px-4 pt-3 pb-5 shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
              {/* DRAG HANDLE */}

              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-300" />

              {/* TOP */}

              <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
                <div className="flex items-center gap-5">
                  <span
                    className={`text-[14px] ${
                      activeField === "checkIn"
                        ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
                        : "font-medium text-gray-500"
                    } `}
                  >
                    Check In
                  </span>

                  <span className="text-gray-300">→</span>

                  <span
                    className={`text-[14px] ${
                      activeField === "checkOut"
                        ? "font-bold text-[#05144B] underline decoration-2 underline-offset-4"
                        : "font-medium text-gray-500"
                    } `}
                  >
                    Check Out
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <X size={17} />
                </button>
              </div>

              {/* CALENDAR */}

              {calendar}

              {/* ==================================
                  NEXT / DONE
              ================================== */}

              <button
                type="button"
                disabled={
                  activeField === "checkIn"
                    ? !selectedCheckIn
                    : !selectedCheckOut
                }
                onClick={handleNext}
                className="mt-4 w-full rounded-xl bg-[#05144B] py-3.5 text-sm font-semibold text-white! transition hover:bg-[#0C2FB1] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {activeField === "checkIn" ? "Next" : "Done"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
