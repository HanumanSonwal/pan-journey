"use client";

import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function StaySummaryCard({ bookingData }) {
  const data = bookingData?.searchData;

  const nights = dayjs(data?.checkOut).diff(dayjs(data?.checkIn), "day");

  return (
    <Card className="!rounded-none border-0  !-mt-2">
      <Row gutter={[8, 12]} align="middle">

        <Col xs={24} md={8}>
          <div className="text-center md:text-left">
            <Text className="text-[#666] text-xs">
              Check-in
            </Text>

            <h3 className="mt-1 text-[14px] md:text-[16px] font-semibold">
              {dayjs(data?.checkIn).format("DD MMM YYYY")}
            </h3>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="flex flex-col items-center">
            <ArrowRightOutlined className="text-xs" />

            <div className="mt-2 flex items-center gap-1 rounded-full border px-2 py-1">
              <ClockCircleOutlined />
              <span className="text-xs">
                {nights} Nights
              </span>
            </div>

            <Text className="mt-2 text-xs text-center">
              {data?.adults} Adults | {data?.rooms} Room
            </Text>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="text-center md:text-right">
            <Text className="text-[#666] text-xs">
              Check-out
            </Text>

            <h3 className="mt-1 text-[14px] md:text-[16px] font-semibold">
              {dayjs(data?.checkOut).format("DD MMM YYYY")}
            </h3>
          </div>
        </Col>

      </Row>
    </Card>
  );
}
