"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Day from "./Day";
import {
  WEEK_DAYS,
  getMonthMatrix,
  getMonthName,
  nextMonth,
  prevMonth,
} from "./utils";
import { fa } from "zod/v4/locales";

export default function Calendar({ value, onChange, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  const [startDate, setStartDate] = useState(value?.[0] || null);
  const [endDate, setEndDate] = useState(value?.[1] || null);
  const [hoverDate, setHoverDate] = useState(null);

  const months = [currentMonth, nextMonth(currentMonth)];

  /**
   * Calendar Behaviour
   *
   * true  = Auto Close (MMT)
   * false = Apply Button
   */
  const AUTO_CLOSE = false;

  useEffect(() => {
    setStartDate(value?.[0] || null);
    setEndDate(value?.[1] || null);
  }, [value]);

  const handleDateClick = (date) => {
    // First selection
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    // User selected earlier date
    if (date.isBefore(startDate, "day")) {
      setStartDate(date);
      return;
    }

    // Same day
    if (date.isSame(startDate, "day")) {
      return;
    }

    // Final range
    setEndDate(date);

    // ---------- AUTO CLOSE MODE ----------
    if (AUTO_CLOSE) {
      onChange?.([startDate, date]);

      requestAnimationFrame(() => {
        onClose?.();
      });
    }
  };

  return (
    <div className="w-[820px] rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
        <button
          onClick={() => setCurrentMonth(prevMonth(currentMonth))}
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#EAF7FD] hover:text-[#0077B6]"
        >
          ←
        </button>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Select Check-in & Check-out
          </h2>

          <p className="mt-1 text-xs text-gray-500">Choose your travel dates</p>
        </div>

        <button
          onClick={() => setCurrentMonth(nextMonth(currentMonth))}
          className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#EAF7FD] hover:text-[#0077B6]"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {months.map((month) => (
          <div key={month.format("YYYY-MM")}>
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              {getMonthName(month)}
            </h3>

            {/* Week Days */}

            <div className="mb-2 grid grid-cols-7">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day}
                  className="pb-2 text-center text-xs font-semibold tracking-wide text-gray-400 uppercase"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Dates */}

            <div className="space-y-0.5">
              {getMonthMatrix(month).map((week, index) => (
                <div key={index} className="grid grid-cols-7">
                  {week.map((day) => (
                    <Day
                      key={day.date.format("YYYY-MM-DD")}
                      day={day}
                      start={startDate}
                      end={endDate}
                      hovered={hoverDate}
                      onClick={handleDateClick}
                      onHover={setHoverDate}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}

      {!AUTO_CLOSE && (
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">Selected Stay</p>

            <h3 className="font-semibold text-gray-800">
              {startDate && endDate
                ? `${endDate.diff(startDate, "day")} Night${
                    endDate.diff(startDate, "day") > 1 ? "s" : ""
                  }`
                : "Select Dates"}
            </h3>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Clear
            </button>

            <button
              disabled={!startDate || !endDate}
              onClick={() => {
                onChange?.([startDate, endDate]);
                onClose?.();
              }}
              className="rounded-lg bg-[#0077B6] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
