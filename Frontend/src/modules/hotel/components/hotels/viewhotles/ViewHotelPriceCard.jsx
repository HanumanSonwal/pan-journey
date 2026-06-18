"use client";

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
            className={`rounded-full px-3 py-[6px] text-[11px] font-medium font-roboto ${
              refundable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {refundable ? "Free Cancellation" : "Non Refundable"}
          </span>
        </div>

        {/* Room */}
        <div>
          <h3 className="line-clamp-2 text-[20px] leading-7  text-[#0f172a] font-bold! font-roboto!">
            {roomName}
          </h3>

          <p className="mb-1! line-clamp-2 text-[14px] font-semibold leading-6 text-gray-500">
            {roomDesc}
          </p>
        </div>

        {/* Inclusion */}
        {!!inclusion && (
          <div className=" rounded bg-[#f8fafc] px-3">
            <p className="mb-2 text-[11px] font-bold font-roboto! tracking-wide text-[#0ea5e9] uppercase">
              Included
            </p>

            <ul className=" text-[13px] font-semibold font-roboto! text-green-600">
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
          <h4 className=" text-[12px] font-semibold tracking-wide text-gray-500 uppercase font-roboto">
            Price Details
          </h4>

          <div className="space-y-1 text-sm font-semibold font-roboto">
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
            <div className="border-t border-dashed pt-3! font-roboto">
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-semibold text-[#0f172a]">
                    Total Price
                  </span>

                  <p className="mt-1 text-xs text-gray-400">
                    Inclusive of taxes
                  </p>
                </div>

                <h2 className="text-[30px] leading-none font-bold text-[#0f172a]">
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
          onClick={handleBookNow}
          className="!h-[48px] w-full rounded! bg-[#0f766e]! text-sm font-semibold tracking-wide text-white!"
        >
          Book Now
        </Button>

        <Button
          size="large"
          onClick={handleRoomScroll}
          className="!h-[48px] flex-1 !rounded"
        >
          {moreRooms > 0 ? `${moreRooms} More Room Options` : "View Room"}
        </Button>
      </div>
    </div>
  );
};

export default ViewHotelPriceCard;
