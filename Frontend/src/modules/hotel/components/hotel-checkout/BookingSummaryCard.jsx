"use client";

import {
  CheckCircleFilled,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import dayjs from "dayjs";
import Image from "next/image";

const { Title, Text } = Typography;

export default function BookingSummaryCard({
  booking = {},
  hotel = {},
  room = {},
  search = {},
}) {
  const hotelImage =
    booking?.hotel?.image ||
    hotel?.HotelImage?.replace("_b.", "_z.")?.replace("_t.", "_z.") ||
    "/no-room.jpg";

  const hotelName = hotel?.HotelName || "Hotel";

  const roomName = room?.GroupName || "Room";

  const address = [hotel?.Address, hotel?.City, hotel?.Country]
    .filter(Boolean)
    .join(", ");

  const bookingDate = booking?.createdAt
    ? dayjs(booking.createdAt).format("DD MMM YYYY, hh:mm A")
    : "--";

  const checkIn = search?.checkIn
    ? dayjs(search.checkIn).format("DD MMM YYYY")
    : "--";

  const checkOut = search?.checkOut
    ? dayjs(search.checkOut).format("DD MMM YYYY")
    : "--";

  const nights =
    search?.checkIn && search?.checkOut
      ? dayjs(search.checkOut).diff(dayjs(search.checkIn), "day")
      : 0;

  const reservationStatus =
    booking?.bookingStatus?.reservationStatus || "Pending";

  const paymentStatus = booking?.bookingStatus?.paymentStatus || "Pending";

  return (
    <Card
      variant={false}
      className="overflow-hidden rounded-xl border border-[#EAF2F8] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
      styles={{
        body: {
          padding: 24,
        },
      }}
    >
      {/* Image */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Hotel Image */}
        <div className="relative !h-[200px] overflow-hidden rounded-xl sm:h-[190px] sm:w-[290px]">
          <Image
            src={hotelImage}
            fill
            alt={hotelName}
            className="object-cover duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4">
            <Tag color="blue" className="rounded-full px-2">
              {roomName}
            </Tag>
          </div>
        </div>

        {/* Hotel Details */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <Title
              level={3}
              className="font-roboto !mb-2 !text-[22px] !font-semibold !text-[#1D2939]"
            >
              {hotelName}
            </Title>

            <div className="mt-2 flex items-start gap-2">
              <EnvironmentOutlined className="mt-1 most-text-color" />

              <Text className=" font-roboto text-[15px] most-text-color">
                {address}
              </Text>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <Tag color="green" className="rounded-full px-4 py-1">
                Reservation Confirmed
              </Tag>

              <Tag color="processing" className="rounded-full px-4 py-1">
                Payment Success
              </Tag>
            </div>
            <div className="my-5 border-t border-dashed" />

            {/* Booking Details */}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <Text className="block text-[12px] tracking-wide text-gray-500 uppercase">
                  Booking Reference
                </Text>

                <Text strong className="text-[15px]">
                  {booking?.bookingReference}
                </Text>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <Text className="block text-[12px] tracking-wide text-gray-500 uppercase">
                  Booking Date
                </Text>

                <Text strong className="text-[15px]">
                  {bookingDate}
                </Text>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Divider */}


      <div className="mt-5 rounded-xl border border-[#E5EEF7] bg-[#FAFCFF] px-3 py-6 sm:p-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Check-in */}
          <div className="flex-1 text-center">
            <Text className="block text-[11px] text-gray-500 sm:text-[13px]">
              Check-in
            </Text>

            <Text
              strong
              className="block text-[14px] leading-none sm:text-[22px]"
            >
              {dayjs(search?.checkIn).format("DD MMM YYYY")}
            </Text>
          </div>

          {/* Stay Info */}
          <div className="flex shrink-0 flex-col items-center">
            <div className="whitespace-nowrap rounded-full border border-[#76B7E5] px-2 py-1 text-[11px] font-medium text-[#2D8BC8] sm:px-4 sm:py-1 sm:text-[13px]">
              <ClockCircleOutlined className="mr-1" />
              {nights} Night{nights > 1 ? "s" : ""}
            </div>

            <Text className="mt-2 whitespace-nowrap text-center text-[10px] text-gray-500 sm:text-[13px]">
              {search?.rooms?.length || 1} Room • {search?.adults || 2} Adult
              {search?.adults > 1 ? "s" : ""}
            </Text>
          </div>

          {/* Check-out */}
          <div className="flex-1 text-center">
            <Text className="block text-[11px] text-gray-500 sm:text-[13px]">
              Check-out
            </Text>

            <Text
              strong
              className="block text-[14px] leading-none sm:text-[22px]"
            >
              {dayjs(search?.checkOut).format("DD MMM YYYY")}
            </Text>
          </div>
        </div>
      </div>
      {/* Footer */}

      <div className="mt-4 flex gap-3 rounded-xl border border-[#d8edf9] bg-[#f8fcff] px-4 py-3">
        <CheckCircleFilled className="mt-0.5 flex-shrink-0 text-[18px] text-[#0f766e]" />

        <div>
          <Text strong className="block text-[#0f766e]">
            Reservation Created Successfully
          </Text>

          <Text className="text-[13px] text-gray-500">
            Complete your payment to confirm your booking.
          </Text>
        </div>
      </div>
    </Card>
  );
}
