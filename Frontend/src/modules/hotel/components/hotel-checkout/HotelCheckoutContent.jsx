"use client";

import { Col, Row, Typography } from "antd";

import BackgroundSection from "../hotel-booking/BackgroundSection";
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
    <div className="min-h-screen bg-[#eef6fd]">
      {/* Top Background */}
      <div className="relative  overflow-hidden">
        <BackgroundSection />
      </div>

      {/* Main Content */}
      <div className="relative z-20 mx-auto !-mt-10 md:!-mt-12 max-w-[1320px] px-3 md:px-5">
        {/* HEADER */}
        <div className="mb-4 rounded-xl border border-[#d8edf9] bg-white px-5 py-4 shadow-md">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <Title
                level={2}
                className="font-roboto !mb-0 !text-[22px] !font-semibold"
              >
                Secure Checkout
              </Title>

              <Text className="font-roboto block text-[14px] text-gray-500">
                Complete your payment to confirm your hotel booking.
              </Text>
            </div>

            <div className="mt-3 md:mt-0">
              <div className="rounded-lg bg-[#f0f9ff] px-4 py-2">
                <Text className="block text-[11px] uppercase tracking-wide text-gray-500">
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
          {/* LEFT */}
          <Col xs={24} xl={16}>
            <div className="flex flex-col gap-4">
              <BookingSummaryCard
                booking={booking}
                hotel={hotel}
                room={room}
                search={search}
              />

              {/* Coupon Mobile */}
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
                booking={booking}
                priceSummary={priceSummary}
                loading={loading}
                onPay={onPay}
              />
            </div>
          </Col>

          {/* RIGHT */}
          <Col xs={24} xl={8}>
            <div className="xl:sticky xl:top-24">
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
