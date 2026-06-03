"use client";

import { Checkbox, Typography } from "antd";

const { Text } = Typography;

export default function BookingAgreement({ checked, onChange }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
      <Checkbox
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <Text className="leading-7 text-[#555]">
        I agree to PAN Journey terms, cancellation policy and booking
        conditions.
      </Text>
    </div>
  );
}
