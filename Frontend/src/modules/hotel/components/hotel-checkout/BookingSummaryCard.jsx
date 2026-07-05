"use client";

import {
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  EnvironmentOutlined,
  NumberOutlined,
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
      className="rounded-xl border-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
      styles={{
        body: {
          padding: 18,
        },
      }}
    >
      {/* Image */}

      <div className="relative h-[220px] overflow-hidden rounded-xl">
        <Image
          src={hotelImage}
          alt={hotelName}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Hotel */}

      <div className="mt-5">
        <Title level={4} className="font-roboto! !mb-2 !text-[22px] font-bold!">
          {hotelName}
        </Title>

        <Text className="flex items-start gap-2 text-[14px] text-gray-500">
          <EnvironmentOutlined className="mt-1" />

          <span>{address}</span>
        </Text>

        <div className="mt-4 flex flex-wrap gap-2">
          <Tag color="blue">{roomName}</Tag>

          <Tag color={reservationStatus === "success" ? "green" : "orange"}>
            {reservationStatus.toUpperCase()}
          </Tag>

          <Tag color={paymentStatus === "success" ? "green" : "gold"}>
            Payment {paymentStatus}
          </Tag>
        </div>
      </div>

      {/* Divider */}

      <div className="my-5 border-t border-dashed" />

      {/* Booking Details */}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Text className="flex items-center gap-2">
            <NumberOutlined />
            Booking Ref
          </Text>

          <Text strong>{booking?.bookingReference}</Text>
        </div>

        <div className="flex items-center justify-between">
          <Text className="flex items-center gap-2">
            <CalendarOutlined />
            Booking Date
          </Text>

          <Text>{bookingDate}</Text>
        </div>

        <div className="flex items-center justify-between">
          <Text>Check-in</Text>

          <Text strong>{checkIn}</Text>
        </div>

        <div className="flex items-center justify-between">
          <Text>Check-out</Text>

          <Text strong>{checkOut}</Text>
        </div>

        <div className="flex items-center justify-between">
          <Text className="flex items-center gap-2">
            <ClockCircleOutlined />
            Stay
          </Text>

          <Text strong>
            {nights} Night{nights > 1 ? "s" : ""}
          </Text>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-6 rounded-lg bg-[#eef8fd] p-3">
        <div className="flex items-center gap-2">
          <CheckCircleFilled className="text-[#0f766e]" />

          <Text strong className="text-[#0f766e]">
            Reservation Created Successfully
          </Text>
        </div>

        <p className="mt-2 mb-0 text-[13px] text-gray-600">
          Please complete your payment to confirm your hotel booking.
        </p>
      </div>
    </Card>
  );
}
