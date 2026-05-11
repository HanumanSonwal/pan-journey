"use client";

import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  DownloadOutlined,
  EnvironmentOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";

const bookingData = {
  hotelName: "Valentines Retreat- Near Candolim Beach",
  status: "Completed",
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  address: "Sequeira waddo, Candolim, Bardez Goa, Goa, India",
  checkIn: "18 Feb '25, Tue",
  checkOut: "21 Feb '25, Fri",
  checkInTime: "02:00 PM",
  checkOutTime: "11:00 AM",
  city: "Jaipur, Rajasthan",
  nights: "3 Nights",
  guests: "2 Adults",
  rooms: "1 Room",
  bookingId: "HTL8830291045",
  confirmation: "9876543210",
  bookedOn: "10 Feb '25",
  mealPlan: "Breakfast Included",
  rating: 5,
  roomType: "Suite with Balcony",
  roomGuests: "2 Adults, 1 Child",

  policies: [
    "Free stay for 1 children",
    "Complimentary INR 300 Hotel Credit redeemable on Food",
    "10% off on One-way Airport Transfer",
    "15% Off on Laundry service",
    "Free Breakfast",
    "Existing bed(s) can accommodate all the guests",
    "Non-Refundable",
  ],

  guestDetails: [
    {
      name: "Rahul Kumar",
      role: "Primary Guest",
      phone: "+91 98765 43210",
      email: "rahul.kumar@email.com",
    },

    {
      name: "Priya Kumar",
      role: "Co-guest",
    },
  ],

  cancellationPolicies: [
    "Free cancellation before 15 Feb '25, 11:59 PM",
    "50% charge for cancellation between 16–17 Feb '25",
    "Non-refundable on or after 18 Feb '25 (check-in date)",
    "Modification allowed up to 48 hours before check-in",
  ],

  priceBreakup: [
    {
      label: "Room charges (3 nights × ₹8,500)",
      value: "₹25,500",
    },
    {
      label: "Taxes & service charges (18%)",
      value: "₹2,240",
    },
    {
      label: "Coupon discount (LEELA10)",
      value: "- ₹1,500",
    },
  ],
};

