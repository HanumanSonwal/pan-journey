"use client";

import Calendar from "./Calendar";

export default function CalendarPopover({ open, value, onChange, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed top-[150px] left-1/2 z-[999999] -translate-x-1/2">
      <Calendar value={value} onChange={onChange} onClose={onClose} />
    </div>
  );
}
