"use client";

import {
  CheckCircleFilled,
  GiftOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { App, Button, Card, Empty, Tag, Typography } from "antd";
import { useEffect } from "react";
import { useHotelBookingStore } from "../../store/booking.store";

const { Title, Text } = Typography;

export default function CouponCard({
  coupons = [],
  priceSummary = {},
  onCouponChange,
}) {
  const { message } = App.useApp();
  const { bookingData, setBookingData } = useHotelBookingStore();

  const selectedCoupon = bookingData?.selectedCoupon;

  useEffect(() => {
    if (selectedCoupon || !coupons.length) {
      return;
    }

    const autoCoupon = coupons.find((item) => item.isAutoApply);

    if (!autoCoupon) {
      return;
    }

    setBookingData({
      selectedCoupon: autoCoupon,
    });

    onCouponChange?.(autoCoupon);
  }, [coupons, selectedCoupon, setBookingData, onCouponChange]);

  const handleApply = (coupon) => {
    setBookingData({
      selectedCoupon: coupon,
    });

    onCouponChange?.(coupon);

    message.success(`${coupon.code} applied successfully`);
  };

  const handleRemove = () => {
    setBookingData({
      selectedCoupon: null,
    });

    onCouponChange?.(null);

    message.success("Coupon removed");
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
          <GiftOutlined className="text-[20px] text-[#0f766e]" />
        </div>

        <div>
          <Title
            level={5}
            className="font-roboto! !mb-0 !text-[18px] font-bold!"
          >
            Offers & Coupons
          </Title>

          <Text className="text-gray-500">Save more on this booking</Text>
        </div>
      </div>

      {!coupons.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No offers available"
        />
      )}

      <div className="space-y-4">
        {coupons.map((coupon) => {
          const applied = selectedCoupon?._id === coupon._id;

          return (
            <div
              key={coupon._id}
              className={`rounded-xl border p-4 transition ${
                applied ? "border-green-300 bg-green-50" : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag color={applied ? "green" : "blue"}>{coupon.code}</Tag>

                    {coupon.isAutoApply && <Tag color="gold">Auto Applied</Tag>}

                    {applied && <Tag color="green">Applied</Tag>}
                  </div>

                  <Title
                    level={5}
                    className="font-roboto! !mt-3 !mb-1 !text-[16px]"
                  >
                    {coupon.title}
                  </Title>

                  <Text className="text-gray-500">
                    {coupon.discountType === "flat"
                      ? `Flat ₹${coupon.discountValue} OFF`
                      : `${coupon.discountValue}% OFF`}
                  </Text>

                  <div className="mt-2 flex items-center gap-2">
                    <TagOutlined className="text-[#0f766e]" />

                    <Text className="text-xs text-gray-500">
                      Valid on bookings above ₹{coupon.minAmount}
                    </Text>
                  </div>
                </div>

                <div>
                  {applied ? (
                    <Button danger onClick={handleRemove}>
                      Remove
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => handleApply(coupon)}
                      className="!bg-[#0f766e]"
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>

              {applied && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-white p-3">
                  <CheckCircleFilled className="text-green-600" />

                  <Text className="text-green-700">
                    You are saving ₹{coupon.discountValue}
                  </Text>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {priceSummary?.couponDiscount > 0 && (
        <div className="mt-5 rounded-lg bg-[#eefcf2] p-4">
          <div className="flex items-center justify-between">
            <Text strong>Total Discount</Text>

            <Text strong className="text-green-600">
              ₹ {Number(priceSummary.couponDiscount).toLocaleString("en-IN")}
            </Text>
          </div>
        </div>
      )}
    </Card>
  );
}
