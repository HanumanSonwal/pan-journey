"use client";

import { Button } from "antd";
import Image from "next/image";

const RoomOptions = ({ ratePlans = [] }) => {
  const getHDImage = (url) => {
    if (!url) {
      return "/no-room.jpg";
    }
    return url.replace("_b.", "_z.");
  };

  console.log(ratePlans, "ratePlans in roomOptions");
  return (
    <div className="space-y-6">
      {ratePlans?.map((plan, index) => {
        const detail = plan?.RatePlanDetails?.[0];
        const room = detail?.RoomDetails?.[0];
        const image = getHDImage(room?.HotelGallery?.[0]?.ImageURL);
        const refundable = detail?.Refundable === "True";
        const basicAmount = Number(detail?.BasicAmount || 0);
        const tax = Number(detail?.Tax || 0);
        const totalAmount = Number(
          detail?.TotalAmount || plan?.TotalAmount || 0,
        );
        const serviceFee = Number(detail?.ServiceFeeAmount || 0);
        const gst = Number(detail?.GST || 0);
        const payAtHotel = detail?.PayatHotel;
        const panRequired = detail?.IsPANMandatory === "True";
        const ccRequired = detail?.CCRequired;
        const smoking = room?.SmokingAllowed;

        return (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white text-[#0f172a]! shadow-sm"
          >
            <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-4">
              {/* IMAGE */}
              <div className="relative h-[260px] overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt="room"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>

              {/* ROOM DETAILS */}
              <div className="lg:col-span-2">
                {/* Top Badges */}
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      refundable
                        ? "bg-green-200 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {refundable ? "Free Cancellation" : "Non Refundable"}
                  </span>

                  {detail?.RoomAvailability && (
                    <span className="rounded-full bg-blue-200 px-3 py-1 text-xs text-blue-600">
                      Available
                    </span>
                  )}

                  {payAtHotel ? (
                    <span className="rounded-full bg-purple-200 px-3 py-1 text-xs text-purple-600">
                      Pay at Hotel
                    </span>
                  ) : (
                    <span className="rounded-full bg-orange-200 px-3 py-1 text-xs text-orange-600">
                      Prepaid
                    </span>
                  )}

                  {panRequired && (
                    <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs text-yellow-700">
                      PAN Required
                    </span>
                  )}

                  {ccRequired && (
                    <span className="rounded-full bg-red-200 px-3 py-1 text-xs text-red-600">
                      Credit Card Required
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="mt-3! mb-1! text-2xl font-semibold text-[#0f172a]">
                  {room?.GroupName}
                </h3>

                <p className="mt-1 text-gray-500">{room?.HotelRoomTypeDesc}</p>

                {/* Room Features */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {smoking ? "Smoking Allowed" : "Non Smoking"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {room?.GroupName}
                  </span>
                </div>

                {/* Inclusion */}
                {!!detail?.Inclusion && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {detail?.Inclusion?.split(",")
                      ?.map((i) => i.trim())
                      ?.filter((i) => i.length > 0)
                      ?.map((item, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-600"
                        >
                          ✓ {item}
                        </span>
                      ))}
                  </div>
                )}

                {/* Cancellation */}
                {!!detail?.CancellationPolicy && (
                  <div className="rounded-2xl bg-[#fff7ed] p-3">
                    <p className="text-sm font-semibold text-[#9a3412]">
                      Cancellation Policy
                    </p>

                    <div
                      className="mt-2 text-sm text-[#7c2d12]"
                      dangerouslySetInnerHTML={{
                        __html: detail?.CancellationPolicy,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* PRICE */}
              <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-4">
                <p className="mb-4 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                  Price Breakdown
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Basic Price</span>

                    <span>₹{basicAmount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>

                    <span>₹{tax}</span>
                  </div>

                  {!!gst && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">GST</span>

                      <span>₹{gst}</span>
                    </div>
                  )}

                  {!!serviceFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Fee</span>

                      <span>₹{serviceFee}</span>
                    </div>
                  )}

                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-600">
                        Total Price
                      </span>

                      <span className="text-xl font-bold text-[#0f172a]">
                        ₹{totalAmount}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-gray-500">Taxes included</p>
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  className="!mt-5 !h-[48px] w-full !rounded-2xl"
                >
                  Select Room
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {!ratePlans.length && (
        <div className="rounded-3xl border border-dashed p-8 text-center text-gray-500">
          No rooms available
        </div>
      )}
    </div>
  );
};

export default RoomOptions;
