"use client";

import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function StaySummaryCard({ bookingData }) {
  const data = bookingData?.searchData;

  const nights = dayjs(data?.checkOut).diff(dayjs(data?.checkIn), "day");

  return (
    <Card className="rounded-2xl border-0 shadow-sm">
      <Row gutter={[20, 20]} align="middle">
        <Col xs={24} md={8}>
          <Text className="text-[#666]">Check-in</Text>

          <h3 className="mt-1 text-[18px] font-semibold">
            {dayjs(data?.checkIn).format("DD MMM YYYY")}
          </h3>
        </Col>

        <Col xs={24} md={8}>
          <div className="flex flex-col items-center">
            <ArrowRightOutlined />

            <div className="mt-3 flex items-center gap-2 rounded-full border px-4 py-1">
              <ClockCircleOutlined />

              <span className="text-sm">{nights} Nights</span>
            </div>

            <Text className="mt-3">
              {data?.adults} Adults
              {" | "}
              {data?.rooms} Room
            </Text>
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="md:text-right">
            <Text className="text-[#666]">Check-out</Text>

            <h3 className="mt-1 text-[18px] font-semibold">
              {dayjs(data?.checkOut).format("DD MMM YYYY")}
            </h3>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
