"use client";

import { Col, Row, Typography } from "antd";

import BookingSummaryCard from "./BookingSummaryCard";
import CouponCard from "./CouponCard";
import CustomerSummaryCard from "./CustomerSummaryCard";
import PaymentFooter from "./PaymentFooter";
import PaymentMethodCard from "./PaymentMethodCard";
import PriceSummaryCard from "./PriceSummaryCard";

const { Title, Text } = Typography;

export default function HotelCheckoutContent({
  booking,
  bookingData,
  loading,
  onPay,

  onApplyCoupon,
  onRemoveCoupon,
  couponLoading,
}) {
  const hotel = bookingData?.supplierData;
  const room = bookingData?.selectedRoom;
  const search = bookingData?.searchData;

  const customer = booking?.customer;
  const guestDetails = booking?.guestDetails || [];

  const coupons = booking?.availableCoupons || [];
  const priceSummary = booking?.priceSummary || {};

  return (
    <div className="min-h-screen bg-[#eef6fd] !py-6 md:!py-8">
      <div className="mx-auto max-w-[1320px] px-3 md:px-5">
        {/* HEADER */}
        <div className="mb-3 rounded border border-[#d8edf9] bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <div>
              <Title
                level={2}
                className="font-roboto! !mb-0 !text-[22px] !font-semibold"
              >
                Secure Checkout
              </Title>

              <Text className="font-roboto! !mt-0 block text-[14px] text-gray-500">
                Complete your payment to confirm your hotel booking.
              </Text>
            </div>

            <div className="mt-3 md:mt-0">
              <div className="rounded-lg bg-[#f0f9ff] px-4 py-2">
                <Text className="block text-[11px] tracking-wide text-gray-500 uppercase">
                  Booking Reference
                </Text>

                <Text className="text-[15px] font-semibold text-[#0f766e]">
                  {booking?.bookingReference}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <Row gutter={[24, 24]} align="top">
          {/* LEFT SECTION */}
          <Col xs={24} xl={16}>
            <div className="flex flex-col gap-3">
              <BookingSummaryCard
                booking={booking}
                hotel={hotel}
                room={room}
                search={search}
              />

              {/* Mobile Coupon */}
              <div className="xl:hidden">
                <CouponCard
                  coupons={coupons}
                  priceSummary={priceSummary}
                  onApplyCoupon={onApplyCoupon}
                  loading={couponLoading}
                />
              </div>

              <PaymentMethodCard />

              <PriceSummaryCard
                priceSummary={priceSummary}
                onRemoveCoupon={onRemoveCoupon}
                loading={couponLoading}
              />

              <PaymentFooter
                priceSummary={priceSummary}
                loading={loading}
                onPay={onPay}
              />
            </div>
          </Col>

          {/* RIGHT SECTION */}
          <Col xs={24} xl={8}>
            <div className="hidden xl:sticky xl:top-24 xl:block">
              <CustomerSummaryCard
                customer={customer}
                guestDetails={guestDetails}
              />

              <CouponCard
                coupons={coupons}
                priceSummary={priceSummary}
                onApplyCoupon={onApplyCoupon}
                loading={couponLoading}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
