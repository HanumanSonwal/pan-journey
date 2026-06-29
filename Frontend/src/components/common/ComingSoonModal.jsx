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
      width="90%"
      className="sm:!max-w-[520px] md:!max-w-[600px] lg:!max-w-[650px]"
      mask={{
        closable: false,
      }}
      onCancel={() => {}}
    >
      <div className="px-4 py-6 text-center sm:px-6 sm:py-8 md:px-8 md:py-10">
        {/* Title */}
        <Title
          level={2}
          className="!mb-2 !font-['Roboto'] !text-[24px] !font-bold !text-gray-800 sm:!text-[28px] md:!text-[32px]"
        >
          Welcome to PAN Journey
        </Title>

        <Paragraph className="mx-auto !mb-5 max-w-[520px] !font-['Roboto'] text-[14px] text-gray-500 sm:text-[15px] md:text-[16px]">
          Thank you for visiting PAN Journey. We are currently in the final
          stage of development to deliver a seamless and reliable hotel booking
          experience.
        </Paragraph>

        <div className="rounded-xl border border-cyan-100 bg-cyan-50 p-4 text-left sm:p-5 md:p-6">
          <div className="space-y-3">
            <Text className="block text-[14px] leading-6 text-gray-700 sm:text-[15px] md:text-[16px]">
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

            <Text className="block text-[14px] leading-6 font-semibold text-cyan-700 sm:text-[15px] md:text-[16px]">
              Hotel booking functionality is currently under development and
              will be available soon.
            </Text>
          </div>
        </div>

        <div className="font-roboto! mt-5 rounded-lg bg-gray-50 p-3 text-[13px] font-medium text-gray-700 sm:p-4 sm:text-sm md:text-[15px]">
          Thank you for being one of our early visitors. Your support helps us
          build a better travel experience.
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            size="large"
            className="!h-11 !w-full !rounded-xl !font-medium !text-white sm:!h-12"
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
