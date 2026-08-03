"use client";

import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import { useHotelBookingStore } from "@/modules/hotel/store/booking.store";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RoomOptions = ({ ratePlans = [], supplierData = {} }) => {
  const router = useRouter();

  const { requireAuth } = useAuthGuard();
  const { setBookingData } = useHotelBookingStore();

  /*
   * =========================
   * IMAGE HELPER
   * =========================
   */
  const getHDImage = (url) => {
    if (!url) {
      return "/no-room.jpg";
    }

    return url.replace("_b.", "_z.");
  };

  /*
   * =========================
   * SELECT ROOM
   * =========================
   */
  const handleSelectRoom = ({ plan, room, pricing }) => {
    const bookingState = useHotelBookingStore.getState();

    setBookingData({
      ...bookingState.bookingData,

      selectedHotel: {
        ...bookingState.bookingData?.selectedHotel,

        recommendationId: plan?.RecommendationID || plan?.RecommendationId,
      },

      supplierData,

      selectedRatePlan: plan,

      selectedRoom: room,
      pricing,


    });

    router.push("/hotel-booking");
  };
  return (
    <div className="space-y-6">
      {ratePlans?.map((plan, index) => {
        const detail = plan?.RatePlanDetails?.[0] ?? null;
        const room = detail?.RoomDetails?.[0] ?? null;
        const image = getHDImage(room?.HotelGallery?.[0]?.ImageURL);

        const roomName = room?.GroupName || "Room Not Available";
        const roomDescription = room?.HotelRoomTypeDesc || "";
        const smokingAllowed = room?.SmokingAllowed;

        const refundable = detail?.Refundable === "True";
        const payAtHotel = detail?.PayatHotel;
        const panRequired = detail?.IsPANMandatory === "True";
        const ccRequired = detail?.CCRequired;

        const inclusionList =
          detail?.Inclusion?.split(",")
            .map((item) => item.trim())
            .filter(Boolean) ?? [];

        const pricing = plan?.PricingBreakdown ?? {};
        const basicAmount = Number(pricing.basePrice || 0);
        const tax = Number(pricing.platformFeeAndTax || 0);
        const totalAmount = Number(pricing.finalPrice || 0);
        const currencySymbol = pricing.currencySymbol || "₹";

        const formatPrice = (value) =>
          Number(value || 0).toLocaleString("en-IN");

        return (
          <div
            key={index}
            className="overflow-hidden rounded border border-gray-200 bg-white text-[#0f172a]! shadow-sm"
          >
            <div className="grid items-stretch gap-5 p-5 lg:grid-cols-[280px_1fr_280px]">
              {/* IMAGE */}
              <div className="relative h-[240px] overflow-hidden rounded lg:h-full lg:min-h-[260px]">
                <Image
                  src={image}
                  alt="room"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>

              {/* ROOM DETAILS */}
              <div>
                {/* Top Badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`font-roboto rounded-full px-3 py-1 text-xs font-semibold ${
                      refundable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {refundable ? "Free Cancellation" : "Non Refundable"}
                  </span>

                  {detail?.RoomAvailability && (
                    <span className="font-roboto rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                      Available
                    </span>
                  )}

                  {payAtHotel ? (
                    <span className="font-roboto rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
                      Pay at Hotel
                    </span>
                  ) : (
                    <span className="font-roboto rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                      Prepaid
                    </span>
                  )}

                  {panRequired && (
                    <span className="font-roboto rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      PAN Required
                    </span>
                  )}

                  {ccRequired && (
                    <span className="font-roboto rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                      Credit Card Required
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-roboto mt-3! mb-1! text-2xl font-bold text-[#0f172a]">
                  {roomName}
                </h3>

                <p className="font-roboto mt-1 font-semibold text-gray-500">
                  {roomDescription}
                </p>

                {/* Room Features */}
                <div className="mt-0! flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 text-xs text-slate-600">
                    {smokingAllowed ? "Smoking Allowed" : "Non Smoking"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 text-xs text-slate-600">
                    {roomName}
                  </span>
                </div>

                {/* Inclusion */}
                {!!inclusionList.length && (
                  <div className="my-4 flex flex-wrap gap-2">
                    {inclusionList
                      ?.map((i) => i.trim())
                      ?.filter((i) => i.length > 0)
                      ?.map((item, i) => (
                        <span
                          key={i}
                          className="font-roboto rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600"
                        >
                          ✓ {item}
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* PRICE */}
              <div className="flex h-full flex-col rounded border border-gray-100 bg-[#fafafa] p-4 lg:sticky lg:top-24">
                <p className="mb-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Price Breakdown
                </p>

                <div className="space-y-3 text-sm">
                  {/* Basic */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Basic Price</span>

                    <span className="font-medium text-gray-700">
                      {currencySymbol} {formatPrice(basicAmount)}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Tax</span>

                    <span className="font-medium text-gray-700">
                      {currencySymbol} {formatPrice(tax)}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="border-t border-dashed pt-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[11px] tracking-wide text-gray-400 uppercase">
                          Total Price
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Taxes included
                        </p>
                      </div>

                      <span className="text-base leading-none font-bold text-[#0f172a] sm:text-lg lg:text-2xl">
                        {currencySymbol} {formatPrice(totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

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
                  className="!mt-5 !h-[48px] w-full rounded! buttion-background-color text-sm font-semibold tracking-wide text-white!"
                >
                  Select Room
                </Button>
              </div>
            </div>
            {/* Cancellation Full Width */}
            {!!detail?.CancellationPolicy && (
              <div className="mx-5 mt-2 mb-5 rounded border border-[#fde7cf] bg-[#fffaf5] p-5 shadow-sm">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-[#ea580c]" />

                  <p className="mb-0! font-semibold text-[#9a3412]">
                    Cancellation Policy
                  </p>
                </div>

                {/* Content */}
                <div
                  className="space-y-2 text-sm leading-6 text-[#7c2d12]"
                  dangerouslySetInnerHTML={{
                    __html: detail?.CancellationPolicy,
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      {!ratePlans.length && (
        <div className="rounded border border-dashed p-8 text-center text-gray-500">
          No rooms available
        </div>
      )}
    </div>
  );
};

export default RoomOptions;
