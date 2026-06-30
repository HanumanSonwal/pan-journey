"use client";

import { Button, Col, Row } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
  const guestFormRef = useRef(null);

  const { data: session } = useSession();

  const handleRequestChange = (value) => {
    setBookingData({ requestData: value });
  };

  const handleGuestSubmit = (values) => {
    setBookingData({ guestData: values });
  };

  const handleBooking = async () => {
    try {
      await guestFormRef.current.submitForm();
    } catch (errors) {
      console.log(errors);
      return;
    }

    const payload = buildBookingPayload({
      bookingData: storeBookingData,
      guestData: storeBookingData?.guestData,
      requestData: storeBookingData?.requestData,
      userId: session?.user?.id,
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

      <div className="mx-auto max-w-[1250px] sm:px-4">
        <Row gutter={[14, 23]}>
          {/* LEFT */}
          <Col xs={24} lg={15}>
            <div className="-mt-10! space-y-4 px-1 sm:space-y-5 sm:px-0">
              <GuestDetailsForm
                ref={guestFormRef}
                onSubmit={handleGuestSubmit}
              />

              <SpecialRequestCard
                value={storeBookingData?.requestData}
                onChange={handleRequestChange}
              />

              <ImportantInfoCard bookingData={hotelBookingData} />

              <BookingAgreement checked={agreement} onChange={setAgreement} />

              <div className="pt-2 mb-[36px] md:mb-[49px] xl:mb-0">
                <Button
                  type="primary"
                  size="large"
                  loading={isPending}
                  disabled={!agreement}
                  onClick={handleBooking}
                  className="!h-[44px] w-full !rounded-lg !bg-[#0f766e] !text-sm sm:!h-[48px] sm:w-auto sm:!rounded-xl sm:!text-base"
                >
                  Continue To Booking
                </Button>
              </div>
            </div>
          </Col>

          {/* RIGHT */}
          <Col xs={24} lg={8}>
            <div className="-mt-10! space-y-4 px-1 sm:space-y-5 sm:px-0">
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
