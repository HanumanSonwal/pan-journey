"use client";

import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function StaySummaryCard({ bookingData, occupancy = [] }) {
  const searchData = bookingData?.searchData || {};

  const checkIn = bookingData?.checkIn?.date || searchData?.checkIn || "";

  const checkOut = bookingData?.checkOut?.date || searchData?.checkOut || "";

  const nights =
    checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : 0;

  const fallbackRooms = Math.max(Number(searchData?.rooms) || 1, 1);

  const fallbackAdults = Math.max(Number(searchData?.adults) || 1, 1);

  const fallbackChildren = Math.max(Number(searchData?.children) || 0, 0);

  const rooms = occupancy.length || fallbackRooms;

  const adults = occupancy.length
    ? occupancy.reduce((total, room) => total + (Number(room?.adults) || 0), 0)
    : fallbackAdults;

  const children = occupancy.length
    ? occupancy.reduce(
        (total, room) => total + (Number(room?.children) || 0),
        0,
      )
    : fallbackChildren;

  return (
    <Card
      className="!mb-3 !rounded-xl !border !border-gray-200 !bg-white !shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
      styles={{ body: { padding: 0 } }}
    >
      <div className="p-3.5 sm:p-4">
        <Row gutter={[8, 12]} align="middle" className="!m-0">
          <Col xs={9} sm={9} md={9} className="!px-0">
            <div className="text-left">
              <Text className="!block !text-[10px] !font-medium !tracking-wide !text-gray-400 !uppercase sm:!text-[11px]">
                Check-in
              </Text>

              <div className="mt-1">
                <span className="text-[13px] leading-5 font-semibold text-[#172033] sm:text-[15px] md:text-[16px]">
                  {checkIn ? dayjs(checkIn).format("DD MMM YYYY") : "-"}
                </span>
              </div>

              {bookingData?.checkIn?.time && (
                <Text className="!mt-0.5 !block !text-[10px] !text-gray-500 sm:!text-[11px]">
                  {bookingData.checkIn.time}
                </Text>
              )}
            </div>
          </Col>

          <Col xs={6} sm={6} md={6} className="!px-0">
            <div className="flex flex-col items-center">
              <div className="flex w-full items-center justify-center">
                <span className="hidden h-px flex-1 bg-gray-200 sm:block" />

                <div className="mx-1 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white sm:mx-2">
                  <ArrowRightOutlined className="!text-[9px] !text-gray-500" />
                </div>

                <span className="hidden h-px flex-1 bg-gray-200 sm:block" />
              </div>

              <div className="mt-1.5 flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1">
                <ClockCircleOutlined className="!text-[10px] !text-gray-500" />

                <span className="text-[10px] font-medium text-gray-600 sm:text-[11px]">
                  {nights} {nights === 1 ? "Night" : "Nights"}
                </span>
              </div>

              <Text className="!mt-1.5 !text-[9px] !font-medium !whitespace-nowrap !text-gray-500 sm:!text-[10px]">
                {adults} {adults === 1 ? "Adult" : "Adults"}
                <span className="mx-1 text-gray-300"> | </span>
                {rooms} {rooms === 1 ? "Room" : "Rooms"}
                {children > 0 && (
                  <>
                    <span className="mx-1 text-gray-300"> | </span>
                    {children} {children === 1 ? "Child" : "Children"}
                  </>
                )}
              </Text>
            </div>
          </Col>

          <Col xs={9} sm={9} md={9} className="!px-0">
            <div className="text-right">
              <Text className="!block !text-[10px] !font-medium !tracking-wide !text-gray-400 !uppercase sm:!text-[11px]">
                Check-out
              </Text>

              <div className="mt-1">
                <span className="text-[13px] leading-5 font-semibold text-[#172033] sm:text-[15px] md:text-[16px]">
                  {checkOut ? dayjs(checkOut).format("DD MMM YYYY") : "-"}
                </span>
              </div>

              {bookingData?.checkOut?.time && (
                <Text className="!mt-0.5 !block !text-[10px] !text-gray-500 sm:!text-[11px]">
                  {bookingData.checkOut.time}
                </Text>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  );
}
