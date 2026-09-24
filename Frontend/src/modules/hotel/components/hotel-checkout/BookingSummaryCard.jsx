"use client";

import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import dayjs from "dayjs";
import Image from "next/image";

const { Text, Title } = Typography;

export default function BookingSummaryCard({
  booking = {},
  hotel = {},
  room = {},
  search = {},
}) {
  // =========================================================
  // HOTEL IMAGE
  // =========================================================
  const hotelImage =
    booking?.hotel?.image ||
    hotel?.HotelImage?.replace("_b.", "_z.")?.replace("_t.", "_z.") ||
    "/no-room.jpg";

  // =========================================================
  // HOTEL DATA
  // =========================================================
  const hotelName = hotel?.HotelName || "Hotel";

  const roomName =
    room?.GroupName ||
    room?.RoomName ||
    room?.roomName ||
    "Room";

  const address = [
    hotel?.Address,
    hotel?.City,
    hotel?.Country,
  ]
    .filter(Boolean)
    .join(", ");

  // =========================================================
  // DATES
  // =========================================================
  const checkIn = search?.checkIn
    ? dayjs(search.checkIn)
    : null;

  const checkOut = search?.checkOut
    ? dayjs(search.checkOut)
    : null;

  const nights =
    checkIn && checkOut
      ? Math.max(checkOut.diff(checkIn, "day"), 0)
      : 0;

  // =========================================================
  // GUEST / ROOM COUNT
  // =========================================================
  const roomCount = Array.isArray(search?.rooms)
    ? search.rooms.length
    : Number(search?.rooms) || 1;

  const adultCount = Number(search?.adults) || 1;

  const childCount = Number(search?.children) || 0;

  const totalGuests = adultCount + childCount;

  // =========================================================
  // RATING
  // =========================================================
  const rating =
    hotel?.Rating ||
    hotel?.rating ||
    hotel?.HotelRating ||
    booking?.hotel?.rating ||
    null;

  const reviewCount =
    hotel?.ReviewCount ||
    hotel?.reviewCount ||
    booking?.hotel?.reviewCount ||
    null;

  return (
    <Card
      variant={false}
      className="
        overflow-hidden
        rounded-[16px]
        border-0
        bg-white
        shadow-none
      "
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      {/* =====================================================
          BOOKING SUMMARY HEADER
      ====================================================== */}
      <div className="px-5 pt-5 pb-4">
        {/* =================================================
            TITLE + RATING
        ================================================== */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <Title
            level={5}
            className="
              !mb-0
              !font-roboto
              !text-[15px]
              !font-bold
              !tracking-wide
              !text-[#667085]
            "
          >
            BOOKING SUMMARY
          </Title>

          {/* Rating */}
          {rating && (
            <div
              className="
                flex
                shrink-0
                items-center
                gap-1
                rounded-full
                bg-[#d9f8e9]
                px-3
                py-1.5
                text-[12px]
                font-semibold
                text-[#087443]
              "
            >
              <StarFilled className="!text-[11px]" />

              <span>{rating}</span>

              {reviewCount && (
                <span className="font-normal">
                  ({reviewCount} reviews)
                </span>
              )}
            </div>
          )}
        </div>

        {/* =================================================
            HOTEL INFORMATION
        ================================================== */}
        <div className="flex items-start gap-4">
          {/* HOTEL IMAGE */}
          <div
            className="
              relative
              h-[116px]
              w-[116px]
              shrink-0
              overflow-hidden
              rounded-[13px]
              bg-gray-100
            "
          >
            <Image
              src={hotelImage}
              fill
              sizes="116px"
              alt={hotelName}
              className="object-cover"
            />

            {/* Bottom image overlay */}
            <div
              className="
                absolute
                inset-x-0
                bottom-0
                bg-gradient-to-t
                from-black/65
                to-transparent
                px-2
                pb-2
                pt-5
              "
            >
              <span className="text-[10px] font-medium text-white">
                {roomName}
              </span>
            </div>
          </div>

          {/* HOTEL DETAILS */}
          <div className="min-w-0 flex-1">
            <Title
              level={4}
              className="
                !mb-1
                !font-roboto
                !text-[20px]
                !font-bold
                !leading-[26px]
                !text-[#172033]
              "
            >
              {hotelName}
            </Title>

            {/* Address */}
            <div className="flex items-start gap-1.5">
              <EnvironmentOutlined
                className="
                  mt-[3px]
                  shrink-0
                  !text-[14px]
                  !text-[#f59e0b]
                "
              />

              <Text
                className="
                  !font-roboto
                  !text-[13px]
                  !leading-[19px]
                  !text-[#667085]
                "
              >
                {address || "Hotel location unavailable"}
              </Text>
            </div>

            {/* Room */}
            <div className="mt-3">
              <Tag
                className="
                  !m-0
                  !rounded-[6px]
                  !border-0
                  !bg-[#edf5ff]
                  !px-3
                  !py-1
                  !text-[12px]
                  !font-semibold
                  !text-[#1453a6]
                "
              >
                {roomName}
              </Tag>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          STAY INFORMATION
      ====================================================== */}
      <div className="mx-5 mb-5 rounded-[14px] border border-[#e1e7ec] bg-[#f7f9fc] px-4 py-4">
        <div className="flex items-center">
          {/* =================================================
              CHECK-IN
          ================================================== */}
          <div className="min-w-0 flex-1">
            <Text
              className="
                !mb-1
                block
                !font-roboto
                !text-[11px]
                !font-medium
                !tracking-wide
                !text-[#98a2b3]
                uppercase
              "
            >
              CHECK-IN
            </Text>

            <Text
              strong
              className="
                block
                !font-roboto
                !text-[16px]
                !leading-[20px]
                !text-[#172033]
              "
            >
              {checkIn
                ? checkIn.format("DD MMM YYYY")
                : "--"}
            </Text>

            <Text
              className="
                !font-roboto
                !text-[12px]
                !text-[#667085]
              "
            >
              From 12:00 PM
            </Text>
          </div>

          {/* =================================================
              VERTICAL DIVIDER
          ================================================== */}
          <div className="mx-4 h-[52px] w-px bg-[#dfe4ea]" />

          {/* =================================================
              CHECK-OUT
          ================================================== */}
          <div className="min-w-0 flex-1">
            <Text
              className="
                !mb-1
                block
                !font-roboto
                !text-[11px]
                !font-medium
                !tracking-wide
                !text-[#98a2b3]
                uppercase
              "
            >
              CHECK-OUT
            </Text>

            <Text
              strong
              className="
                block
                !font-roboto
                !text-[16px]
                !leading-[20px]
                !text-[#172033]
              "
            >
              {checkOut
                ? checkOut.format("DD MMM YYYY")
                : "--"}
            </Text>

            <Text
              className="
                !font-roboto
                !text-[12px]
                !text-[#667085]
              "
            >
              Until 11:00 AM
            </Text>
          </div>
        </div>

        {/* =================================================
            DIVIDER
        ================================================== */}
        <div className="my-3 border-t border-[#e3e7ec]" />

        {/* =================================================
            DURATION + GUESTS
        ================================================== */}
        <div className="flex items-center justify-between gap-3">
          <Text
            className="
              !font-roboto
              !text-[13px]
              !font-medium
              !text-[#475467]
            "
          >
            Duration & Guests:
          </Text>

          <Text
            strong
            className="
              text-right
              !font-roboto
              !text-[13px]
              !text-[#172033]
            "
          >
            {nights} Night{nights !== 1 ? "s" : ""} •{" "}
            {roomCount} Room{roomCount !== 1 ? "s" : ""} •{" "}
            {totalGuests} Guest{totalGuests !== 1 ? "s" : ""}
          </Text>
        </div>
      </div>
    </Card>
  );
}