export default function BookingDetailsTab({ booking, onBack }) {
  if (!booking) {
    return null;
  }
  return (
    <>
      {/* <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5"> */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 text-gray-900">
        <h2 className="mb-0! text-[24px] font-bold text-gray-900">
          Booking Details
        </h2>

        <button
          onClick={onBack}
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
                  src={bookingData.image}
                  alt="hotel"
                  className="h-[120px] w-[140px] shrink-0 rounded-xl object-cover"
                />

                <div>
                  <h2 className="text-[20px] leading-tight font-bold text-gray-900">
                    {bookingData.hotelName}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(bookingData.rating)].map((_, i) => (
                        <StarFilled
                          key={i}
                          className="text-[14px] !text-[#ffb400]"
                        />
                      ))}
                    </div>

                    <div className="rounded-md border border-gray-300 px-3 py-1 text-[13px] text-gray-700">
                      Couple Friendly
                    </div>
                  </div>

                  <p className="my-4! flex items-center gap-2 text-[16px] text-gray-500">
                    <EnvironmentOutlined />
                    {bookingData.address}
                  </p>
                </div>
              </div>

              {/* STATUS */}
              <div className="h-fit rounded-full border border-[#72C0F0] bg-[#edf7ff] px-4 py-1 text-[13px] font-semibold text-[#72C0F0]">
                {bookingData.status}
              </div>
            </div>
          </div>

          {/* CHECKIN SECTION */}
          <div className="grid grid-cols-1 border-t border-gray-200 md:grid-cols-3">
            {/* CHECK IN */}
            <div className="flex flex-col justify-center p-5">
              <p className="text-[14px] font-medium text-gray-500">Check-in</p>

              <h3 className="mt-1 text-[18px] leading-tight font-bold text-gray-900">
                {bookingData.checkIn}
              </h3>

              <p className="mt-1 text-[16px] leading-none font-medium text-gray-700">
                From {bookingData.checkInTime}
              </p>

              <p className="mt-2 text-[13px] text-gray-500">
                {bookingData.city}
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
                🌙 {bookingData.nights}
              </div>
            </div>

            {/* CHECK OUT */}
            <div className="flex flex-col items-start justify-center p-5 md:items-end">
              <p className="text-[14px] font-medium text-gray-500">Check-out</p>

              <h3 className="mt-1 text-[18px] leading-tight font-bold text-gray-900">
                {bookingData.checkOut}
              </h3>

              <p className="mt-1 text-[16px] leading-none font-medium text-gray-700">
                By {bookingData.checkOutTime}
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
              Super Package
            </div>

            <div className="mt-6 md:mt-7">
              {/* ROOM TYPE */}
              <h3 className="text-[20px] leading-tight font-bold text-gray-900 md:text-[20px]">
                {bookingData.roomType}
              </h3>

              <p className="mt-2 text-[14px] text-gray-600 md:text-[15px]">
                {bookingData.roomGuests}
              </p>

              {/* POLICIES */}
              <div className="mt-6 grid grid-cols-1 gap-x-10 md:mt-7 md:grid-cols-2">
                {bookingData?.policies?.map((item, index) => (
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
                    {bookingData.guests}
                  </h4>

                  <p className="mt-1 text-[14px] text-gray-600">
                    {bookingData.rooms}
                  </p>
                </div>

                {/* BOOKING ID */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Booking ID
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold break-all text-gray-900 md:text-[20px]">
                    {bookingData.bookingId}
                  </h4>
                </div>

                {/* CONFIRMATION */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Confirmation No.
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[20px]">
                    CNF {bookingData.confirmation}
                  </h4>
                </div>

                {/* MEAL PLAN */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Meal Plan
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[20px]">
                    {bookingData.mealPlan}
                  </h4>
                </div>

                {/* BOOKED ON */}
                <div>
                  <p className="text-[13px] font-medium text-gray-500">
                    Booked On
                  </p>

                  <h4 className="mt-1 text-[18px] font-bold text-gray-900 md:text-[20px]">
                    {bookingData.bookedOn}
                  </h4>

                  <p className="mt-1 text-[14px] text-gray-500">
                    via Pan Journey
                  </p>
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
            {bookingData?.guestDetails?.map((guest, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b border-gray-200 px-5 py-5 last:border-0 md:px-6"
              >
                {/* AVATAR */}
                <div className="h-[52px]md:w-[56px] flex w-[52px] shrink-0 items-center justify-center rounded-full border border-[#d9ecf8] bg-[#edf7ff] text-[15px] font-bold text-[#3b82b6] md:h-[56px] md:text-[16px]">
                  {guest.name
                    ?.split(" ")
                    ?.map((n) => n[0])
                    ?.join("")}
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  {/* NAME + ROLE */}
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <h3 className="text-[17px] font-bold break-words text-gray-900 md:text-[16px]">
                      {guest.name}
                    </h3>

                    {guest.role && (
                      <span className="text-[#3b82b6]text-[11px] w-fit rounded-full bg-[#edf7ff] px-2.5 py-[3px] font-medium">
                        {guest.role}
                      </span>
                    )}
                  </div>

                  {/* CONTACT */}
                  <div className="flex flex-wrap items-center gap-2">
                    {guest.phone && (
                      <p className="text-[13px] text-gray-700 md:text-[14px]">
                        {guest.phone}
                      </p>
                    )}

                    {guest.phone && guest.email && (
                      <span className="text-gray-400">,</span>
                    )}

                    {guest.email && (
                      <p className="text-[13px] break-all text-gray-500 md:text-[14px]">
                        {guest.email}
                      </p>
                    )}
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
            {bookingData?.priceBreakup?.map((item, index) => {
              const isDiscount =
                item.label?.toLowerCase().includes("discount") ||
                item.value?.includes("-");

              return (
                <div
                  key={index}
                  className={`flex items-start justify-between gap-4 sm:items-center ${
                    item.total ? "mt-5 border-t border-gray-200 pt-5" : "mb-5"
                  }`}
                >
                  {/* LABEL */}
                  <p
                    className={`leading-relaxed ${
                      item.total
                        ? "text-[18px] font-bold text-gray-900 md:text-[20px]"
                        : isDiscount
                          ? "text-[14px] text-gray-700 md:text-[15px]"
                          : "text-[14px] text-gray-700 md:text-[15px]"
                    }`}
                  >
                    {item.label}
                  </p>

                  {/* VALUE */}
                  <p
                    className={`shrink-0 text-right leading-none ${
                      item.total
                        ? "text-[18px] font-bold text-gray-900 md:text-[18px]"
                        : isDiscount
                          ? "text-[15px] font-semibold text-[#22c55e] md:text-[16px]"
                          : "text-[15px] font-semibold text-gray-800 md:text-[16px]"
                    }`}
                  >
                    {item.value}
                  </p>
                </div>
              );
            })}

            {/* TOTAL PAID SECTION */}
            <div className="mt-5 border-t border-gray-200 pt-5">
              <div className="flex items-start justify-between gap-4 sm:items-center">
                <div>
                  <p className="mb-2! text-[15px] font-bold text-gray-900 md:text-[18px]">
                    Total Paid
                  </p>

                  <p className="mt-2 text-[13px] leading-relaxed text-gray-600 md:text-[14px]">
                    Paid via{" "}
                    <span className="font-semibold text-gray-800">
                      HDFC Credit Card
                    </span>{" "}
                    ending ••••7823
                  </p>
                </div>

                <p className="shrink-0 text-right text-[18px] font-bold text-gray-900 md:text-[18px]">
                  ₹27,540
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
                {bookingData.address}
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
