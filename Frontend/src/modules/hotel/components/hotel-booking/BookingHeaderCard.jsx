"use client";

import { StarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function BookingHeaderCard({ bookingData }) {
  const hotel = bookingData?.supplierData;

  const room = bookingData?.selectedRoom;

  return (
    <Card

      styles={{
        body: {
          padding: 7,
        },
      }}

      className="overflow-hidden !rounded-t-1xl !rounded-b-none border-0 w-full mt-[-64px] sm:mt-2 md:!mt-[-40px] lg:!mt-[-64px] !p-0 ">

      {/* Big Image */}
      <img
        src={hotel?.HotelImage || "/no-room.jpg"}
        alt="hotel"
        className="w-full h-[250px] rounded-xl object-cover "
      />

      {/* Details */}
      <div className=" !m-2">

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

        <div className="mt-4 mb-2">
          <Tag color="blue">
            {room?.GroupName}
          </Tag>
        </div>

      </div>
    </Card>
  );
}
