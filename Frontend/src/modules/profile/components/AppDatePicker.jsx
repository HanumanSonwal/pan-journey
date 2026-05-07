"use client";

import { DatePicker } from "antd";

export default function AppDatePicker({ error, ...props }) {
  return (
    <div>
      <DatePicker
        size="large"
        className={`!h-[43px] !w-full !rounded ${
          error ? "!border-red-500" : ""
        } `}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
