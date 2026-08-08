"use client";

import {
  AppstoreOutlined,
  CarOutlined,
  CloudOutlined,
  CoffeeOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  RestOutlined,
  ShopOutlined,
  ThunderboltOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import { useHotelBookingStore } from "@/modules/hotel/store/booking.store";
import { Button, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ============================================================================
   AMENITY ICON
============================================================================ */

const getAmenityIcon = (amenity = "") => {
  const name = String(amenity).toLowerCase();

  if (name.includes("wifi")) {
    return <WifiOutlined />;
  }

  if (name.includes("pool") || name.includes("swimming")) {
    return <RestOutlined />;
  }

  if (name.includes("bar")) {
    return <ShopOutlined />;
  }

  if (name.includes("parking")) {
    return <CarOutlined />;
  }

  if (name.includes("power") || name.includes("electric")) {
    return <ThunderboltOutlined />;
  }

  if (
    name.includes("room") ||
    name.includes("lounge") ||
    name.includes("service")
  ) {
    return <HomeOutlined />;
  }

  if (
    name.includes("refrigerator") ||
    name.includes("fridge") ||
    name.includes("air")
  ) {
    return <CloudOutlined />;
  }

  if (
    name.includes("smoking") ||
    name.includes("breakfast") ||
    name.includes("food")
  ) {
    return <CoffeeOutlined />;
  }

  return <AppstoreOutlined />;
};

/* ============================================================================
   ROOM OPTIONS
============================================================================ */

const RoomOptions = ({ ratePlans = [], supplierData = {} }) => {
  const router = useRouter();

  const { requireAuth } = useAuthGuard();
  const { setBookingData } = useHotelBookingStore();

  /* ==========================================================================
     DETAILS MODAL STATE
  ========================================================================== */

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  /* ==========================================================================
     IMAGE HELPER
  ========================================================================== */

  const getHDImage = (url) => {
    if (!url) {
      return "/no-room.jpg";
    }

    return url.replace("_b.", "_z.");
  };

  /* ==========================================================================
     SELECT ROOM
  ========================================================================== */

  const handleSelectRoom = ({ plan, room, pricing }) => {
    const bookingState = useHotelBookingStore.getState();

    setBookingData({
      ...bookingState.bookingData,

      selectedHotel: {
        ...bookingState.bookingData?.selectedHotel,

        recommendationId:
          plan?.RecommendationID || plan?.RecommendationId,
      },

      supplierData,

      selectedRatePlan: plan,

      selectedRoom: room,

      pricing,
    });

    router.push("/hotel-booking");
  };

  /* ==========================================================================
     OPEN DETAILS POPUP
  ========================================================================== */

  const handleOpenDetails = ({
    plan,
    detail,
    room,
    amenities,
    inclusionList,
    pricing,
    roomName,
    roomDescription,
    image,
    refundable,
    payAtHotel,
    panRequired,
    ccRequired,
  }) => {
    setSelectedDetails({
      plan,
      detail,
      room,
      amenities,
      inclusionList,
      pricing,
      roomName,
      roomDescription,
      image,
      refundable,
      payAtHotel,
      panRequired,
      ccRequired,
    });

    setDetailsOpen(true);
  };

  /* ==========================================================================
     CLOSE DETAILS POPUP
  ========================================================================== */

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedDetails(null);
  };

  /* ==========================================================================
     FORMAT PRICE
  ========================================================================== */

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
  };

  return (
    <>
      {/* ======================================================================
          ROOM LIST
      ====================================================================== */}

      <div className="space-y-5">
        {ratePlans?.map((plan, index) => {
          const detail = plan?.RatePlanDetails?.[0] ?? null;
          const room = detail?.RoomDetails?.[0] ?? null;

          const image = getHDImage(
            room?.HotelGallery?.[0]?.ImageURL,
          );

          /* ================================================================
             ROOM DATA
          ================================================================ */

          const roomName =
            room?.GroupName || "Room Not Available";

          const roomDescription =
            room?.HotelRoomTypeDesc || "";

          const smokingAllowed = room?.SmokingAllowed;

          const refundable =
            detail?.Refundable === "True";

          const payAtHotel = detail?.PayatHotel;

          const panRequired =
            detail?.IsPANMandatory === "True";

          const ccRequired = detail?.CCRequired;

          /* ================================================================
             INCLUSIONS
          ================================================================ */

          const inclusionList =
            detail?.Inclusion
              ?.split(",")
              .map((item) => item.trim())
              .filter(Boolean) ?? [];

          /* ================================================================
             AMENITIES
          ================================================================ */

          const amenities = [
            ...(Array.isArray(room?.Amenities)
              ? room.Amenities
              : []),

            ...(Array.isArray(room?.HotelAmenities)
              ? room.HotelAmenities
              : []),
          ]
            .filter(Boolean)
            .map((item) =>
              typeof item === "string"
                ? item
                : item?.Name ||
                  item?.name ||
                  item?.AmenityName ||
                  "",
            )
            .filter(Boolean)
            .filter(
              (item, i, arr) =>
                arr.indexOf(item) === i,
            );

          /* ================================================================
             PRICING
          ================================================================ */

          const pricing =
            plan?.PricingBreakdown ?? {};

          const basicAmount = Number(
            pricing.basePrice || 0,
          );

          const tax = Number(
            pricing.platformFeeAndTax || 0,
          );

          const totalAmount = Number(
            pricing.finalPrice || 0,
          );

          const currencySymbol =
            pricing.currencySymbol || "₹";

          return (
            <div
              key={index}
              className="overflow-hidden rounded-[12px] border border-[#d9e1ea] bg-white text-[#172033] shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
            >
              {/* ============================================================
                  MAIN ROOM AREA
              ============================================================ */}

              <div className="grid items-stretch lg:grid-cols-[400px_minmax(0,1fr)_280px]">
                {/* ==========================================================
                    LEFT - IMAGE + ROOM INFORMATION
                ========================================================== */}

                <div className="border-b border-gray-200 lg:border-r lg:border-b-0">
                  {/* IMAGE */}

                  <div className="relative h-[235px] w-full overflow-hidden lg:h-[245px]">
                    <Image
                      src={image}
                      alt={roomName}
                      fill
                      sizes="400px"
                      className="object-cover"
                    />

                    {/* Availability */}

                    <div className="absolute left-3 top-3 rounded-[3px] bg-[#8f3fd1] px-3 py-1 text-[12px] font-semibold text-white shadow-sm">
                      Limited availability
                    </div>

                    {/* Photo Count */}

                    <div className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[12px] font-semibold text-white">
                      {room?.HotelGallery?.length || 1}/
                      {room?.HotelGallery?.length || 1}
                    </div>
                  </div>

                  {/* SEE PHOTOS */}

                  <button
                    type="button"
                    className="px-4 pt-2 text-[14px] font-semibold text-[#1677ff] hover:underline"
                  >
                    See photos
                  </button>

                  {/* ROOM DETAILS */}

                  <div className="px-4 pb-5 pt-2">
                    <h3 className="text-[25px] font-bold leading-tight text-[#111827]">
                      {roomName}
                    </h3>

                    {roomDescription && (
                      <p className="mt-2 text-[13px] leading-5 text-gray-600">
                        {roomDescription}
                      </p>
                    )}

                    {/* BASIC DETAILS */}

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-[#1f2937]">
                      {room?.RoomSize && (
                        <span>
                          {room.RoomSize}
                        </span>
                      )}

                      <span>
                        Max{" "}
                        {room?.MaxGuest ||
                          room?.MaxGuests ||
                          2}{" "}
                        adults
                      </span>

                      <span>
                        {room?.BedType ||
                          "1 king bed or 2 single beds"}
                      </span>
                    </div>

                    {/* AMENITIES */}

                    {amenities.length > 0 && (
                      <div className="mt-5 space-y-2">
                        {amenities.map(
                          (item, i) => (
                            <div
                              key={`${item}-${i}`}
                              className="flex items-center gap-2 text-[14px] text-[#52627a]"
                            >
                              <span className="flex w-[18px] shrink-0 items-center justify-center text-[16px] text-[#1677ff]">
                                {getAmenityIcon(
                                  item,
                                )}
                              </span>

                              <span className="font-medium">
                                {item}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    )}

                    {!amenities.length && (
                      <div className="mt-5 text-[13px] text-gray-400">
                        No amenities available
                      </div>
                    )}
                  </div>
                </div>

                {/* ==========================================================
                    MIDDLE - RATE PLAN DETAILS
                ========================================================== */}

                <div className="flex flex-col border-b border-gray-200 lg:border-r lg:border-b-0">
                  {/* RED DEAL BAR */}

                  <div className="bg-[#cf3025] px-4 py-1 text-[14px] font-bold text-white">
                    Today 43% off! Lowest price available!
                  </div>

                  <div className="flex-1 px-4 py-4">
                    {/* DEAL */}

                    <div className="mb-4 inline-flex items-center gap-2 rounded-[3px] border border-[#f1d3c4] bg-[#fff7f3] px-3 py-1 text-[13px] text-[#9a3412]">
                      Domestic Deals

                      <span className="text-[11px]">
                        ⓘ
                      </span>
                    </div>

                    {/* GUEST */}

                    <div className="space-y-2 text-[16px] text-[#172033]">
                      <div className="font-medium">
                        ●{" "}
                        {room?.MaxGuest ||
                          room?.MaxGuests ||
                          2}{" "}
                        adults ⓘ
                      </div>

                      {/* FREE KID */}

                      <div className="font-semibold text-[#008542]">
                        ✦ Your kid can stay for FREE!
                      </div>

                      {/* BREAKFAST */}

                      {inclusionList.some(
                        (item) =>
                          item
                            .toLowerCase()
                            .includes(
                              "breakfast",
                            ),
                      ) && (
                        <div className="font-semibold text-[#008542]">
                          🍴 Breakfast Included
                        </div>
                      )}

                      {/* CANCELLATION */}

                      <div>
                        ✓ Cancellation policy ⓘ
                      </div>

                      {/* PAYMENT */}

                      <div>
                        ✓{" "}
                        {payAtHotel
                          ? "Pay at hotel"
                          : "Book and pay now"}
                      </div>

                      {/* PARKING */}

                      {amenities.some(
                        (item) =>
                          item
                            .toLowerCase()
                            .includes(
                              "parking",
                            ),
                      ) && (
                        <div>
                          ✓ Parking
                        </div>
                      )}

                      {/* WIFI */}

                      {amenities.some(
                        (item) =>
                          item
                            .toLowerCase()
                            .includes(
                              "wifi",
                            ),
                      ) && (
                        <div>
                          ✓ Free WiFi
                        </div>
                      )}

                      {/* SPONSORED */}

                      {!!pricing.discount && (
                        <div>
                          ◆ AGODA_SPONSORED -{" "}
                          {currencySymbol}{" "}
                          {formatPrice(
                            pricing.discount,
                          )}{" "}
                          off!
                        </div>
                      )}
                    </div>

                    {/* ======================================================
                        SEE DETAILS
                    ====================================================== */}

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenDetails({
                          plan,
                          detail,
                          room,
                          amenities,
                          inclusionList,
                          pricing,
                          roomName,
                          roomDescription,
                          image,
                          refundable,
                          payAtHotel,
                          panRequired,
                          ccRequired,
                        })
                      }
                      className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-[#1677ff] hover:underline"
                    >
                      <InfoCircleOutlined />

                      See details
                    </button>
                  </div>
                </div>

                {/* ==========================================================
                    RIGHT - PRICE + BOOK
                ========================================================== */}

                <div className="flex flex-col">
                  <div className="flex-1 px-4 py-4">
                    <div className="text-center">
                      <p className="text-[17px] leading-5 text-[#dc3028]">
                        Cheapest price you've
                        <br />
                        seen!
                      </p>

                      {/* DISCOUNT */}

                      {!!pricing.discount && (
                        <div className="mx-auto mt-2 inline-flex items-center gap-2 rounded-[3px] bg-[#e5f5e8] px-3 py-1 text-[12px] font-semibold text-[#087d39]">
                          🎟{" "}
                          {currencySymbol}{" "}
                          {formatPrice(
                            pricing.discount,
                          )}{" "}
                          applied
                        </div>
                      )}

                      {/* OLD PRICE */}

                      {!!pricing.originalPrice && (
                        <div className="mt-1 text-[12px] text-gray-500 line-through">
                          {currencySymbol}{" "}
                          {formatPrice(
                            pricing.originalPrice,
                          )}
                        </div>
                      )}

                      {/* TOTAL */}

                      <div className="mt-1 text-[30px] font-bold text-[#d83228]">
                        {currencySymbol}{" "}
                        {formatPrice(
                          totalAmount,
                        )}
                      </div>

                      <p className="mt-1 text-[13px] text-[#64748b]">
                        Per night before taxes
                      </p>
                    </div>
                  </div>

                  {/* BOOK */}

                  <div className="border-t border-gray-200 px-4 py-4">
                    <p className="text-center text-[16px] text-[#172033]">
                      1 room
                    </p>

                    <Button
                      type="primary"
                      size="large"
                      onClick={() =>
                        requireAuth(() =>
                          handleSelectRoom({
                            plan,
                            room,
                            pricing,
                          }),
                        )
                      }
                      className="!mt-2 !h-[54px] !w-full !rounded-full !border-none !bg-[#2468dc] !text-[19px] !font-bold !text-white hover:!bg-[#1557c5]"
                    >
                      Book
                    </Button>

                    <p className="mt-3 text-center text-[15px] text-[#64748b]">
                      it only takes 2 minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* ============================================================
                  BANK DISCOUNT
              ============================================================ */}

              <div className="flex items-center justify-between bg-[#e7f0ff] px-5 py-2 text-[16px] font-semibold text-[#172033]">
                <span>
                  Get upto ₹4,000 off bank discount
                </span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-[12px]">
                  ▣
                </span>
              </div>

              {/* ============================================================
                  CANCELLATION POLICY
              ============================================================ */}

              {!!detail?.CancellationPolicy && (
                <div className="border-t border-[#fde7cf] bg-[#fffaf5] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#ea580c]" />

                    <p className="mb-0 font-semibold text-[#9a3412]">
                      Cancellation Policy
                    </p>
                  </div>

                  <div
                    className="mt-2 text-sm leading-6 text-[#7c2d12]"
                    dangerouslySetInnerHTML={{
                      __html:
                        detail.CancellationPolicy,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* EMPTY */}

        {!ratePlans.length && (
          <div className="rounded-[12px] border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            No rooms available
          </div>
        )}
      </div>

      {/* ======================================================================
          SEE DETAILS MODAL
      ====================================================================== */}

      <Modal
        open={detailsOpen}
        onCancel={handleCloseDetails}
        footer={null}
        centered
        width={850}
        destroyOnHidden
        title={null}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        {selectedDetails && (
          <div className="overflow-hidden rounded-[10px] bg-white">
            {/* ================================================================
                MODAL HEADER
            ================================================================ */}

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#1677ff]">
                  Room Details
                </p>

                <h2 className="mt-1 text-[24px] font-bold text-[#111827]">
                  {selectedDetails.roomName}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleCloseDetails}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg text-gray-600 transition hover:bg-gray-200"
              >
                ×
              </button>
            </div>

            {/* ================================================================
                MODAL CONTENT
            ================================================================ */}

            <div className="max-h-[70vh] overflow-y-auto">
              {/* IMAGE */}

              <div className="relative h-[230px] w-full">
                <Image
                  src={selectedDetails.image}
                  alt={selectedDetails.roomName}
                  fill
                  sizes="850px"
                  className="object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-12">
                  <p className="text-lg font-bold text-white">
                    {selectedDetails.roomName}
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-6">
                {/* ==========================================================
                    ROOM DESCRIPTION
                ========================================================== */}

                <section>
                  <h3 className="text-[17px] font-bold text-[#172033]">
                    Room Information
                  </h3>

                  {selectedDetails.roomDescription ? (
                    <p className="mt-2 text-[14px] leading-6 text-gray-600">
                      {
                        selectedDetails.roomDescription
                      }
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400">
                      Room description not
                      available.
                    </p>
                  )}

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {selectedDetails.room
                      ?.RoomSize && (
                      <div className="rounded-lg bg-gray-50 p-3">
                        <p className="text-[11px] uppercase text-gray-400">
                          Room Size
                        </p>

                        <p className="mt-1 text-sm font-semibold text-gray-700">
                          {
                            selectedDetails.room
                              .RoomSize
                          }
                        </p>
                      </div>
                    )}

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-[11px] uppercase text-gray-400">
                        Guests
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        Max{" "}
                        {selectedDetails.room
                          ?.MaxGuest ||
                          selectedDetails.room
                            ?.MaxGuests ||
                          2}{" "}
                        adults
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-[11px] uppercase text-gray-400">
                        Bed Type
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        {selectedDetails.room
                          ?.BedType ||
                          "Not specified"}
                      </p>
                    </div>
                  </div>
                </section>

                {/* ==========================================================
                    AMENITIES
                ========================================================== */}

                <section>
                  <h3 className="text-[17px] font-bold text-[#172033]">
                    Amenities
                  </h3>

                  {selectedDetails
                    .amenities?.length ? (
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {selectedDetails.amenities.map(
                        (item, i) => (
                          <div
                            key={`${item}-${i}`}
                            className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-3"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef5ff] text-[#1677ff]">
                              {getAmenityIcon(
                                item,
                              )}
                            </span>

                            <span className="text-sm font-medium text-gray-700">
                              {item}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400">
                      No amenities available.
                    </p>
                  )}
                </section>

                {/* ==========================================================
                    INCLUSIONS
                ========================================================== */}

                <section>
                  <h3 className="text-[17px] font-bold text-[#172033]">
                    What's Included
                  </h3>

                  {selectedDetails
                    .inclusionList?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedDetails.inclusionList.map(
                        (item, i) => (
                          <span
                            key={`${item}-${i}`}
                            className="rounded-full bg-green-50 px-3 py-2 text-[13px] font-semibold text-green-700"
                          >
                            ✓ {item}
                          </span>
                        ),
                      )}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400">
                      No inclusion details
                      available.
                    </p>
                  )}
                </section>

                {/* ==========================================================
                    RATE PLAN
                ========================================================== */}

                <section>
                  <h3 className="text-[17px] font-bold text-[#172033]">
                    Booking Conditions
                  </h3>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div
                      className={`rounded-lg border p-4 ${
                        selectedDetails
                          .refundable
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <p className="text-[11px] uppercase text-gray-400">
                        Cancellation
                      </p>

                      <p
                        className={`mt-1 text-sm font-bold ${
                          selectedDetails
                            .refundable
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        {selectedDetails.refundable
                          ? "Free Cancellation"
                          : "Non Refundable"}
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                      <p className="text-[11px] uppercase text-gray-400">
                        Payment
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-700">
                        {selectedDetails.payAtHotel
                          ? "Pay at Hotel"
                          : "Book and Pay Now"}
                      </p>
                    </div>

                    {selectedDetails
                      .panRequired && (
                      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <p className="text-[11px] uppercase text-gray-400">
                          PAN
                        </p>

                        <p className="mt-1 text-sm font-bold text-yellow-700">
                          PAN Required
                        </p>
                      </div>
                    )}

                    {selectedDetails
                      .ccRequired && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="text-[11px] uppercase text-gray-400">
                          Card
                        </p>

                        <p className="mt-1 text-sm font-bold text-red-600">
                          Credit Card Required
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* ==========================================================
                    CANCELLATION POLICY
                ========================================================== */}

                {!!selectedDetails.detail
                  ?.CancellationPolicy && (
                  <section>
                    <h3 className="text-[17px] font-bold text-[#172033]">
                      Cancellation Policy
                    </h3>

                    <div
                      className="mt-3 rounded-lg border border-[#fde7cf] bg-[#fffaf5] p-4 text-[14px] leading-6 text-[#7c2d12]"
                      dangerouslySetInnerHTML={{
                        __html:
                          selectedDetails
                            .detail
                            .CancellationPolicy,
                      }}
                    />
                  </section>
                )}

                {/* ==========================================================
                    PRICE BREAKDOWN
                ========================================================== */}

                <section>
                  <h3 className="text-[17px] font-bold text-[#172033]">
                    Price Breakdown
                  </h3>

                  <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center justify-between py-2 text-sm">
                      <span className="text-gray-500">
                        Basic Price
                      </span>

                      <span className="font-semibold text-gray-700">
                        {
                          selectedDetails
                            .pricing
                            .currencySymbol
                        }{" "}
                        {formatPrice(
                          selectedDetails
                            .pricing
                            .basePrice,
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 py-2 text-sm">
                      <span className="text-gray-500">
                        Tax & Fees
                      </span>

                      <span className="font-semibold text-gray-700">
                        {
                          selectedDetails
                            .pricing
                            .currencySymbol
                        }{" "}
                        {formatPrice(
                          selectedDetails
                            .pricing
                            .platformFeeAndTax,
                        )}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-dashed border-gray-300 pt-3">
                      <span className="font-bold text-gray-800">
                        Total Price
                      </span>

                      <span className="text-xl font-bold text-[#d83228]">
                        {
                          selectedDetails
                            .pricing
                            .currencySymbol
                        }{" "}
                        {formatPrice(
                          selectedDetails
                            .pricing
                            .finalPrice,
                        )}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* ================================================================
                MODAL FOOTER
            ================================================================ */}

            <div className="flex flex-col gap-3 border-t border-gray-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[12px] text-gray-500">
                  Total price
                </p>

                <p className="text-[22px] font-bold text-[#d83228]">
                  {
                    selectedDetails.pricing
                      .currencySymbol
                  }{" "}
                  {formatPrice(
                    selectedDetails.pricing
                      .finalPrice,
                  )}
                </p>
              </div>

             
            </div>
             <Button
                type="primary"
                size="large"
                onClick={() => {
                  handleCloseDetails();

                  requireAuth(() =>
                    handleSelectRoom({
                      plan:
                        selectedDetails.plan,
                      room:
                        selectedDetails.room,
                      pricing:
                        selectedDetails.pricing,
                    }),
                  );
                }}
                className="!h-[48px] !rounded-full !border-none !bg-[#2468dc] !px-8 !font-bold !text-white hover:!bg-[#1557c5]"
              >
                Book This Room
              </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RoomOptions;