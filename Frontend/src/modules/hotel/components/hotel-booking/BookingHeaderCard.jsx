"use client";

import { StarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

export default function BookingHeaderCard({ bookingData }) {
  const hotelName = bookingData?.name || "Hotel";
  const location = bookingData?.location || {};

  const address = location?.address || "";

  const fullLocation = [location?.city, location?.state, location?.country]
    .filter(Boolean)
    .join(", ");

  const hotelImage = bookingData?.image || "/no-room.jpg";

  const rating = Math.min(
    Math.max(Number(bookingData?.starCategory || 0), 0),
    5,
  );

  const room = bookingData?.rooms?.[0] || bookingData?.selectedRoom || {};

  const roomName = room?.roomType || room?.GroupName || "Selected Room";

  return (
    <Card
      className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm"
      styles={{
        body: {
          padding: 15,
        },
      }}
    >
      <div className="flex gap-3 lg:hidden">
        <div className="relative h-[140px] w-[110px] shrink-0 overflow-hidden rounded sm:h-[160px] sm:w-[125px] md:h-[150px] md:w-[240px]">
          <Image
            src={hotelImage}
            alt={hotelName}
            fill
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <Title
            level={5}
            className="font-roboto! !mb-2 truncate !text-[16px] font-bold!"
          >
            {hotelName}
          </Title>

          <div className="mb-2 flex flex-wrap items-center gap-1">
            <div className="flex gap-[2px] text-[#f4b400]">
              {[1, 2, 3, 4, 5].map((item) => (
                <StarFilled
                  key={item}
                  className={`!text-[11px] ${
                    item <= rating ? "opacity-100" : "opacity-20"
                  }`}
                />
              ))}
            </div>

            <Tag className="!m-0 rounded-full !px-2 !text-[11px]">Selected</Tag>

            <Tag className="!m-0 !border-0 !bg-green-50 !px-2 !text-[11px] !text-green-600">
              Confirming
            </Tag>
          </div>

          {address && (
            <Text className="block truncate text-[12px] text-[#666]">
              {address}
            </Text>
          )}

          {fullLocation && (
            <Text className="block text-[12px] text-[#666]">
              {fullLocation}
            </Text>
          )}

          <div className="mt-4 max-w-full">
            <Tag
              color="blue"
              className="!h-auto !max-w-full !break-words !whitespace-normal"
            >
              {roomName}
            </Tag>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="relative h-[250px] w-full overflow-hidden rounded">
          <Image
            src={hotelImage}
            alt={hotelName}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-4">
          <Title
            level={4}
            className="font-roboto! !mb-5 !text-[20px] font-bold!"
          >
            {hotelName}
          </Title>

          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="flex gap-1 text-[#f4b400]">
              {[1, 2, 3, 4, 5].map((item) => (
                <StarFilled
                  key={item}
                  className={item <= rating ? "opacity-100" : "opacity-20"}
                />
              ))}
            </div>

            <Tag className="rounded-full">Selected</Tag>

            <Tag className="!border-0 !bg-green-50 !text-green-600">
              Confirming
            </Tag>
          </div>

          {address && (
            <Text className="block text-[14px] text-[#666]">{address}</Text>
          )}

          {fullLocation && (
            <Text className="block text-[14px] text-[#666]">
              {fullLocation}
            </Text>
          )}

          <div className="mt-4">
            <Tag color="blue">{roomName}</Tag>
          </div>
        </div>
      </div>
    </Card>
  );
}
