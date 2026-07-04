"use client";

import { Card, Divider, Typography } from "antd";

const { Title, Text } = Typography;

export default function PriceBreakupCard({ bookingData }) {
  const pricing = bookingData?.selectedRatePlan?.PricingBreakdown ?? {};

  const basePrice = Number(pricing.basePrice || 0);

  const tax = Number(pricing.platformFeeAndTax || 0);

  const totalAmount = Number(pricing.finalPrice || 0);

  const currencySymbol = pricing.currencySymbol || "₹";

  const rows = [
    {
      label: "Base Price",
      value: basePrice,
    },
    {
      label: "Tax & Fees",
      value: tax,
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

      <div className="space-y-1">
        {rows.map((item, index) => (
          <div key={item.label}>
            <div className="flex items-center justify-between">
              <Text className="!text-[14px] leading-[100%] font-medium tracking-[0%]">
                {item.label}
              </Text>

              <Text className="!font-['Roboto'] text-[12px] font-medium text-gray-800">
                {currencySymbol} {Number(item.value).toLocaleString("en-IN")}
              </Text>
            </div>

            {index !== rows.length - 1 && <Divider className="!my-2" />}
          </div>
        ))}
      </div>

      <Divider className="!my-3" />

      <div className="flex items-center justify-between">
        <Text className="!font-['Roboto'] text-[12px] font-semibold">
          Total Amount
        </Text>

        <Text className="!font-['Roboto'] text-[22px] font-bold text-[#1677ff]">
          {currencySymbol} {totalAmount.toLocaleString("en-IN")}
        </Text>
      </div>
    </Card>
  );
}
