"use client";

import { Input } from "antd";

export default function FloatingAntInput({
  label,
  value,
  onChange,
  maxLength,
  type = "text",
}) {
  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        type={type}
        placeholder=" "
        className="peer h-12! rounded-lg! px-4 pt-4 pb-1 text-[14px] font-medium"
      />

      <label
        className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none
        ${
          value
            ? "-top-2 text-xs text-[#4A9BB5]"
            : "top-3.5 text-sm text-gray-500"
        }
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-[#4A9BB5]
      `}
      >
        {label}
      </label>
    </div>
  );
}
