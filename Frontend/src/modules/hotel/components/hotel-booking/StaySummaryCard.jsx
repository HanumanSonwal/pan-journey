"use client";

import { ArrowRightOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export default function StaySummaryCard({ bookingData }) {
  const data = bookingData?.searchData;

  const nights = dayjs(data?.checkOut).diff(
    dayjs(data?.checkIn),
    "day"
  );

  return (
    <Card
      className="!mb-2 rounded border-0 !shadow-[0_4px_12px_rgba(0,0,0,0.25)] shadow-sm font-roboto!"
      styles={{
        body: {
          padding: 12,
        },
      }}
    >

      <Row gutter={[4, 8]} align="middle">

        {/* Check In */}
        <Col xs={8} md={8}>
          <div className="text-center md:text-left">

            <Text className="text-[11px] text-[#666] md:text-xs">
              Check-in
            </Text>


            <h3 className="mt-1 text-[12px] font-semibold sm:text-[14px] md:text-[16px]">
              {dayjs(data?.checkIn).format("DD MMM YYYY")}
            </h3>

          </div>
        </Col>



        {/* Nights */}
        <Col xs={8} md={8}>

          <div className="flex flex-col items-center">

            <ArrowRightOutlined className="text-[10px] md:text-xs" />


            <div className="mt-1 flex items-center gap-1 rounded-full border px-2 py-1">

              <ClockCircleOutlined className="text-[10px] md:text-xs" />

              <span className="text-[10px] md:text-xs">
                {nights} Nights
              </span>

            </div>


            <Text className="mt-1 text-center text-[10px] md:mt-2 md:text-xs">
              {data?.adults} Adults | {data?.rooms} Room
            </Text>


          </div>

        </Col>




        {/* Check Out */}
        <Col xs={8} md={8}>

          <div className="text-center md:text-right">

            <Text className="text-[11px] text-[#666] md:text-xs">
              Check-out
            </Text>


            <h3 className="mt-1 text-[12px] font-semibold sm:text-[14px] md:text-[16px]">
              {dayjs(data?.checkOut).format("DD MMM YYYY")}
            </h3>

          </div>

        </Col>


      </Row>

    </Card>
  );
}
