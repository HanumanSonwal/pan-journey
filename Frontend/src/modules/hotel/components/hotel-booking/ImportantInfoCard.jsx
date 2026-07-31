"use client";

import { Card, Typography } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

export default function ImportantInfoCard({ bookingData }) {
  const [expanded, setExpanded] = useState(false);

  const info =
    bookingData?.selectedRatePlan?.RatePlanDetails?.[0]?.EssentialInformation ||
    [];

  const visibleItems = expanded ? info : info.slice(0, 4);

  return (
    <Card className="!mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm font-roboto!">
      <Title level={4} className="font-roboto! !mb-5 !text-[20px] font-bold!">
        Important Information
      </Title>

      <div className="space-y-3">
        {visibleItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="mt-[9px] h-[5px] w-[5px] rounded-full bg-[#444]" />

            <Text className="text-[16px] leading-7 text-[#555]">
              {item?.text || item?.type}
            </Text>
          </div>
        ))}
      </div>

      {info.length > 4 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-6! text-[16px]! font-medium! most-text-color transition "
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}
    </Card>
  );
}
