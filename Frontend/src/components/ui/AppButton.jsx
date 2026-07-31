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
      className="w-full !h-[45px] !rounded-lg !text-white buttion-background-color "
      style={{
       border: "none",
      }}
    >
      {children}
    </Button>
  );
}
