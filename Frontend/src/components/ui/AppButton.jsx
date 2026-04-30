"use client";

import { Button } from "antd";

export default function AppButton({ children, onClick, type = "primary" }) {
  return (
    <Button
      onClick={onClick}
      className="w-full h-10 text-2xl rounded-lg text-[16px] font-medium font-jost text-white border-none"
      style={{
        background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
      }}
    >
      {children}
    </Button>
  );
}