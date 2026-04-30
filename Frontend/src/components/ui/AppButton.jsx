"use client";

import { Button } from "antd";

export default function AppButton({ children, onClick }) {
  return (
    <Button
      type="default" // 👈 important
      onClick={onClick}
      className="w-full !h-[45px] !px-4 !rounded-lg !text-[16px] !font-medium !font-jost !text-white"
      style={{
        background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
        border: "none",
      }}
    >
      {children}
    </Button>
  );
}
