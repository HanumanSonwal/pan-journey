"use client";

import { CreditCardOutlined, SafetyCertificateFilled } from "@ant-design/icons";
import { Card, Radio, Tag, Typography } from "antd";
import Image from "next/image";
import { useHotelBookingStore } from "../../store/booking.store";

const { Title, Text } = Typography;

const PAYMENT_OPTIONS = [
  {
    id: "razorpay",
    title: "Razorpay",
    description: "UPI, Cards, Net Banking & Wallets",
    image: "/images/razorpay.png",
    recommended: true,
    enabled: true, // future: admin API
  },
  {
    id: "stripe",
    title: "Stripe",
    description: "International Cards & Secure Payments",
    image: "/images/stripe.png",
    recommended: false,
    enabled: true, // future: admin API
  },
];

export default function PaymentMethodCard() {
  const { bookingData, setBookingData } = useHotelBookingStore();

  const selectedMethod = bookingData?.selectedPaymentMethod || "razorpay";

  const handleChange = (value) => {
    setBookingData({
      selectedPaymentMethod: value,
    });
  };

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
          <CreditCardOutlined className="text-[20px] text-[#0f766e]" />
        </div>

        <div>
          <Title
            level={5}
            className="font-roboto! !mb-0 !text-[18px] font-bold!"
          >
            Select Payment Method
          </Title>

          <Text className="text-gray-500">
            Choose your preferred payment gateway
          </Text>
        </div>
      </div>

      <Radio.Group
        value={selectedMethod}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full"
      >
        <div className="space-y-4">
          {PAYMENT_OPTIONS.filter((item) => item.enabled).map((item) => {
            const active = selectedMethod === item.id;

            return (
              <label
                key={item.id}
                className={`block cursor-pointer rounded-xl border p-4 transition-all ${
                  active
                    ? "border-[#0f766e] bg-[#f4fbfb]"
                    : "border-gray-200 hover:border-[#72C0F0]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Radio value={item.id} />

                  <Image
                    src={item.image}
                    alt={item.title}
                    width={110}
                    height={32}
                    className="object-contain"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Text strong>{item.title}</Text>

                      {item.recommended && <Tag color="green">Recommended</Tag>}
                    </div>

                    <Text className="text-gray-500">{item.description}</Text>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </Radio.Group>

      {/* Security */}

      <div className="mt-6 rounded-xl bg-[#eef8fd] p-4">
        <div className="flex items-center gap-2">
          <SafetyCertificateFilled className="text-[#0f766e]" />

          <Text strong className="text-[#0f766e]">
            100% Secure Payment
          </Text>
        </div>

        <Text className="mt-2 block text-gray-600">
          Your payment is protected with industry-standard encryption.
        </Text>
      </div>
    </Card>
  );
}
