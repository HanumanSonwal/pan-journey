"use client";

import { PhoneOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Divider, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function CustomerSummaryCard({
  customer = {},
  guestDetails = [],
}) {
  return (
    <Card
      className="rounded-xl border-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
      styles={{
        body: {
          padding: 18,
        },
      }}
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef8fd]">
          <UserOutlined className="text-[18px] text-[#0f766e]" />
        </div>

        <div>
          <Title
            level={5}
            className="font-roboto! !mb-0 !text-[18px] font-bold!"
          >
            Customer Details
          </Title>

          <Text className="text-gray-500">
            Primary contact for this booking
          </Text>
        </div>
      </div>

      {/* Customer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Text className="flex items-center gap-2">
            <UserOutlined />
            Customer Name
          </Text>

          <Text strong>{customer?.name || "--"}</Text>
        </div>

        <div className="flex items-center justify-between">
          <Text className="flex items-center gap-2">
            <PhoneOutlined />
            Mobile
          </Text>

          <Text strong>{customer?.mobile || "--"}</Text>
        </div>
      </div>

      <Divider />

      {/* Guests */}

      <div className="mb-4 flex items-center gap-2">
        <TeamOutlined className="text-[#0f766e]" />

        <Title level={5} className="font-roboto! !mb-0 !text-[17px]">
          Guest Details
        </Title>
      </div>

      <div className="space-y-3">
        {guestDetails.map((guest, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-100 bg-[#fafafa] p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <Text strong>
                  {guest?.title} {guest?.firstName} {guest?.lastName}
                </Text>

                <div className="mt-1">
                  <Tag color="blue">{guest?.occupantType}</Tag>

                  <Tag color="purple">Room {guest?.roomNumber}</Tag>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef8fd]">
                <UserOutlined className="text-[#0f766e]" />
              </div>
            </div>
          </div>
        ))}

        {!guestDetails.length && (
          <div className="rounded-lg border border-dashed p-5 text-center text-gray-500">
            No Guest Details
          </div>
        )}
      </div>
    </Card>
  );
}
