"use client";

import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  DownloadOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/navigation";
import { useBookingDetails } from "../hooks/useBookingDetails";

dayjs.extend(customParseFormat);

export default function BookingDetailsTab({ bookingRefNo }) {
  const router = useRouter();

  const { data, isLoading } = useBookingDetails(bookingRefNo);

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-8">Loading booking details...</div>
    );
  }

  const bookingData = data || {};
  const hotel = bookingData?.HotelDetails || {};
  const room = bookingData?.HotelRoomDetail?.[0] || {};
  const payment = bookingData?.BookingPaymentDetails?.[0] || {};
  const ratePlan = hotel?.HotelRatePlanDetails || {};

  const baseAmount = Number(ratePlan?.Basic_Amount || 0);
  const taxAmount = Number(ratePlan?.Tax || 0);
  const gatewayCharges = Number(payment?.Gateway_Charges || 0);
  const totalAmount = Number(ratePlan?.Total_Amount || 0);

  const policies = [
    ...(ratePlan?.Inclusion
      ? ratePlan.Inclusion.split(",").map((item) => item.trim())
      : []),
  ];

  const guest = bookingData?.PAXDetails || [];

  const nights = dayjs(bookingData?.CheckOutDate, "DD/MM/YYYY").diff(
    dayjs(bookingData?.CheckInDate, "DD/MM/YYYY"),
    "day",
  );
  return (
    <>
      {/* <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5"> */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 text-gray-900">
        <h2 className="mb-0! text-[24px] font-bold text-gray-900">
          Booking Details
        </h2>

        <button
          onClick={() => router.push("/profile?tab=BookingHistory")}
          className="flex items-center gap-2 text-[15px] font-semibold text-[#72C0F0]!"
        >
          <ArrowLeftOutlined />
          Back
        </button>
      </div>

      <div className="my-2 space-y-3">
        {/* TOP HEADER */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* TITLE */}

          {/* HOTEL INFO */}
          <div className="p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              {/* LEFT */}
              <div className="flex gap-5">
                <img
                  src={hotel?.HotelImage}
                  alt="hotel"
                  className="h-[120px] w-[140px] shrink-0 rounded-xl object-cover"
                />

                <div>
                  <h2 className="text-[20px] leading-tight font-bold text-gray-900">
                    {hotel?.HotelName}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {hotel?.StarCategoryId && (
                      <div className="flex items-center gap-1">
                        {[...Array(Number(hotel?.StarCategoryId || 0))].map(
                          (_, i) => (
                            <StarFilled
                              key={i}
                              className="text-[14px] !text-[#ffb400]"
                            />
                          ),
                        )}
                      </div>
                    )}

                    <div className="rounded-md border border-gray-300 px-3 py-1 text-[13px] text-gray-700">
                      {ratePlan?.PayatHotel ? "Pay At Hotel" : "Prepaid"}
                    </div>
                  </div>

                  <p className="my-4! flex items-center gap-2 text-[16px] text-gray-500">
                    <EnvironmentOutlined />
                    {hotel?.Address}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="h-fit rounded-full border border-[#72C0F0] bg-[#edf7ff] px-4 py-1 text-[13px] font-semibold text-[#72C0F0]">
                {bookingData?.TicketStatusDesc}
              </div>
            </div>
          </div>

          {/* CHECKIN SECTION */}
          <div className="grid grid-cols-1 border-t border-gray-200 md:grid-cols-3">
            {/* CHECK IN */}
            <div className="flex flex-col justify-center p-5">
              <p className="text-[14px] font-medium text-gray-500">Check-in</p>

              <h3 className="mt-1 text-[18px] leading-tight font-bold text-gray-900">
                {bookingData?.CheckInDate}
              </h3>

              <p className="mt-1 text-[16px] leading-none font-medium text-gray-700">
                From {hotel?.CheckInTime || "Hotel Standard Time"}
              </p>

              <p className="mt-2 text-[13px] text-gray-500">
                {bookingData?.Origin}
              </p>
            </div>

            {/* CENTER */}
            <div className="flex flex-col items-center justify-center border-y border-gray-200 px-4 py-5 md:border-x md:border-y-0">
              <div className="relative flex w-full max-w-[90px] items-center justify-center">
                <div className="h-[1px] w-full bg-gray-300"></div>

                <span className="absolute bg-white px-2 text-[18px] text-gray-500">
                  →
                </span>
              </div>

              <div className="mt-3 rounded-full border border-gray-300 bg-gray-50 px-3 py-[4px] text-[14px] leading-none font-medium text-gray-700">
                🌙 {nights} Night{nights > 1 ? "s" : ""}
              </div>
            </div>

            {/* CHECK OUT */}
            <div className="flex flex-col items-start justify-center p-5 md:items-end">
              <p className="text-[14px] font-medium text-gray-500">Check-out</p>

              <h3 className="mt-1 text-[18px] leading-tight font-bold text-gray-900">
                {bookingData?.CheckOutDate}
              </h3>

              <p className="mt-1 text-[16px] leading-none font-medium text-gray-700">
                By {hotel?.CheckOutTime || "Hotel Standard Time"}
              </p>
            </div>
          </div>
        </div>

        {/* ROOM INFO */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}
          <div className="border-b border-gray-200 px-5 py-4 md:px-6">
            <h2 className="mb-0! text-[20px] leading-none font-bold text-gray-900 md:text-[20px]">
              Room & Booking Info
            </h2>
          </div>

          {/* BODY */}
          <div className="p-5 md:p-6">
            {/* PACKAGE */}
            <div className="inline-flex rounded-lg border border-[#d89a00] px-3 py-1.5 text-[13px] font-semibold text-[#d89a00] md:text-[14px]">
              {ratePlan?.Inclusion?.includes("RoomOnly")
                ? "Room Only"
                : "Included Package"}
            </div>

            <div className="mt-6 md:mt-7">
              {/* ROOM TYPE */}
              <h3 className="text-[20px] leading-tight font-bold text-gray-900 md:text-[20px]">
                {ratePlan?.HotelRoomTypeDesc}
              </h3>

              <p className="mt-2 text-[14px] text-gray-600 md:text-[15px]">
                {room?.Adult_Count} Adult
                {Number(room?.Child_Count) > 0
                  ? `, ${room?.Child_Count} Child`
                  : ""}
              </p>

              {/* POLICIES */}
              <div className="mt-6 grid grid-cols-1 gap-x-10 md:mt-7 md:grid-cols-2">
                {policies?.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="mt-[2px] text-[14px] text-gray-700">
                      •
                    </span>

                    <p className="text-[13px] leading-relaxed text-gray-700 md:text-[14px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* DETAILS */}
              <div className="mt-8 grid grid-cols-1 gap-x-10 border-t border-gray-200 pt-7 sm:grid-cols-2">
                {/* GUESTS */}
                <div>
                  <p className="text-[14px] font-medium text-gray-500">
                    Guests
                  </p>

                  <h4 className="mt-1 text-[16px] font-bold text-gray-900 md:text-[16px]">
                    {room?.Adult_Count} Adult
                    {Number(room?.Child_Count) > 0
                      ? `, ${room?.Child_Count} Child`
                      : ""}
                  </h4>

                  <p className="mt-1 text-[14px] text-gray-600">
                    Room {guest?.RoomNo || 1}
                  </p>
                </div>

                {/* BOOKING ID */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Booking ID
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold break-all text-gray-900 md:text-[20px]">
                    {bookingData?.BookingRefNo}
                  </h4>
                </div>

                {/* CONFIRMATION */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Confirmation No.
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[20px]">
                    {bookingData?.VoucherNumber}
                  </h4>
                </div>

                {/* MEAL PLAN */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Meal Plan
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[20px]">
                    {ratePlan?.Inclusion?.includes("RoomOnly")
                      ? "Room Only"
                      : ratePlan?.Inclusion}
                  </h4>
                </div>

                {/* BOOKED ON */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Booked On
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[20px]">
                    {bookingData?.BookingDate}
                  </h4>

                  <p className="mt-1 text-[14px] text-gray-500">
                    via Pan Journey
                  </p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Invoice Number
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[20px]">
                    {bookingData?.InvoiceNumber}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GUEST DETAILS */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}

          <div className="border-b border-gray-200 px-5 py-4 md:px-6">
            <h2 className="mb-0! text-[20px] leading-none font-bold text-gray-900 md:text-[20px]">
              Guest Details
            </h2>
          </div>

          {/* GUEST LIST */}
          <div>
            {bookingData?.PAXDetails?.map((guest, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b border-gray-200 px-5 py-5 last:border-0 md:px-6"
              >
                {/* AVATAR */}
                <div className="h-[52px]md:w-[56px] flex w-[52px] shrink-0 items-center justify-center rounded-full border border-[#d9ecf8] bg-[#edf7ff] text-[15px] font-bold text-[#3b82b6] md:h-[56px] md:text-[16px]">
                  {`${guest?.FirstName?.[0] || ""}${guest?.LastName?.[0] || ""}`}
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  {/* NAME + ROLE */}
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <h3 className="text-[17px] font-bold break-words text-gray-900 md:text-[16px]">
                      {guest?.Title} {guest?.FirstName} {guest?.LastName}
                    </h3>

                    {guest.role && (
                      <span className="ml-[25px] w-fit rounded-full bg-[#edf7ff] px-2.5 py-[3px] !text-[11px] font-medium !text-[#3b82b6]">
                        {guest?.Passengertyp}
                      </span>
                    )}
                  </div>

                  {/* CONTACT */}
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <p className="text-[13px] text-gray-600 md:text-[14px]">
                      Room No: {guest?.RoomNo}
                    </p>

                    <p className="text-[13px] text-gray-600 md:text-[14px]">
                      Guest Type: {guest?.Passengertyp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}
          <div className="border-b border-gray-200 px-5 py-4 md:px-6">
            <h2 className="mb-0! text-[20px] leading-none font-bold text-gray-900 md:text-[20px]">
              Price Breakup
            </h2>
          </div>

          {/* BODY */}
          <div className="p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[14px] text-gray-700 md:text-[15px]">
                Room Charges
              </p>

              <p className="text-[15px] font-semibold text-gray-800 md:text-[16px]">
                ₹{Number(ratePlan?.Basic_Amount || 0).toFixed(2)}
              </p>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <p className="text-[14px] text-gray-700 md:text-[15px]">
                Taxes & Fees
              </p>

              <p className="text-[15px] font-semibold text-gray-800 md:text-[16px]">
                ₹{Number(ratePlan?.Tax || 0).toFixed(2)}
              </p>
            </div>

            {Number(payment?.Gateway_Charges || 0) > 0 && (
              <div className="mb-5 flex items-center justify-between">
                <p className="text-[14px] text-gray-700 md:text-[15px]">
                  Gateway Charges
                </p>

                <p className="text-[15px] font-semibold text-gray-800 md:text-[16px]">
                  ₹{Number(payment?.Gateway_Charges || 0).toFixed(2)}
                </p>
              </div>
            )}

            <div className="mb-5 flex items-center justify-between">
              <p className="text-[14px] text-gray-700 md:text-[15px]">
                Currency
              </p>

              <p className="text-[15px] font-semibold text-gray-800 md:text-[16px]">
                {payment?.Currency_Code || "INR"}
              </p>
            </div>

            {/* TOTAL PAID */}
            <div className="mt-5 border-t border-gray-200 pt-5">
              <div className="flex items-start justify-between gap-4 sm:items-center">
                <div>
                  <p className="mb-2! text-[15px] font-bold text-gray-900 md:text-[18px]">
                    Total Paid
                  </p>

                  <p className="text-[13px] leading-relaxed text-gray-600 md:text-[14px]">
                    Payment Ref:
                    <span className="ml-1 font-medium text-gray-800">
                      {payment?.PaymentConfirmation_Number || "-"}
                    </span>
                  </p>

                  <p className="text-[13px] leading-relaxed text-gray-600 md:text-[14px]">
                    Payment Status:
                    <span className="ml-1 font-medium text-green-600">
                      Paid
                    </span>
                  </p>
                </div>

                <p className="shrink-0 text-right text-[18px] font-bold text-gray-900 md:text-[18px]">
                  ₹{Number(ratePlan?.Total_Amount || 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* MAP */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}

          <div className="border-b border-gray-200 px-5 py-4 md:px-6">
            <h2 className="mb-0! text-[20px] leading-none font-bold text-gray-900 md:text-[20px]">
              Hotel Location
            </h2>
          </div>

          {/* MAP */}
          <div className="p-5 md:p-6">
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <img
                src="images/profileMap.png"
                alt="map"
                className="h-[220px] w-full object-cover sm:h-[260px] md:h-[320px]"
              />
            </div>

            {/* ADDRESS */}
            <div className="mt-4">
              <p className="text-[13px] font-medium text-gray-500 md:text-[14px]">
                Address
              </p>

              <p className="mt-1 text-[14px] leading-relaxed text-gray-700 md:text-[15px]">
                {bookingData?.address}
              </p>
            </div>
          </div>
        </div>

        {/* CANCELLATION */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[1px_4px_4px_4px_#00000014]">
          {/* HEADER */}
          <div className="border-b border-gray-200 px-5 py-4 md:px-6">
            <h2 className="mb-0! text-[20px] leading-none font-bold text-gray-900 md:text-[20px]">
              Cancellation Policy
            </h2>
          </div>

          {/* POLICY LIST */}
          <div>
            {bookingData?.cancellationPolicies?.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 border-b border-gray-200 px-5 py-4 last:border-0 md:px-6"
              >
                {/* ICON */}
                <div className="shrink-0 pt-[2px]">
                  <CheckCircleFilled className="text-[16px] text-[#22c55e]! md:text-[18px]" />
                </div>

                {/* TEXT */}
                <p className="mb-0! text-[14px] leading-[22px] text-gray-900! md:text-[15px]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* DOWNLOAD */}
          <button
            type="button"
            className="flex h-[52px] items-center justify-center gap-2 rounded-xl border border-[#72C0F0] bg-[#edf7ff] text-[14px] font-semibold !text-[#3b82b6] shadow-sm transition-all duration-200 hover:bg-[#72C0F0] hover:!text-white active:scale-[0.98] md:text-[15px]"
          >
            <DownloadOutlined className="text-[16px]" />

            <span>Download Invoice</span>
          </button>

          {/* SHARE */}
          <button
            type="button"
            className="flex h-[52px] items-center justify-center gap-2 rounded-xl border border-[#72C0F0] bg-[#edf7ff] text-[14px] font-semibold text-[#3b82b6]! shadow-sm transition-all duration-200 hover:bg-[#72C0F0]! hover:text-white! active:scale-[0.98] md:text-[15px]"
          >
            <ShareAltOutlined className="text-[16px]" />

            <span>Share Details</span>
          </button>

          {/* CANCEL */}
          <button
            type="button"
            className="flex h-[52px] items-center justify-center gap-2 rounded-xl border border-red-300 bg-red-50 text-[14px] font-semibold !text-red-500 shadow-sm transition-all duration-200 hover:bg-red-500 hover:!text-white active:scale-[0.98] md:text-[15px]"
          >
            <span>Cancel Booking</span>
          </button>
        </div>
      </div>
    </>
  );
}
