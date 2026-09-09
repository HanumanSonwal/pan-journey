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
import RoomPackageCard from "./RoomPackageCard";
import SpecialRequestCard from "./SpecialRequestCard";
import StaySummaryCard from "./StaySummaryCard";
import CouponsBankOffers from "./CouponsBankOffers";

import HotelBookingContents from "../../mobile-componant/HotelBookingContents";

export default function HotelBookingContent({
  hotelBookingData,
  hotelDetailId,
  roomId,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { mutate: bookHotel, isPending } = useHotelBooking();

  const router = useRouter();

  const {
    bookingData: storeBookingData,
    setBookingData,
  } = useHotelBookingStore();

  // ============================================================
  // MERGED BOOKING DATA
  // ============================================================

  const mergedBookingData = {
    ...hotelBookingData,

    searchData: storeBookingData?.searchData || null,

    selectedRoom:
      storeBookingData?.selectedRoom || null,

    selectedRatePlan:
      storeBookingData?.selectedRatePlan || null,

    selectedHotel:
      storeBookingData?.selectedHotel || null,
  };

  console.log(
    "ROOM PRICING BOOKING DATA:",
    hotelBookingData
  );

  console.log(
    "MERGED BOOKING DATA:",
    mergedBookingData
  );

  console.log(
    "HOTEL DETAIL ID:",
    hotelDetailId
  );

  console.log(
    "ROOM ID:",
    roomId
  );

  console.log(
    "storeBookingData in hotelBooking",
    storeBookingData
  );

  // ============================================================
  // STATES
  // ============================================================

  const [agreement, setAgreement] = useState(false);

  const guestFormRef = useRef(null);

  const { data: session } = useSession();

  // ============================================================
  // MOBILE CHECK
  // ============================================================

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener(
      "resize",
      checkMobile
    );

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile
      );
    };
  }, []);

  // ============================================================
  // SPECIAL REQUEST
  // ============================================================

  const handleRequestChange = (value) => {
    setBookingData({
      requestData: value,
    });
  };

  // ============================================================
  // GUEST FORM
  // ============================================================

  const handleGuestSubmit = (values) => {
    setBookingData({
      guestData: values,
    });
  };

  // ============================================================
  // BOOKING
  // ============================================================

  const handleBooking = async () => {
    let latestGuestData;

    try {
      latestGuestData =
        await guestFormRef.current.submitForm();
    } catch (errors) {
      console.log(errors);
      return;
    }

    // Store latest guest data
    setBookingData({
      guestData: latestGuestData,
    });

    // Build booking payload
    const payload = buildBookingPayload({
      bookingData: {
        ...storeBookingData,
        guestData: latestGuestData,
      },

      guestData: latestGuestData,

      requestData:
        storeBookingData?.requestData,
    });

    console.log(
      "FINAL BOOKING PAYLOAD:",
      payload
    );

    bookHotel(payload, {
      onSuccess: (response) => {
        const bookingRefNo =
          response?.data?.BookingRefNo;

        setBookingData({
          bookingRefNo,
        });

        router.push(
          `/hotel-checkout?bookingRefNo=${bookingRefNo}`
        );
      },
    });
  };

  // ============================================================
  // BOOKING PROPS
  // ============================================================

  const bookingProps = {
    hotelBookingData: mergedBookingData,

    guestFormRef,

    agreement,
    setAgreement,

    storeBookingData,

    handleGuestSubmit,
    handleRequestChange,
    handleBooking,

    isPending,
  };

  // ============================================================
  // HYDRATION PROTECTION
  // ============================================================

  if (!mounted) {
    return null;
  }

  // ============================================================
  // MOBILE UI
  // ============================================================

  if (isMobile) {
    return (
      <HotelBookingContents
        {...bookingProps}
      />
    );
  }

  // ============================================================
  // DESKTOP UI
  // ============================================================

  return (
    <div className="w-full">
      <BackgroundSection />

      <div className="mx-auto max-w-[1250px] !pb-6 sm:px-4">
        <Row gutter={[14, 23]}>

          {/* ==================================================
              LEFT COLUMN
          ================================================== */}

          <Col xs={24} lg={15}>
            <div className="-mt-10! space-y-4 px-1 sm:space-y-5 sm:px-0">

              {/* GUEST DETAILS */}

              <GuestDetailsForm
                ref={guestFormRef}
                onSubmit={handleGuestSubmit}
              />

              {/* SPECIAL REQUEST */}

              <SpecialRequestCard
                value={
                  storeBookingData?.requestData
                }
                onChange={
                  handleRequestChange
                }
              />

              {/* IMPORTANT INFORMATION */}

              <ImportantInfoCard
                bookingData={
                  mergedBookingData
                }
              />

              {/* ==================================================
                  PRICE BREAKUP + AGREEMENT
                  
                  PriceBreakupCard ab yahin render hoga
                  ================================================== */}

              <BookingAgreement
                checked={agreement}
                onChange={setAgreement}
                bookingData={
                  mergedBookingData
                }
              />

              {/* CONTINUE BUTTON */}

              <div className="mb-[36px] pt-1 md:mb-[49px] xl:mb-0">
                <Button
                  type="primary"
                  size="large"
                  loading={isPending}
                  disabled={!agreement}
                  onClick={handleBooking}
                  className="
                    buttion-background-color
                    !h-[44px]
                    w-full
                    !rounded-lg
                    !text-sm
                    sm:!h-[48px]
                    sm:w-auto
                    sm:!rounded-xl
                    sm:!text-base
                  "
                >
                  Continue To Booking
                </Button>
              </div>

            </div>
          </Col>

          {/* ==================================================
              RIGHT COLUMN
          ================================================== */}

          <Col xs={24} lg={8}>
            <div className="-mt-10! space-y-4 px-1 sm:space-y-5 sm:px-0">

              {/* BOOKING HEADER */}

              <BookingHeaderCard
                bookingData={
                  mergedBookingData
                }
              />

              {/* STAY SUMMARY */}

              <StaySummaryCard
                bookingData={
                  mergedBookingData
                }
              />

              {/* ROOM PACKAGE */}

              <RoomPackageCard
                bookingData={
                  mergedBookingData
                }
              />

              {/* ==================================================
                  PRICE BREAKUP REMOVED FROM HERE
                  ================================================== */}

              {/* COUPONS */}

              <CouponsBankOffers
                bookingData={
                  mergedBookingData
                }
              />

            </div>
          </Col>

        </Row>
      </div>
    </div>
  );
}
