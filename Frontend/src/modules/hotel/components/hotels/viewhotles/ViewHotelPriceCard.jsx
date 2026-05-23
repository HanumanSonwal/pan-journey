"use client";

import { Button } from "antd";

const ViewHotelPriceCard = ({ ratePlans = [] }) => {
  const selectedPlan = ratePlans?.[0];
  const detail = selectedPlan?.RatePlanDetails?.[0];
  const room = detail?.RoomDetails?.[0];
  const roomName = room?.GroupName || "Room not available";
  const roomDesc = room?.HotelRoomTypeDesc || "";
  const inclusion = detail?.Inclusion || "";
  const refundable = detail?.Refundable === "True";
  const totalAmount = selectedPlan?.TotalAmount;
  const tax = selectedPlan?.Tax;
  const moreRooms = Math.max(ratePlans?.length - 1, 0);

  return (
    <div className="flex h-full min-h-[330px] flex-col rounded-3xl border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              refundable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {refundable ? "Free Cancellation" : "Non Refundable"}
          </span>
        </div>

        <h3 className="line-clamp-2 text-[18px] leading-7 font-semibold text-[#0f172a]">
          {roomName}
        </h3>

        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {roomDesc}
        </p>

        {/* Included */}
        {!!inclusion && (
          <div className="rounded-2xl bg-[#f8fafc]">
            <ul className="mt-2 space-y-2 text-sm text-green-600">
              {inclusion
                ?.split(",")
                ?.map((item) => item.trim())
                ?.filter((item) => item.length > 0)
                ?.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="font-semibold">✓</span>

                    <span className="truncate">{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto border-t pt-2">
          <p className="text-[11px] tracking-wide text-gray-400 uppercase">
            Price for stay
          </p>

          <div className="mt-2 flex flex-wrap items-end gap-2">
            <h2 className="text-4xl font-bold text-[#0f172a]">
              ₹{Number(totalAmount || 0).toFixed(0)}
            </h2>

            {!!tax && (
              <span className="mb-1 text-sm text-gray-500">
                incl. ₹{Number(tax).toFixed(0)} taxes
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <Button
          type="primary"
          size="large"
          className="!h-[48px] flex-1 !rounded-2xl"
        >
          Book Now
        </Button>

        <Button size="large" className="!h-[48px] flex-1 !rounded-2xl">
          {moreRooms > 0 ? `${moreRooms} More Room Options` : "View Room"}
        </Button>
      </div>
    </div>
  );
};

export default ViewHotelPriceCard;
