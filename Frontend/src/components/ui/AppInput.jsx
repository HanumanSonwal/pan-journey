"use client";

import { Input } from "antd";
import { useState } from "react";

export default function AppInput({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
}) {
  const [focused, setFocused] = useState(false);

  const isActive = focused || value;

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <label
        className={`absolute left-3 px-1 text-[12px] font-roboto transition-all duration-200
        ${isActive ? "-top-2 bg-white text-[#4A9BB5]" : "top-1/2 -translate-y-1/2 text-gray-400"}
        `}
      >
        {label}
      </label>

      {/* Input */}
      <Input
        value={value}
        onChange={onChange}
        placeholder={!isActive ? placeholder : ""}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="!h-[56px] !rounded-xl !px-4 !text-[16px] font-medium font-roboto"
      />
    </div>
  );
}
