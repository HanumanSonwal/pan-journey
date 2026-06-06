"use client";

import { StarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

export default function BookingHeaderCard({ bookingData }) {
  const hotel = bookingData?.supplierData;
  const room = bookingData?.selectedRoom;

  return (
    <Card
      className="!mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm font-roboto!"
      styles={{
        body: {
          padding: 15,
        },
      }}
    >
      {/* Hotel Image */}
      <div className="relative h-[250px] w-full">
        <Image
          src={hotel?.HotelImage || "/no-room.jpg"}
          alt={hotel?.HotelName || "Hotel"}
          fill
          className="rounded"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <Title level={4} className="font-roboto! !mb-5 !text-[20px] font-bold!">
          {hotel?.HotelName}
        </Title>

        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div className="flex gap-1 text-[#f4b400]">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarFilled key={i} />
            ))}
          </div>

          <Tag className="rounded-full">Selected</Tag>

          <Tag className="!border-0 !bg-green-50 !text-green-600">
            Confirming
          </Tag>
        </div>

        <Text className="block text-[14px] text-[#666]">{hotel?.Address}</Text>

        <Text className="block text-[14px] text-[#666]">
          {hotel?.City}, {hotel?.Country}
        </Text>

        <div className="mt-4">
          <Tag color="blue">{room?.GroupName}</Tag>
        </div>
      </div>
    </Card>
  );
}
