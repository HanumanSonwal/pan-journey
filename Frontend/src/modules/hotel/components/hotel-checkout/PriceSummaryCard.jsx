"use client";

import { Button, Card, Divider, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function PriceSummaryCard({
  priceSummary = {},
  onRemoveCoupon,
  loading = false,
}) {
  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const {
    baseAmount = 0,
    platformChargeandTax = 0,
    couponCode,
    couponDiscount = 0,
    totalAmount = 0,
    totalPayableAmountAfterDiscount,
  } = priceSummary;

  const payableAmount = totalPayableAmountAfterDiscount ?? totalAmount;

  return (
    <Card
      className="rounded-xl border-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
      styles={{
        body: {
          padding: 18,
        },
      }}
    >
      <Title level={4} className="!mb-4 !text-[20px]">
        Price Summary
      </Title>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Text className="text-gray-500">Base Amount</Text>

          <Text strong>₹ {formatPrice(baseAmount)}</Text>
        </div>

        <div className="flex justify-between">
          <Text className="text-gray-500">Platform Fee & Tax</Text>

          <Text strong>₹ {formatPrice(platformChargeandTax)}</Text>
        </div>

        <div className="flex justify-between">
          <Text className="text-gray-500">Total Amount</Text>

          <Text strong>₹ {formatPrice(totalAmount)}</Text>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between">
            <div>
              <Text className="text-gray-500">Coupon</Text>

              <div className="mt-1 flex gap-2">
                <Tag color="green">{couponCode}</Tag>

                <Button
                  size="small"
                  danger
                  type="link"
                  loading={loading}
                  onClick={onRemoveCoupon}
                >
                  Remove
                </Button>
              </div>
            </div>

            <Text className="font-semibold text-green-600">
              -₹ {formatPrice(couponDiscount)}
            </Text>
          </div>
        )}
      </div>

      <Divider className="!my-4" />

      {/* Total */}
      <div className="flex items-center justify-between rounded-lg bg-[#F6FFED] px-4 py-3">
        <div>
          <Text className="block text-gray-500">Total Payable</Text>

          <Text className="text-xs text-gray-400">Inclusive of taxes</Text>
        </div>

        <Title level={3} className="!mb-0 !text-[#15803D]">
          ₹ {formatPrice(payableAmount)}
        </Title>
      </div>
    </Card>
  );
}
