"use client";

import { Card, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function RoomPackageCard({ bookingData }) {
  const room = bookingData?.rooms || bookingData?.selectedRoom || {};

  console.log("RoomPackageCard bookingData:", bookingData);

  const inclusionSource = room?.inclusion || room?.Inclusion || "";

  const inclusion = Array.isArray(inclusionSource)
    ? inclusionSource
    : String(inclusionSource || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  const cancellationPolicy =
    room?.policy?.outPolicyReason || room?.cancellationPolicy || "";

  const payment = room?.payment || {};

  return (
    <Card className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tag color="gold" className="rounded-full px-4 py-1 text-sm">
          Room Package
        </Tag>

        {cancellationPolicy && (
          <Tag color="green" className="rounded-full px-4 py-1 text-sm">
            Cancellation Available
          </Tag>
        )}
      </div>

      <div className="mt-5">
        <Title level={4} className="font-roboto! !mb-3 !text-[20px] font-bold!">
          {room?.roomType || "Selected Room"}
        </Title>

        {room?.additionalInfo && (
          <Text className="text-[14px] text-[#666]">{room.additionalInfo}</Text>
        )}
      </div>

      {!!inclusion.length && (
        <div className="mt-6">
          <Title level={5} className="!mb-3 !text-[15px] !font-semibold">
            Inclusions
          </Title>

          <div className="flex flex-wrap gap-2">
            {inclusion.map((item, index) => (
              <Tag
                key={`${item}-${index}`}
                color="green"
                className="rounded-full px-3 py-1"
              >
                {item}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {cancellationPolicy && (
        <div className="mt-7">
          <Title level={5} className="!mb-1 !text-[15px] !font-semibold">
            Cancellation Policy
          </Title>

          <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-4 text-[14px] leading-7 text-green-700">
            {cancellationPolicy}
          </div>
        </div>
      )}

      {(payment?.creditCardRequired || payment?.panMandatory) && (
        <div className="mt-6">
          <Title level={5} className="!mb-3 !text-[15px] !font-semibold">
            Payment Requirements
          </Title>

          <div className="space-y-2 text-[14px] text-[#555]">
            {payment?.creditCardRequired && (
              <div>Credit card is required for this booking.</div>
            )}

            {payment?.panMandatory && (
              <div>PAN number is mandatory for this booking.</div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
