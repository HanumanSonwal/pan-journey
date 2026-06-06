"use client";

import { Card, Divider, Typography } from "antd";

const { Title, Text } = Typography;

export default function PriceBreakupCard({ bookingData }) {
  const pricing = bookingData?.pricing;

  return (
    <div className="top-24 mt-2">
      <Card className="rounded-2xl border-0 shadow-sm !shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
        <Title level={4} className="!mb-">
          Price Breakup
        </Title>

        {[
          {
            label: "Base Price",
            value: pricing?.basicAmount,
          },
          {
            label: "Tax",
            value: pricing?.tax,
          },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between py-3">
              <Text>{item.label}</Text>

              <Text strong>
                ₹ {Number(item.value || 0).toLocaleString("en-IN")}
              </Text>
            </div>

            <Divider className="!my-0" />
          </div>
        ))}

        <div className="flex items-center justify-between pt-5">
          <Title level={5} className="!mb-0">
            Total
          </Title>

          <Title level={4} className="!mb-0">
            ₹ {Number(pricing?.totalAmount || 0).toLocaleString("en-IN")}
          </Title>
        </div>
      </Card>
    </div>
  );
}
