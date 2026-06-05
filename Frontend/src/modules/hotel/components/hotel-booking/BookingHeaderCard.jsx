"use client";

import { StarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function BookingHeaderCard({ bookingData }) {
  const hotel = bookingData?.supplierData;

  const room = bookingData?.selectedRoom;

  return (
    <Card className="overflow-hidden rounded-2xl border-0 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row">
        <img
          src={hotel?.HotelImage || "/no-room.jpg"}
          alt="hotel"
          className="h-[180px] w-full rounded-xl object-cover md:w-[220px]"
        />

        <div className="flex-1">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <Title level={3} className="!mb-2 !text-[20px] !font-semibold">
                {hotel?.HotelName}
              </Title>

              <div className="mb-3 flex items-center gap-3">
                <div className="flex gap-1 text-[#f4b400]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarFilled key={i} />
                  ))}
                </div>

                <Tag className="rounded-full">Selected</Tag>
              </div>

              <Text className="block text-[14px] text-[#666]">
                {hotel?.Address}
              </Text>

              <Text className="block text-[14px] text-[#666]">
                {hotel?.City}, {hotel?.Country}
              </Text>

              <div className="mt-4">
                <Tag color="blue">{room?.GroupName}</Tag>
              </div>
            </div>

            <Tag color="success">Confirming</Tag>
          </div>
        </div>
      </div>
    </Card>
  );
}
