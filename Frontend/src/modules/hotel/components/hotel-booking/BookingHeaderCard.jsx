"use client";

import { StarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function BookingHeaderCard({ bookingData }) {
  const hotel = bookingData?.supplierData;

  const room = bookingData?.selectedRoom;

  return (
    <Card className="overflow-hidden !rounded-t-2xl !rounded-b-none border-0 w-full !-mt-16">

      {/* Big Image */}
      <img
        src={hotel?.HotelImage || "/no-room.jpg"}
        alt="hotel"
        className="w-full h-[250px] rounded-xl object-cover"
      />

      {/* Details */}
      <div className="mt-4">

        <Title
          level={3}
          className="!mb-2 !text-[22px] !font-semibold"
        >
          {hotel?.HotelName}
        </Title>

        <div className="mb-3 flex flex-wrap items-center gap-3">
          <div className="flex gap-1 text-[#f4b400]">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarFilled key={i} />
            ))}
          </div>

          <Tag className="rounded-full">
            Selected
          </Tag>

          <Tag className="!border-0 !bg-green-50 !text-green-600">
            Confirming
          </Tag>
        </div>

        <Text className="block text-[14px] text-[#666]">
          {hotel?.Address}
        </Text>

        <Text className="block text-[14px] text-[#666]">
          {hotel?.City}, {hotel?.Country}
        </Text>

        <div className="mt-4">
          <Tag color="blue">
            {room?.GroupName}
          </Tag>
        </div>

      </div>
    </Card>
  );
}
