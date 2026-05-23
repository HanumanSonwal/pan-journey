"use client";

import { Button } from "antd";

const ViewHotelPriceCard = ({ ratePlans = [], onBookNow }) => {
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
            className={`rounded-full px-3 py-[6px] text-[11px] font-medium ${
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
          <h3 className="line-clamp-2 text-[20px] leading-7 font-semibold text-[#0f172a]">
            {roomName}
          </h3>

          <p className="mt-1 line-clamp-2 text-[14px] leading-6 text-gray-500">
            {roomDesc}
          </p>
        </div>

        {/* Inclusion */}
        {!!inclusion && (
          <div className="mt-4 rounded bg-[#f8fafc] p-3">
            <p className="mb-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase">
              Included
            </p>

            <ul className="space-y-2 text-[13px] text-green-600">
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
        <div className="mt-4 rounded border border-gray-100 bg-[#fafafa] p-4">
          <h4 className="mb-3 text-[12px] font-semibold tracking-wide text-gray-500 uppercase">
            Price Details
          </h4>

          <div className="space-y-3 text-sm">
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
            <div className="border-t border-dashed pt-3">
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
          className="!h-[48px] flex-1 !rounded !border-0 !shadow-md hover:!opacity-95"
          style={{
            background: "linear-gradient(180deg, #72C0F0 0%, #0F6A75 100%)",
          }}
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
