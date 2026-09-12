"use client";

import { Button, Col, Row } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useHotelBooking } from "../../hooks/useHotelBooking";
import { useHotelBookingStore } from "../../store/booking.store";
import { buildBookingPayload } from "../../utils/buildBookingPayload";

import BackgroundSection from "./BackgroundSection";
import BookingAgreement from "./BookingAgreement";
import BookingHeaderCard from "./BookingHeaderCard";
import CouponsBankOffers from "./CouponsBankOffers";
import GuestDetailsForm from "./GuestDetailsForm";
import ImportantInfoCard from "./ImportantInfoCard";
import RoomPackageCard from "./RoomPackageCard";
import SpecialRequestCard from "./SpecialRequestCard";
import StaySummaryCard from "./StaySummaryCard";

import HotelBookingContents from "../../mobile-componant/HotelBookingContents";

export default function HotelBookingContent({
  hotelBookingData = {},
  hotelDetailId = "",
  roomId = "",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const guestFormRef = useRef(null);
  const { mutate: bookHotel, isPending } = useHotelBooking();
  const router = useRouter();
  const { data: session } = useSession();
  const { bookingData: storeBookingData, setBookingData } =
    useHotelBookingStore();
  const searchData = storeBookingData?.searchData || null;
  const bookingData = useMemo(
    () => ({
      ...hotelBookingData,
      hotelDetailId: hotelBookingData?.hotelDetailId || hotelDetailId || "",
      hotelId: hotelBookingData?.hotelId || "",
      roomId: hotelBookingData?.roomId || roomId || "",
      searchData,
    }),
    [hotelBookingData, hotelDetailId, roomId, searchData],
  );

  const occupancy = useMemo(() => {
    const apiRooms = Array.isArray(hotelBookingData?.guestDetails?.rooms)
      ? hotelBookingData.guestDetails.rooms
      : Array.isArray(hotelBookingData?.rooms)
        ? hotelBookingData.rooms
        : [];

    if (apiRooms.length) {
      return apiRooms;
    }

    const roomCount = Math.max(Number(searchData?.rooms) || 1, 1);
    const adultCount = Math.max(Number(searchData?.adults) || 1, 1);
    const childCount = Math.max(Number(searchData?.children) || 0, 0);

    const rooms = Array.from({ length: roomCount }, (_, index) => ({
      roomNo: index + 1,
      adults: 1,
      children: 0,
    }));

    let remainingAdults = Math.max(adultCount - roomCount, 0);
    let adultRoomIndex = 0;

    while (remainingAdults > 0) {
      rooms[adultRoomIndex % rooms.length].adults += 1;
      remainingAdults -= 1;
      adultRoomIndex += 1;
    }

    let remainingChildren = childCount;
    let childRoomIndex = 0;

    while (remainingChildren > 0) {
      rooms[childRoomIndex % rooms.length].children += 1;
      remainingChildren -= 1;
      childRoomIndex += 1;
    }
    return rooms;
  }, [hotelBookingData, searchData]);

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
      console.log("GUEST FORM ERRORS:", errors);
      return;
    }

    setBookingData({
      guestData: latestGuestData,
    });

    const payload = buildBookingPayload({
      bookingData,
      guestData: latestGuestData,
      requestData: storeBookingData?.requestData || {},
      hotelDetailId,
      roomId,
    });

    bookHotel(payload, {
      onSuccess: (response) => {
        const bookingRefNo =
          response?.data?.BookingRefNo ||
          response?.data?.bookingRefNo ||
          response?.BookingRefNo ||
          response?.bookingRefNo;

        if (!bookingRefNo) {
          console.error("BOOKING REF NO NOT FOUND:", response);
          return;
        }

        setBookingData({
          bookingRefNo,
        });

        router.push(
          `/hotel-checkout?bookingRefNo=${encodeURIComponent(bookingRefNo)}`,
        );
      },
    });
  };

  const bookingProps = {
    hotelBookingData: bookingData,
    hotelDetailId,
    roomId,
    occupancy,
    guestFormRef,
    agreement,
    setAgreement,
    storeBookingData,
    handleGuestSubmit,
    handleRequestChange,
    handleBooking,
    isPending,
    session,
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <HotelBookingContents {...bookingProps} />
      ) : (
        <div className="w-full">
          <BackgroundSection />

          <div className="mx-auto max-w-[1250px] !pb-6 sm:px-4">
            <Row gutter={[14, 23]}>
              <Col xs={24} lg={15}>
                <div className="-mt-10! space-y-4 px-1 sm:space-y-5 sm:px-0">
                  <GuestDetailsForm
                    ref={guestFormRef}
                    onSubmit={handleGuestSubmit}
                    occupancy={occupancy}
                  />

                  <SpecialRequestCard
                    value={storeBookingData?.requestData || {}}
                    onChange={handleRequestChange}
                  />

                  <ImportantInfoCard bookingData={bookingData} />

                  <BookingAgreement
                    checked={agreement}
                    onChange={setAgreement}
                    bookingData={bookingData}
                  />

                  <div className="mb-[36px] pt-1 md:mb-[49px] xl:mb-0">
                    <Button
                      type="primary"
                      size="large"
                      loading={isPending}
                      disabled={!agreement}
                      onClick={handleBooking}
                      className="buttion-background-color !h-[44px] w-full !rounded-lg !text-sm sm:!h-[48px] sm:w-auto sm:!rounded-xl sm:!text-base"
                    >
                      Continue To Booking
                    </Button>
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={8}>
                <div className="-mt-10! space-y-4 px-1 sm:space-y-5 sm:px-0">
                  <BookingHeaderCard bookingData={bookingData} />
                  <StaySummaryCard
                    bookingData={bookingData}
                    occupancy={occupancy}
                  />
                  <RoomPackageCard bookingData={bookingData} />
                  <CouponsBankOffers bookingData={bookingData} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}
