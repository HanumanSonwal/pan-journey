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
      variant={false}
      className="rounded-2xl shadow-lg"
      styles={{
        body: {
          padding: 22,
        },
      }}
    >
      <Title level={4} className="!mb-6">
        Price Summary
      </Title>

      {/* Base Amount */}
      <div className="flex items-center justify-between">
        <Text className="text-gray-600">Base Amount</Text>
        <Text strong>₹ {formatPrice(baseAmount)}</Text>
      </div>

      <Divider className="!my-4" />

      {/* Platform Fee */}
      <div className="flex items-center justify-between">
        <Text className="text-gray-600">Platform Fee & Tax</Text>
        <Text strong>₹ {formatPrice(platformChargeandTax)}</Text>
      </div>

      <Divider className="!my-4" />

      {/* Total Amount */}
      <div className="flex items-center justify-between">
        <Text className="text-gray-600">Total Amount</Text>
        <Text strong>₹ {formatPrice(totalAmount)}</Text>
      </div>

      {/* Coupon */}
      {couponDiscount > 0 && (
        <>
          <Divider className="!my-4" />

          <div className="flex items-start justify-between">
            <div>
              <Text className="text-gray-600">Coupon Discount</Text>

              {couponCode && (
                <div className="mt-2 flex items-center gap-2">
                  <Tag
                    color="green"
                    className="rounded-full px-3 py-1 font-medium"
                  >
                    {couponCode}
                  </Tag>

                  <Button
                    danger
                    size="small"
                    loading={loading}
                    onClick={onRemoveCoupon}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <Text className="text-lg font-semibold !text-green-600">
              - ₹ {formatPrice(couponDiscount)}
            </Text>
          </div>
        </>
      )}

      <Divider className="!my-5" />

      {/* Total */}
      <div className="rounded-xl border border-green-200 bg-[#F6FFED] p-4">
        <div className="flex items-center justify-between">
          <div>
            <Text className="block text-sm text-gray-500">Total Payable</Text>

            <Text className="text-xs text-gray-400">
              Inclusive of all taxes
            </Text>
          </div>

          <Title level={2} className="!mb-0 !text-[#15803d]">
            ₹ {formatPrice(payableAmount)}
          </Title>
        </div>
      </div>
    </Card>
  );
}
