"use client";

import { Card, Divider, Typography } from "antd";

const { Title, Text } = Typography;

export default function PriceBreakupCard({ bookingData }) {
  const pricing = bookingData?.pricing;

  const rows = [
    {
      label: "Base Price",
      value: pricing?.basicAmount,
    },
    {
      label: "Tax & Fees",
      value: pricing?.tax,
    },
  ];

  return (
    <Card
      className="rounded border-0 shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      styles={{
        body: {
          padding: 16,
        },
      }}
    >
      <Title level={5} className="!mb-3 !font-['Roboto'] !font-semibold">
        Price Breakup
      </Title>

      <div className="space-y-2">
        {rows.map((item, index) => (
          <div key={item.label}>
            <div className="flex items-center justify-between py-3">
              <Text className="font-medium !text-[17.5px] leading-[100%] tracking-[0%]">{item.label}</Text>

              <Text className="!font-['Roboto'] text-[14px] font-medium text-gray-800">
                ₹ {Number(item.value || 0).toLocaleString("en-IN")}
              </Text>
            </div>

            {index !== rows.length - 1 && <Divider className="!my-2" />}
          </div>
        ))}
      </div>

      <Divider className="!my-3" />

      <div className="flex items-center justify-between">
        <Text className="!font-['Roboto'] text-[15px] font-semibold">
          Total Amount
        </Text>

        <Text className="!font-['Roboto'] text-[22px] font-bold text-[#1677ff]">
          ₹ {Number(pricing?.totalAmount || 0).toLocaleString("en-IN")}
        </Text>
      </div>
    </Card>
  );
}
