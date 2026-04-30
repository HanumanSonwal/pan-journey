"use client";

import { Input } from "antd";

export default function AppInput({
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className="h-[48px] rounded-lg px-4 text-[14px] font-medium font-roboto"
    />
  );
}