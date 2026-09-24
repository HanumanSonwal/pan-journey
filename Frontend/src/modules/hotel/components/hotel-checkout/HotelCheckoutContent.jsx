"use client";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackgroundSection from "../hotel-booking/BackgroundSection";
import BookingSummaryCard from "./BookingSummaryCard";
import CouponCard from "./CouponCard";
import CustomerSummaryCard from "./CustomerSummaryCard";
import PaymentCard from "./PaymentCard";
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
  const router = useRouter();

  // =========================================================
  // BOOKING DATA
  // =========================================================
  const hotel = bookingData?.supplierData;
  const room = bookingData?.selectedRoom;
  const search = bookingData?.searchData;

  // =========================================================
  // TIMER
  // =========================================================
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  const customer = booking?.customer || {};
  const guestDetails = booking?.guestDetails || [];

  const coupons = booking?.availableCoupons || [];
  const priceSummary = booking?.priceSummary || {};

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="min-h-screen bg-bbackground-color-bg">
      {/* =====================================================
          TOP BACKGROUND
      ====================================================== */}
      <div className="relative h-[142px] overflow-hidden">
        <BackgroundSection />

        {/* =================================================
            BACK BUTTON
        ================================================== */}
      </div>

      {/* =====================================================
          MAIN CONTAINER
          SAME WIDTH SYSTEM AS HOTEL BOOKING PAGE
      ====================================================== */}
      <main className="relative z-20 mx-auto -mt-10 w-full max-w-[1250px] px-4 pb-6 sm:px-4">
        {/* ===================================================
            CHECKOUT HEADER
        ==================================================== */}
        <section className="mb-5 min-h-[90px] rounded-[16px] border border-[#e0e6eb] bg-white px-5 py-4 shadow-[0_2px_10px_rgba(16,24,40,0.05)] md:px-7 md:py-[18px]">
          <div className="flex min-h-[52px] flex-col justify-between gap-4 md:flex-row md:items-center">
            {/* =================================================
                LEFT TITLE
            ================================================== */}
            <div>
              <Title
                level={2}
                className="!font-roboto !mb-[2px] !text-[20px] !leading-[28px] !font-bold !text-[#111827] md:!text-[21px]"
              >
                Secure Checkout
              </Title>

              <Text className="!font-roboto !text-[14px] !leading-[21px] !font-normal !text-[#667085] md:!text-[15px]">
                Complete your payment to confirm your hotel booking.
              </Text>
            </div>

            {/* =================================================
                PRICE GUARANTEE
            ================================================== */}
            <div className="flex h-[52px] w-fit shrink-0 items-center gap-[9px] rounded-full border border-[#ffe2c2] bg-[#fff8ef] px-[17px] md:px-[19px]">
              <ClockCircleOutlined className="!text-[17px] !text-[#f59e0b]" />

              <span className="text-[13px] font-medium whitespace-nowrap text-[#a0a4aa] md:text-[14px]">
                Price guaranteed for
              </span>

              <span className="min-w-[43px] text-[17px] font-bold text-[#c7651d] tabular-nums md:text-[18px]">
                {minutes}:{seconds}
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================
            MAIN CONTENT
            SAME APPROACH AS HOTEL BOOKING PAGE
        ==================================================== */}
        <div className="grid grid-cols-1 items-start gap-[14px] lg:grid-cols-[15fr_8fr] lg:gap-[14px]">
          {/* =================================================
              LEFT COLUMN
          ================================================== */}
          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            {/* =================================================
                BOOKING CONTACT
            ================================================== */}
            <section className="overflow-hidden rounded-[16px] border border-[#e0e6eb] bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
              <CustomerSummaryCard
                customer={customer}
                guestDetails={guestDetails}
              />
            </section>

            {/* =================================================
                COUPON - MOBILE / TABLET
            ================================================== */}
            <div className="block lg:hidden">
              <CouponCard
                coupons={coupons}
                priceSummary={priceSummary}
                onApplyCoupon={onApplyCoupon}
                loading={couponLoading}
              />
            </div>

            {/* =================================================
                PAYMENT METHOD
            ================================================== */}
            <section className="overflow-hidden rounded-[16px] border border-[#e0e6eb] bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
              <PaymentMethodCard />
            </section>
            <section className="overflow-hidden rounded-[16px] border border-[#e0e6eb] bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
              <PaymentCard />
            </section>
            {/* =================================================
                PRICE SUMMARY - MOBILE / TABLET
            ================================================== */}
            <div className="block lg:hidden">
              <PriceSummaryCard
                priceSummary={priceSummary}
                onRemoveCoupon={onRemoveCoupon}
                loading={couponLoading}
              />
            </div>

            {/* =================================================
                PAYMENT FOOTER
            ================================================== */}
            <section className="overflow-hidden rounded-[16px] border border-[#e0e6eb] bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
              <PaymentFooter
                booking={booking}
                priceSummary={priceSummary}
                loading={loading}
                onPay={onPay}
              />
            </section>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================== */}
          <aside className="min-w-0 lg:sticky lg:top-6">
            <div className="flex flex-col gap-4 sm:gap-5">
              {/* =================================================
                  BOOKING SUMMARY
              ================================================== */}
              <section className="overflow-hidden rounded-[16px] border border-[#e0e6eb] bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
                <BookingSummaryCard
                  booking={booking}
                  hotel={hotel}
                  room={room}
                  search={search}
                />
              </section>

              {/* =================================================
                  COUPON / OFFERS
              ================================================== */}
              <section className="overflow-hidden rounded-[16px] border border-[#e0e6eb] bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
                <CouponCard
                  coupons={coupons}
                  priceSummary={priceSummary}
                  onApplyCoupon={onApplyCoupon}
                  loading={couponLoading}
                />
              </section>

              {/* =================================================
                  PRICE SUMMARY
              ================================================== */}
              <section className="overflow-hidden rounded-[16px] border border-[#e0e6eb] bg-white shadow-[0_2px_10px_rgba(16,24,40,0.04)]">
                <PriceSummaryCard
                  priceSummary={priceSummary}
                  onRemoveCoupon={onRemoveCoupon}
                  loading={couponLoading}
                />
              </section>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
