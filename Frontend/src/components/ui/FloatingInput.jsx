"use client";

import { Input } from "antd";

export default function FloatingAntInput({ label, ...rest }) {
  return (
    <div className="relative w-full">
      <Input
        {...rest}
        placeholder=" "
        inputMode="numeric"
        className="peer !h-[48px] !rounded-lg px-4 pt-4 pb-1 text-[14px]"
      />

      <label
        className="absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none
        top-3.5 text-sm text-gray-500
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4A9BB5]
        peer-[&:not(:placeholder-shown)]:-top-2
        peer-[&:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}
