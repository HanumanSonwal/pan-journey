"use client";
import {
  CheckCircleFilled,
  CheckOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { App, Button, Card, Empty, Tag, Typography } from "antd";
import Image from "next/image";

const { Title, Text } = Typography;

export default function CouponCard({
  coupons = [],
  priceSummary = {},
  onApplyCoupon,
  loading = false,
}) {
  const { message } = App.useApp();

  console.log("coupons in check out page", coupons);

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
      className="rounded shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
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
                className={`rounded border border-[#E5EEF7] bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
                  applied
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 hover:border-[#0f766e]"
                }`}
              >
                <div>
                  <div className="relative mb-4 h-[140px] w-full overflow-hidden rounded">
                    <Image
                      src={coupon.image || "/images/no-image.jpg"}
                      alt={coupon.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
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

                    <div className="flex justify-between">
                      <Title
                        level={5}
                        className="font-roboto! !mb-1 !text-[14px] !font-semibold"
                      >
                        {coupon.title}
                      </Title>

                      <div className="!m-0! font-roboto! font-bold !text-[#0F766E]">
                        {coupon.discountType === "flat"
                          ? `₹ ${formatPrice(coupon.discountValue)} OFF`
                          : `${coupon.discountValue}% OFF`}
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckOutlined className="text-[12px] text-[#0f766e]!" />

                        <Text className="text-[13px] text-gray-600">
                          Minimum Booking:
                          <strong> ₹ {formatPrice(coupon.minAmount)}</strong>
                        </Text>
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckOutlined className="text-[12px] text-[#0f766e]!" />

                        <Text className="text-[13px] text-gray-600">
                          Max Service Tax Discount:
                          <strong>
                            {" "}
                            {coupon.maxDiscountPercentOfServiceTax}%
                          </strong>
                        </Text>
                      </div>
                    </div>

                    {applied && totalDiscount > 0 && (
                      <div className="my-3 rounded border border-green-200 bg-white px-3 py-2">
                        <Text className="font-medium text-green-700">
                          🎉 You saved ₹ {formatPrice(totalDiscount)}
                        </Text>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0">
                    {applied ? (
                      <Button block size="large" disabled type="default">
                        Applied
                      </Button>
                    ) : (
                      <Button
                        block
                        size="large"
                        type="primary"
                        loading={loading}
                        className="my-3! !bg-[#0f766e]"
                        onClick={() => handleApply(coupon)}
                      >
                        Apply Coupon
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
