"use client";

import { Button, Col, Row } from "antd";
import { useState } from "react";

import { useHotelBooking } from "../../hooks/useHotelBooking";
import { buildBookingPayload } from "../../utils/buildBookingPayload";

import BookingAgreement from "./BookingAgreement";
import BookingHeaderCard from "./BookingHeaderCard";
import GuestDetailsForm from "./GuestDetailsForm";
import ImportantInfoCard from "./ImportantInfoCard";
import PriceBreakupCard from "./PriceBreakupCard";
import RoomPackageCard from "./RoomPackageCard";
import SpecialRequestCard from "./SpecialRequestCard";
import StaySummaryCard from "./StaySummaryCard";

export default function HotelBookingContent({ bookingData }) {
  const { mutate: bookHotel, isPending } = useHotelBooking();

  const [guestData, setGuestData] = useState(null);

  const [requestData, setRequestData] = useState({});

  const [agreement, setAgreement] = useState(false);

  // GUEST FORM SUBMIT
  const handleGuestSubmit = (values) => {
    console.log("guest data", values);
    setGuestData(values);
  };

  // FINAL BOOKING
  const handleBooking = () => {
    const payload = buildBookingPayload({
      bookingData,
      guestData,
      requestData,
    });

    console.log("BOOKING PAYLOAD", payload);

    bookHotel(payload, {
      onSuccess: (response) => {
        console.log("booking response", response);
      },
    });
  };

  return (
    <div className="mx-auto max-w-[1350px]">
      <Row gutter={[24, 24]}>
        {/* LEFT */}
        <Col xs={24} lg={16}>
          <div className="space-y-5">
            <BookingHeaderCard bookingData={bookingData} />

            <StaySummaryCard bookingData={bookingData} />

            <RoomPackageCard bookingData={bookingData} />

            <ImportantInfoCard bookingData={bookingData} />

            <GuestDetailsForm onSubmit={handleGuestSubmit} />

            <SpecialRequestCard value={requestData} onChange={setRequestData} />

            <BookingAgreement checked={agreement} onChange={setAgreement} />

            <div className="pt-2">
              <Button
                type="primary"
                size="large"
                disabled={!guestData || !agreement}
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
          <PriceBreakupCard bookingData={bookingData} />
        </Col>
      </Row>
    </div>
  );
}
