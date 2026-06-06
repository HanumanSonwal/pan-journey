"use client";

import { Card, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function RoomPackageCard({ bookingData }) {
  const detail = bookingData?.selectedRatePlan?.RatePlanDetails?.[0];

  const room = bookingData?.selectedRoom;

  const inclusion =
    detail?.Inclusion?.split(",")
      ?.map((i) => i.trim())
      ?.filter(Boolean) || [];

  const refundable = detail?.Refundable === "True";

  return (
    <Card className="!mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm font-roboto!">
      {/* TOP */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tag color="gold" className="rounded-full px-4 py-1 text-sm">
          Room Package
        </Tag>

        <Tag
          color={refundable ? "green" : "red"}
          className="rounded-full px-4 py-1 text-sm"
        >
          {refundable ? "Refundable" : "Non Refundable"}
        </Tag>
      </div>

      {/* ROOM INFO */}
      <div className="mt-5">
        <Title level={4} className="font-roboto! !mb-5 !text-[20px] font-bold!">
          {room?.GroupName}
        </Title>

        <Text className="text-[14px] text-[#666]">
          {room?.HotelRoomTypeDesc}
        </Text>
      </div>

      {/* INCLUSIONS */}
      {!!inclusion.length && (
        <div className="mt-6">
          <Title level={5} className="!mb-3 !text-[15px] !font-semibold">
            Inclusions
          </Title>

          <div className="flex flex-wrap gap-2">
            {inclusion.map((item, i) => (
              <Tag key={i} color="green" className="rounded-full px-3 py-1">
                {item}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {/* REFUND INFO */}
      <div className="mt-7">
        <Title level={5} className="!mb-1 !text-[15px] !font-semibold">
          Cancellation Policy
        </Title>

        <div
          className={`mt-3 rounded-xl border p-4 text-[14px] leading-7 ${
            refundable
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
          dangerouslySetInnerHTML={{
            __html:
              detail?.CancellationPolicy ||
              "No cancellation information available",
          }}
        />
      </div>
    </Card>
  );
}
