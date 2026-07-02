"use client";

import { useAuthGuard } from "@/modules/auth/hooks/useAuthGuard";
import { useHotelBookingStore } from "@/modules/hotel/store/booking.store";
import { Button } from "antd";
import { useRouter } from "next/navigation";

const ViewHotelPriceCard = ({ ratePlans = [], supplierData = {} }) => {
  const router = useRouter();
  const selectedPlan = ratePlans?.[0];
  const detail = selectedPlan?.RatePlanDetails?.[0];
  const room = detail?.RoomDetails?.[0];
  const roomName = room?.GroupName || "Room not available";
  const roomDesc = room?.HotelRoomTypeDesc || "";
  const inclusion = detail?.Inclusion || "";
  const refundable = detail?.Refundable === "True";
  const basicPrice = Number(detail?.BasicAmount || 0);
  const tax = Number(detail?.Tax || 0);
  const totalPrice = Number(selectedPlan?.TotalAmount || 0);
  const moreRooms = Math.max(ratePlans?.length - 1, 0);
  const { setBookingData } = useHotelBookingStore();
  const { requireAuth } = useAuthGuard();
  const handleBookNow = () => {
    if (!selectedPlan || !detail) {
      return;
    }
    console.log("BOOK NOW CLICK");
    console.log("HotelKey in price card", supplierData?.HotelKey);
    console.log("SearchKey in price card", supplierData?.SearchKey);
    console.log("RecommendationID", selectedPlan?.RecommendationID);

    setBookingData({
      ...useHotelBookingStore.getState().bookingData,

      selectedHotel: {
        ...useHotelBookingStore.getState().bookingData?.selectedHotel,

        recommendationId:
          selectedPlan?.RecommendationID || selectedPlan?.RecommendationId,
      },

      supplierData,
      selectedRatePlan: selectedPlan,
      selectedRoom: room,

      pricing: {
        basicAmount: basicPrice,
        tax,
        totalAmount: totalPrice,
      },
    });

    router.push("/hotel-booking");
  };

  const handleRoomScroll = () => {
    const section = document.getElementById("rooms-section");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex h-full min-h-[330px] flex-col rounded border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mt-auto">
        {/* Badge */}
        <div className="mb-3">
          <span
            className={`font-roboto rounded-full px-3 py-[6px] text-[11px] font-medium ${refundable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
              }`}
          >
            {refundable ? "Free Cancellation" : "Non Refundable"}
          </span>
        </div>

        {/* Room */}
        <div>
          <h3 className="font-roboto! line-clamp-2 text-[20px] leading-7 font-bold! text-[#0f172a]">
            {roomName}
          </h3>

          <p className="mb-1! line-clamp-2 text-[14px] leading-6 font-semibold text-gray-500">
            {roomDesc}
          </p>
        </div>

        {/* Inclusion */}
        {!!inclusion && (
          <div className="rounded bg-[#f8fafc] px-3">
            <p className="font-roboto! mb-2 text-[11px] font-bold tracking-wide text-[#0ea5e9] uppercase">
              Included
            </p>

            <ul className="font-roboto! text-[13px] font-semibold text-green-600">
              {inclusion
                ?.split(",")
                ?.map((i) => i.trim())
                ?.filter(Boolean)
                ?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>✓</span>

                    <span className="leading-5">{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Price */}
        <div className="mt-0! rounded border border-gray-100 bg-[#fafafa] px-4">
          <h4 className="font-roboto text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
            Price Details
          </h4>

          <div className="font-roboto space-y-1 text-sm font-semibold">
            {/* Basic */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Basic Price</span>

              <span className="font-medium text-gray-700">
                ₹ {Number(basicPrice || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Tax */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Taxes & Fees</span>

              <span className="font-medium text-gray-700">
                ₹ {Number(tax || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Total */}
            <div className="font-roboto border-t border-dashed pt-3!">
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-semibold text-[#0f172a]">
                    Total Price
                  </span>

                  <p className="mt-1 text-xs text-gray-400">
                    Inclusive of taxes
                  </p>
                </div>

                <h2 className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl leading-none font-bold text-[#0f172a]">
                  ₹ {Number(totalPrice || 0).toLocaleString("en-IN")}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-4 flex gap-3">
        <Button
          type="primary"
          size="large"
          onClick={() => requireAuth(handleBookNow)}
          className="!h-[48px] w-full rounded! bg-[#0f766e]! text-sm font-semibold tracking-wide text-white!"
        >
          Book Now
        </Button>

        <Button
          size="large"
          onClick={handleRoomScroll}
          className="flex-1 !h-[50px] sm:!h-[48px] !rounded px-2 sm:px-4 text-[12px] sm:text-[14px] md:text-[16px] whitespace-normal leading-tight"
        >
          <span className="hidden sm:inline">
            {moreRooms > 0 ? `${moreRooms} More Room Options` : "View Room"}
          </span>

          <span className="sm:hidden">
            {moreRooms > 0 ? `${moreRooms} Rooms` : "View Room"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ViewHotelPriceCard;
