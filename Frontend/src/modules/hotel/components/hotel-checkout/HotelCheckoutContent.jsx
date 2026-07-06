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
    <div className="min-h-screen bg-[#eef6fd] py-6 md:py-8">
      <div className="mx-auto max-w-[1320px] px-3 md:px-5">
        {/* HEADER */}
        <div className="mb-6 rounded-2xl border border-[#d8edf9] bg-white p-5 shadow-sm">
          <Title level={2} className="!mb-1 !text-[28px]">
            Secure Checkout
          </Title>

          <Text className="block text-[15px] text-gray-500">
            Complete your payment to confirm your hotel booking.
          </Text>

          <Text className="mt-2 block font-medium text-[#0f766e]">
            Booking Reference : {booking?.bookingReference}
          </Text>
        </div>

        <Row gutter={[24, 24]} align="top">
          {/* LEFT SECTION */}
          <Col xs={24} xl={16}>
            <div className="space-y-5">
              <BookingSummaryCard
                booking={booking}
                hotel={hotel}
                room={room}
                search={search}
              />

              <CustomerSummaryCard
                customer={customer}
                guestDetails={guestDetails}
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
