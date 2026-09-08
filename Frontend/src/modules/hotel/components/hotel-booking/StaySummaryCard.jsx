"use client";

import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function StaySummaryCard({ bookingData }) {
  const searchData = bookingData?.searchData || {};
  const checkIn = bookingData?.checkIn?.date || searchData?.checkIn || "";
  const checkOut = bookingData?.checkOut?.date || searchData?.checkOut || "";
  const nights =
    checkIn && checkOut ? dayjs(checkOut).diff(dayjs(checkIn), "day") : 0;
  const adults = searchData?.adults || searchData?.rooms?.[0]?.adults || 0;
  const rooms = searchData?.rooms?.length || searchData?.roomCount || 1;

  return (
    <Card
      className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm"
      styles={{
        body: {
          padding: 12,
        },
      }}
    >
      <Row gutter={[4, 8]} align="middle">
        <Col xs={8} md={8}>
          <div className="text-center md:text-left">
            <Text className="text-[11px] text-[#666] md:text-xs">Check-in</Text>

            <h3 className="mt-1 text-[12px] font-semibold sm:text-[14px] md:text-[16px]">
              {checkIn ? dayjs(checkIn).format("DD MMM YYYY") : "-"}
            </h3>

            {bookingData?.checkIn?.time && (
              <Text className="text-[10px] text-[#666] md:text-xs">
                {bookingData.checkIn.time}
              </Text>
            )}
          </div>
        </Col>

        <Col xs={8} md={8}>
          <div className="flex flex-col items-center">
            <ArrowRightOutlined className="text-[10px] md:text-xs" />

            <div className="mt-1 flex items-center gap-1 rounded-full border px-2 py-1">
              <ClockCircleOutlined className="text-[10px] md:text-xs" />

              <span className="text-[10px] md:text-xs">{nights} Nights</span>
            </div>

            <Text className="mt-1 text-center text-[10px] md:mt-2 md:text-xs">
              {adults} Adults | {rooms} Room
            </Text>
          </div>
        </Col>

        <Col xs={8} md={8}>
          <div className="text-center md:text-right">
            <Text className="text-[11px] text-[#666] md:text-xs">
              Check-out
            </Text>

            <h3 className="mt-1 text-[12px] font-semibold sm:text-[14px] md:text-[16px]">
              {checkOut ? dayjs(checkOut).format("DD MMM YYYY") : "-"}
            </h3>

            {bookingData?.checkOut?.time && (
              <Text className="text-[10px] text-[#666] md:text-xs">
                {bookingData.checkOut.time}
              </Text>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}
