"use client";

import { Card, Divider, Tag, Typography } from "antd";
import { useHotelBookingStore } from "../../store/booking.store";

const { Title, Text } = Typography;

export default function PriceSummaryCard({ priceSummary = {} }) {
  const { bookingData } = useHotelBookingStore();

  const selectedCoupon = bookingData?.selectedCoupon;

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const baseAmount = Number(priceSummary?.baseAmount || 0);

  const serviceCharge = Number(priceSummary?.serviceCharge || 0);

  const platformCharge = Number(priceSummary?.platformChargeandTax || 0);

  const couponDiscount = selectedCoupon
    ? Number(selectedCoupon.discountValue || 0)
    : Number(priceSummary?.couponDiscount || 0);

  const totalAmount = Number(priceSummary?.totalAmount || 0);

  const payableAmount =
    priceSummary?.totalPayableAmountAfterDiscount ?? totalAmount;

  return (
    <Card
      className="rounded-xl border-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
      styles={{
        body: {
          padding: 18,
        },
      }}
    >
      <Title level={5} className="font-roboto! !mb-5">
        Price Summary
      </Title>

      {/* Base */}

      <div className="flex items-center justify-between">
        <Text>Base Amount</Text>

        <Text strong>₹ {formatPrice(baseAmount)}</Text>
      </div>

      <Divider className="!my-3" />

      {/* Service */}

      <div className="flex items-center justify-between">
        <Text>Service Charge</Text>

        <Text strong>₹ {formatPrice(serviceCharge)}</Text>
      </div>

      <Divider className="!my-3" />

      {/* Platform */}

      <div className="flex items-center justify-between">
        <Text>Platform Fee & Tax</Text>

        <Text strong>₹ {formatPrice(platformCharge)}</Text>
      </div>

      {/* Coupon */}

      {!!selectedCoupon && (
        <>
          <Divider className="!my-3" />

          <div className="flex items-center justify-between">
            <div>
              <Text>Coupon Discount</Text>

              <div className="mt-1">
                <Tag color="green">{selectedCoupon.code}</Tag>
              </div>
            </div>

            <Text className="font-semibold !text-green-600">
              - ₹ {formatPrice(couponDiscount)}
            </Text>
          </div>
        </>
      )}

      <Divider className="!my-4" />

      {/* Total */}

      <div className="flex items-center justify-between">
        <div>
          <Title level={5} className="!mb-1">
            Total Payable
          </Title>

          <Text className="text-gray-500">Inclusive of all taxes</Text>
        </div>

        <Title level={3} className="!mb-0 !text-[#0f766e]">
          ₹ {formatPrice(payableAmount)}
        </Title>
      </div>
    </Card>
  );
}
