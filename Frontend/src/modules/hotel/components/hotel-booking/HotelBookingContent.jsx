"use client";

import { Button, Col, Row } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotelBooking } from "../../hooks/useHotelBooking";
import { useHotelBookingStore } from "../../store/booking.store";
import { buildBookingPayload } from "../../utils/buildBookingPayload";

import BackgroundSection from "./BackgroundSection";
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

  const [agreement, setAgreement] = useState(false);

  const handleRequestChange = (value) => {
    setBookingData({ requestData: value });
  };

  const handleGuestSubmit = (values) => {
    setBookingData({ guestData: values });
  };

  const handleBooking = () => {
    const payload = buildBookingPayload({
      bookingData: storeBookingData,
      guestData: storeBookingData?.guestData,
      requestData: storeBookingData?.requestData,
    });

    bookHotel(payload, {
      onSuccess: (response) => {
        const bookingRefNo = response?.data?.BookingRefNo;
        setBookingData({ bookingRefNo });
        router.push(`/hotel-checkout?bookingRefNo=${bookingRefNo}`);
      },
    });
  };

  return (
    <div className="w-full">
      <BackgroundSection />

      <div className="mx-auto max-w-[1250px] px-2 sm:px-4">
        <Row gutter={[14, 23]}>
          
          {/* LEFT */}
          <Col xs={24} lg={15}>
            <div
              className="
                space-y-4 sm:space-y-5
                -mt-10 sm:-mt-16
                px-1 sm:px-0
              "
            >
              <GuestDetailsForm onSubmit={handleGuestSubmit} />

              <SpecialRequestCard
                value={storeBookingData?.requestData}
                onChange={handleRequestChange}
              />

              <ImportantInfoCard bookingData={hotelBookingData} />

              <BookingAgreement
                checked={agreement}
                onChange={setAgreement}
              />

              <div className="pt-2">
                <Button
                  type="primary"
                  size="large"
                  loading={isPending}
                  disabled={
                    !storeBookingData?.guestData ||
                    !storeBookingData?.guestData?.primaryGuest ||
                    !agreement
                  }
                  onClick={handleBooking}
                  className="
                    !h-[44px] sm:!h-[48px]
                    !text-sm sm:!text-base
                    !rounded-lg sm:!rounded-xl
                    !bg-[#0f766e]
                    w-full sm:w-auto
                  "
                >
                  Continue To Booking
                </Button>
              </div>
            </div>
          </Col>

          {/* RIGHT */}
          <Col xs={24} lg={8}>
            <div
              className="
                space-y-3 sm:space-y-4
                mt-4 lg:mt-0
              "
            >
              <BookingHeaderCard bookingData={hotelBookingData} />
              <StaySummaryCard bookingData={hotelBookingData} />
              <RoomPackageCard bookingData={hotelBookingData} />
              <PriceBreakupCard bookingData={hotelBookingData} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
