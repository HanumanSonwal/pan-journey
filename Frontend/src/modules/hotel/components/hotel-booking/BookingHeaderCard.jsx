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

      {/* MOBILE VIEW */}
      <div className="flex gap-3 lg:hidden">

        {/* Image */}
        <div className="relative  h-[140px] w-[110px] sm:h-[160px] sm:w-[125px] md:h-[150px] md:w-[240px]  shrink-0 overflow-hidden rounded">
          <Image
            src={hotel?.HotelImage || "/no-room.jpg"}
            alt={hotel?.HotelName || "Hotel"}
            fill
            className="object-cover"
          />
        </div>


        {/* Details */}
        <div className="min-w-0 flex-1">

          <Title
            level={5}
            className="!mb-2 truncate font-roboto! !text-[16px] font-bold!"
          >
            {hotel?.HotelName}
          </Title>


          <div className="mb-2 flex flex-wrap items-center gap-1">

            <div className="flex gap-[2px] text-[#f4b400]">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarFilled
                  key={i}
                  className="!text-[11px]"
                />
              ))}
            </div>


            <Tag className="!m-0 rounded-full !px-2 !text-[11px]">
              Selected
            </Tag>


            <Tag className="!m-0 !border-0 !bg-green-50 !px-2 !text-[11px] !text-green-600">
              Confirming
            </Tag>

          </div>


          <Text className="block truncate text-[12px] text-[#666]">
            {hotel?.Address}
          </Text>


          <Text className="block text-[12px] text-[#666]">
            {hotel?.City}, {hotel?.Country}
          </Text>


          <div className="mt-1">
            <Tag color="blue" className="!text-[11px]">
              {room?.GroupName}
            </Tag>
          </div>


        </div>

      </div>




      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">

        {/* Hotel Image */}
        <div className="relative h-[250px] w-full overflow-hidden rounded">
          <Image
            src={hotel?.HotelImage || "/no-room.jpg"}
            alt={hotel?.HotelName || "Hotel"}
            fill
            className="object-cover"
            priority
          />
        </div>


        {/* Content */}
        <div className="p-4">

          <Title
            level={4}
            className="font-roboto! !mb-5 !text-[20px] font-bold!"
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

      </div>


    </Card>
  );
}
