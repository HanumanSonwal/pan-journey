"use client";

import { Button, Modal, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title, Paragraph, Text } = Typography;

export default function ComingSoonModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      centered
      footer={null}
      closable={false}
      keyboard={false}
      width={600}
      mask={{
        closable: false,
      }}
      onCancel={() => {}}
    >
      <div className="px-5 py-10 text-center">
        {/* Title */}
        <Title
          level={2}
          className="!mb-2 !font-['Roboto'] !font-bold !text-gray-800"
        >
          Welcome to PAN Journey
        </Title>

        <Paragraph className="mx-auto !mb-6 max-w-[480px] !font-['Roboto'] text-[15px] text-gray-500">
          Thank you for visiting PAN Journey. We are currently in the final
          stage of development to deliver a seamless and reliable hotel booking
          experience.
        </Paragraph>

        <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-5 text-left">
          <div className="space-y-3">
            <Text className="block text-[15px] text-gray-700">
              • Explore hotels and destinations across India
            </Text>

            <Text className="block text-[15px] text-gray-700">
              • View hotel details, amenities and guest reviews
            </Text>

            <Text className="block text-[15px] text-gray-700">
              • Compare available hotel options before making a booking decision
            </Text>

            <Text className="block text-[15px] text-gray-700">
              • Discover new travel destinations and stay experiences
            </Text>

            <Text className="block text-[15px] text-gray-700">
              • Save time by exploring hotel information in one place
            </Text>

            <Text className="block text-[15px] text-gray-700">
              • Stay updated as new features and services are introduced
            </Text>

            <Text className="block text-[15px] font-semibold text-cyan-700">
              Hotel booking functionality is currently under development and
              will be available soon.
            </Text>
          </div>
        </div>

        <div className="font-roboto! mt-5 rounded bg-gray-50 p-4 text-sm font-bold! font-medium text-gray-700">
          Thank you for being one of our early visitors. Your support helps us
          build a better travel experience.
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            size="large"
            className="!h-12 !w-[600px] !rounded-xl !font-medium !text-white"
            onClick={handleClose}
            style={{
              background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
              border: "none",
            }}
          >
            Continue Exploring
          </Button>
        </div>
      </div>
    </Modal>
  );
}
