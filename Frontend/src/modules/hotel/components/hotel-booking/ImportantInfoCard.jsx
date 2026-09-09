"use client";

import { Card, Typography } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

export default function ImportantInfoCard({ bookingData }) {
  const [expanded, setExpanded] = useState(false);

  const rawInfo = bookingData?.importantInformation;

  const info = Array.isArray(rawInfo) ? rawInfo : rawInfo ? [rawInfo] : [];

  const visibleItems = expanded ? info : info.slice(0, 4);

  return (
    <Card className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm">
      <Title level={4} className="font-roboto! !mb-5 !text-[20px] font-bold!">
        Important Information
      </Title>

      {visibleItems.length > 0 ? (
        <div className="space-y-3">
          {visibleItems.map((item, index) => {
            const text =
              typeof item === "string" ? item : item?.text || item?.type || "";

            if (!text) {
              return null;
            }

            return (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#444]" />

                <Text className="text-[16px] leading-7 text-[#555]">
                  {text}
                </Text>
              </div>
            );
          })}
        </div>
      ) : (
        <Text className="text-[14px] text-[#666]">
          No important information available.
        </Text>
      )}

      {info.length > 4 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="most-text-color mt-6! text-[16px]! font-medium! transition"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      )}
    </Card>
  );
}
