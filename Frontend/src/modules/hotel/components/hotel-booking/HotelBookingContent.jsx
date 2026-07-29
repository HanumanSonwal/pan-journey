"use client";

import { Button, Col, Row } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

import HotelBookingContents from "../../mobile-componant/HotelBookingContents";

export default function HotelBookingContent({ hotelBookingData }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { mutate: bookHotel, isPending } = useHotelBooking();

  const router = useRouter();

  const { bookingData: storeBookingData, setBookingData } =
    useHotelBookingStore();

  console.log("storeBookingData in hotelBooking", storeBookingData);

  const [agreement, setAgreement] = useState(false);

  const guestFormRef = useRef(null);

  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleRequestChange = (value) => {
    setBookingData({
      requestData: value,
    });
  };

  const handleGuestSubmit = (values) => {
    setBookingData({
      guestData: values,
    });
  };

  const handleBooking = async () => {
    let latestGuestData;

    try {
      latestGuestData = await guestFormRef.current.submitForm();
    } catch (errors) {
      console.log(errors);
      return;
    }

    // Optional: store update
    setBookingData({
      guestData: latestGuestData,
    });

    const payload = buildBookingPayload({
      bookingData: {
        ...storeBookingData,
        guestData: latestGuestData,
      },
      guestData: latestGuestData,
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

  const bookingProps = {
    hotelBookingData,

    guestFormRef,

    agreement,
    setAgreement,

    storeBookingData,

    handleGuestSubmit,
    handleRequestChange,
    handleBooking,

    isPending,
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  // MOBILE UI
  if (isMobile) {
    return <HotelBookingContents {...bookingProps} />;
  }

  // DESKTOP UI
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

              <div className="mb-[36px] pt-2 md:mb-[49px] xl:mb-0">
                <Button
                  type="primary"
                  size="large"
                  loading={isPending}
                  disabled={!agreement}
                  onClick={handleBooking}
                  className="!h-[44px] w-full !rounded-lg buttion-background-color !text-sm sm:!h-[48px] sm:w-auto sm:!rounded-xl sm:!text-base"
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
