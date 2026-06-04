"use client";

import { Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotelBooking } from "../../hooks/useHotelBooking";
import { useHotelBookingStore } from "../../store/booking.store";
import { buildBookingPayload } from "../../utils/buildBookingPayload";
import BookingAgreement from "./BookingAgreement";
import BookingHeaderCard from "./BookingHeaderCard";
import GuestDetailsForm from "./GuestDetailsForm";
import ImportantInfoCard from "./ImportantInfoCard";
import PriceBreakupCard from "./PriceBreakupCard";
import RoomPackageCard from "./RoomPackageCard";
import SpecialRequestCard from "./SpecialRequestCard";
import StaySummaryCard from "./StaySummaryCard";

export default function HotelBookingContent({ hotelBookingData }) {
  const { mutate: bookHotel, isPending } = useHotelBooking();
  const router = useRouter();
  const { bookingData: storeBookingData, setBookingData } =
    useHotelBookingStore();

  const handleRequestChange = (value) => {
    setBookingData({
      requestData: value,
    });
  };
  const [agreement, setAgreement] = useState(false);
  // GUEST FORM SUBMIT
  const handleGuestSubmit = (values) => {
    setBookingData({
      guestData: values,
    });
  };
  // FINAL BOOKING
  const handleBooking = () => {
    const payload = buildBookingPayload({
      bookingData: storeBookingData,
      guestData: storeBookingData?.guestData,
      requestData: storeBookingData?.requestData,
    });

    bookHotel(payload, {
      onSuccess: (response) => {
        const bookingRefNo = response?.data?.BookingRefNo;
        setBookingData({
          bookingRefNo,
        });
        router.push(`/hotel-checkout?bookingRefNo=${bookingRefNo}`);
      },
    });
  };
  return (
    <div className="mx-auto max-w-[1350px]">
      <Row gutter={[24, 24]}>
        {/* LEFT */}
        <Col xs={24} lg={16}>
          <div className="space-y-5">
            <BookingHeaderCard bookingData={hotelBookingData} />
            <StaySummaryCard bookingData={hotelBookingData} />
            <RoomPackageCard bookingData={hotelBookingData} />
            <ImportantInfoCard bookingData={hotelBookingData} />
            <GuestDetailsForm onSubmit={handleGuestSubmit} />
            <SpecialRequestCard
              value={storeBookingData?.requestData}
              onChange={handleRequestChange}
            />
            <BookingAgreement checked={agreement} onChange={setAgreement} />
            <div className="pt-2">
              <Button
                type="primary"
                size="large"
                disabled={
                  !storeBookingData?.guestData ||
                  !storeBookingData?.guestData?.primaryGuest ||
                  !agreement
                }
                className="!h-[48px] !rounded-xl !bg-[#0f766e]"
                onClick={handleBooking}
                loading={isPending}
              >
                Continue To Booking
              </Button>
            </div>
          </div>
        </Col>

        {/* RIGHT */}
        <Col xs={24} lg={8}>
          <PriceBreakupCard bookingData={hotelBookingData} />
        </Col>
      </Row>
    </div>
  );
}
