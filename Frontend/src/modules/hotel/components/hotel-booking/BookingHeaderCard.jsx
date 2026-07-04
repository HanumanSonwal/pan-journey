"use client";

import { StarFilled } from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

export default function BookingHeaderCard({ bookingData }) {
  const hotel = bookingData?.supplierData ?? {};
  const room = bookingData?.selectedRoom ?? {};

  const { HotelImage, HotelName, Address, City, State, Country, StarRating } =
    hotel;

  const fullLocation = [City, State, Country].filter(Boolean).join(", ");

  const roomName = room?.GroupName || "Standard Room";

  const hotelImage = HotelImage
    ? HotelImage.replace("_b.", "_z.").replace("_t.", "_z.")
    : "/no-room.jpg";

  const rating = Number(StarRating || 0);

  return (
    <Card
      className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm"
      styles={{
        body: {
          padding: 15,
        },
      }}
    >
      {/* Hotel Image */}
      <div className="relative h-[250px] w-full">
        <Image
          src={hotelImage}
          alt={hotel?.HotelName || "Hotel"}
          fill
          className="rounded"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <Title level={4} className="font-roboto !mb-0 !text-[22px] !font-bold">
          {HotelName}
        </Title>

        <div className="flex flex-wrap items-center gap-2">
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

        <div className="rounded-lg bg-gray-50 p-3">
          <Text className="block text-[14px] font-medium text-gray-700">
            {Address || "Address not available"}
          </Text>

          <Text className="mt-1 block text-[13px] text-gray-500">
            {fullLocation}
          </Text>
        </div>

        <div className="mt-4">
          <Tag color="blue" className="!rounded-full !px-3 !py-1">
            {roomName}
          </Tag>
        </div>
      </div>
    </Card>
  );
}
