"use client";

import { Checkbox, ConfigProvider } from "antd";
import PriceBreakupCard from "./PriceBreakupCard";

export default function BookingAgreement({ checked, onChange, bookingData }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <PriceBreakupCard bookingData={bookingData} />
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
