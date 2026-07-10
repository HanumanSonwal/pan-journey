"use client";

import { useState } from "react";
import CalendarPopover from "./CalendarPopover";
import DateInput from "./DateInput";

export default function DateRangePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <DateInput value={value} onClick={() => setOpen(true)} />

      <CalendarPopover
        open={open}
        value={value}
        onChange={onChange}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
