"use client";

import { Button } from "antd";

export default function AppButton({
  children,
  loading,
  htmlType = "button",
  onClick,
}) {
  return (
    <Button
      htmlType={htmlType}
      loading={loading}
      onClick={onClick}
      className="w-full !h-[45px] !rounded-lg !text-white"
      style={{
        background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
        border: "none",
      }}
    >
      {children}
    </Button>
  );
}
