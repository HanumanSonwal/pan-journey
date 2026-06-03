"use client";

import { Card, Collapse, Typography } from "antd";

const { Title, Text } = Typography;

export default function ImportantInfoCard({ bookingData }) {
  const info =
    bookingData?.selectedRatePlan?.RatePlanDetails?.[0]?.EssentialInformation ||
    [];

  const items = info.map((item, index) => ({
    key: index,
    label: <span className="font-medium text-[#222]">{item?.type}</span>,
    children: <Text className="leading-7 text-[#555]">{item?.text}</Text>,
  }));

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <Title level={4} className="!mb-5">
        Important Information
      </Title>

      <Collapse items={items} ghost accordion />
    </Card>
  );
}
