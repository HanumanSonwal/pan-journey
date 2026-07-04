"use client";

import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function StaySummaryCard({ bookingData }) {
  const data = bookingData?.searchData;

  const checkIn = dayjs(data?.checkIn);
  const checkOut = dayjs(data?.checkOut);

  const checkInDate = checkIn.isValid() ? checkIn.format("DD MMM YYYY") : "--";

  const checkOutDate = checkOut.isValid()
    ? checkOut.format("DD MMM YYYY")
    : "--";

  const nights =
    checkIn.isValid() && checkOut.isValid()
      ? Math.max(checkOut.diff(checkIn, "day"), 1)
      : 1;

  return (
    <Card className="font-roboto! !mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm">
      <Row gutter={[8, 12]} align="middle">
        <Col xs={24} md={8}>
          <div className="text-center md:text-left">
            <Text className="text-xs text-[#666]">Check-in</Text>

            <h3 className="mt-1 text-[14px] font-semibold md:text-[16px]">
              {checkInDate}
            </h3>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="flex flex-col items-center">
            <ArrowRightOutlined className="text-xs" />

            <div className="mt-2 flex items-center gap-1 rounded-full border px-2 py-1">
              <ClockCircleOutlined />
              <span className="text-xs">{nights} Nights</span>
            </div>

            <Text className="mt-2 text-center text-xs">
              {data?.adults} Adults | {data?.rooms} Room
            </Text>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="text-center md:text-right">
            <Text className="text-xs text-[#666]">Check-out</Text>

            <h3 className="mt-1 text-[14px] font-semibold md:text-[16px]">
              {checkOutDate}
            </h3>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
