"use client";

import { Checkbox, ConfigProvider } from "antd";

export default function BookingAgreement({ checked, onChange }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff", // apna theme color
        },
      }}
    >
      <div className="rounded py-4">
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="agreement-checkbox"
        >
          <span className="font-roboto! text-[15px]! leading-7! font-medium! text-[#555]">
            I agree to PAN Journey terms, cancellation policy and booking
            conditions.
          </span>
        </Checkbox>
      </div>
    </ConfigProvider>
  );
}
