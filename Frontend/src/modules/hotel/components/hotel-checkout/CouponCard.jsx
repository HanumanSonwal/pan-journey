"use client";

import {
  CheckCircleFilled,
  GiftOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { App, Button, Card, Empty, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function CouponCard({
  coupons = [],
  priceSummary = {},
  onApplyCoupon,
  loading = false,
}) {
  const { message } = App.useApp();

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  const appliedCouponCode = priceSummary?.couponCode;
  const totalDiscount = Number(priceSummary?.couponDiscount || 0);

  const handleApply = (coupon) => {
    onApplyCoupon?.(coupon);
    message.success("Coupon applied");
  };

  return (
    <Card
      variant={false}
      className="rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
      styles={{
        body: {
          padding: 20,
        },
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ECFDF5]">
          <GiftOutlined className="text-xl text-[#0f766e]" />
        </div>

        <div>
          <Title level={5} className="!mb-0">
            Offers & Coupons
          </Title>

          <Text className="text-sm text-gray-500">
            Apply the best coupon and save more
          </Text>
        </div>
      </div>

      {!coupons.length ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No offers available"
        />
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon) => {
            const applied = coupon.code === appliedCouponCode;

            return (
              <div
                key={coupon._id}
                className={`rounded-xl border p-4 transition-all duration-200 ${
                  applied
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 hover:border-[#0f766e]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Tag color={applied ? "green" : "blue"}>
                        {coupon.code}
                      </Tag>

                      {coupon.isAutoApply && (
                        <Tag color="gold">Recommended</Tag>
                      )}

                      {applied && (
                        <Tag color="success" icon={<CheckCircleFilled />}>
                          Applied
                        </Tag>
                      )}
                    </div>

                    <Title level={5} className="!mb-1 !text-[16px]">
                      {coupon.title}
                    </Title>

                    <Text className="block text-gray-600">
                      {coupon.discountType === "flat"
                        ? `Flat ₹${formatPrice(coupon.discountValue)} OFF`
                        : `${coupon.discountValue}% OFF`}
                    </Text>

                    <div className="mt-2 flex items-center gap-2 text-gray-500">
                      <TagOutlined className="text-[#0f766e]" />

                      <Text className="text-xs">
                        Valid on bookings above ₹{formatPrice(coupon.minAmount)}
                      </Text>
                    </div>

                    {applied && totalDiscount > 0 && (
                      <div className="mt-3 rounded-lg border border-green-200 bg-white px-3 py-2">
                        <Text className="font-medium text-green-700">
                          🎉 You saved ₹{formatPrice(totalDiscount)}
                        </Text>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    {applied ? (
                      <Button disabled type="default">
                        Applied
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        loading={loading}
                        className="!bg-[#0f766e]"
                        onClick={() => handleApply(coupon)}
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalDiscount > 0 && (
        <div className="mt-4 rounded-xl border border-green-200 bg-[#F6FFED] px-4 py-3">
          <div className="flex items-center justify-between">
            <Text strong>Total Discount</Text>

            <Text strong className="!text-lg !text-green-700">
              ₹ {formatPrice(totalDiscount)}
            </Text>
          </div>
        </div>
      )}
    </Card>
  );
}
