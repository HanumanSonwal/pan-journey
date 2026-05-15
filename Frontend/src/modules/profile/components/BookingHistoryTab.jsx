"use client";

import {
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  StarFilled,
} from "@ant-design/icons";

import { Input } from "antd";
import { useMemo, useState } from "react";

const bookings = [
  {
    id: 1,
    hotelName: "The Leela Palace, Jaipur",
    status: "Completed",
    room: "Deluxe Room",
    bookingId: "HTL8830291045",
    checkIn: "18 Feb '25, Tue",
    checkOut: "21 Feb '25, Fri",
    checkInTime: "02:00 PM",
    checkOutTime: "11:00 AM",
    city: "Jaipur, Rajasthan",
    nights: "3 Nights",
    confirmation: "9876543210",
    rating: 5,
  },

  {
    id: 2,
    hotelName: "The Oberoi Udaivilas",
    status: "Completed",
    room: "Luxury Suite",
    bookingId: "HTL8830291046",
    checkIn: "12 Mar '25, Wed",
    checkOut: "15 Mar '25, Sat",
    checkInTime: "01:00 PM",
    checkOutTime: "11:00 AM",
    city: "Udaipur, Rajasthan",
    nights: "3 Nights",
    confirmation: "9876543211",
    rating: 4,
  },

  {
    id: 3,
    hotelName: "Taj Lake Palace",
    status: "Completed",
    room: "Premium Room",
    bookingId: "HTL8830291047",
    checkIn: "20 Apr '25, Sun",
    checkOut: "22 Apr '25, Tue",
    checkInTime: "01:00 PM",
    checkOutTime: "11:00 AM",
    city: "Udaipur, Rajasthan",
    nights: "2 Nights",
    confirmation: "9876543212",
    rating: 5,
  },
];

export default function BookingHistoryTab({ setSelectedBooking }) {
  const [activeFilter, setActiveFilter] = useState("Completed");

  const [search, setSearch] = useState("");

  // FILTER + SEARCH
  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      const matchesFilter = item.status === activeFilter;

      const matchesSearch =
        item.hotelName.toLowerCase().includes(search.toLowerCase()) ||
        item.bookingId.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const tabs = [
    {
      label: "Upcoming",
      icon: <ClockCircleOutlined />,
    },
    {
      label: "Cancelled",
      icon: <CloseCircleOutlined />,
    },
    {
      label: "Completed",
      icon: <CheckCircleFilled />,
    },
  ];

  return (
    <>
      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 text-gray-900">
        <h2 className="mb-0! text-[24px] font-bold text-gray-900">
          {" "}
          Booking History
        </h2>
      </div>

      {/* FILTER BAR */}
      <div className="border-gray-200 px-6 py-3 text-gray-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* FILTERS */}
          <div className="flex flex-wrap items-center gap-6">
            {tabs.map((tab) => {
              const active = activeFilter === tab.label;

              return (
                <button
                  key={tab.label}
                  onClick={() => setActiveFilter(tab.label)}
                  className={`flex items-center gap-2 text-[16px] font-medium transition-all ${
                    active
                      ? "text-[#4A9BB5]!"
                      : "text-gray-700 hover:text-[#4A9BB5]"
                  } `}
                >
                  <span className="text-[15px]">{tab.icon}</span>

                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* SEARCH */}
          <div className="w-full lg:w-[320px]">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search For Bookings"
              variant="outlined"
              className="h-10! rounded"
            />
          </div>
        </div>
      </div>

      {/* LIST */}
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-[1px_4px_4px_4px_#00000014]"> */}
      <div className="flex flex-col gap-4 bg-[#edf7ff]">
        {filteredBookings.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-14 text-center">
            <p className="text-[18px] font-semibold text-gray-700">
              No Bookings Found
            </p>

            <p className="mt-2 text-[14px] text-gray-500">
              Try changing filters or search
            </p>
          </div>
        ) : (
          filteredBookings.map((item) => (
            <div
              key={item?.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[1px_4px_4px_4px_#00000010]"
            >
              {/* TOP */}
              <div className="flex flex-col gap-5 p-5 xl:flex-row xl:items-center xl:justify-between">
                {/* LEFT */}
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  {/* ICON */}
                  <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-xl bg-[#edf7ff]">
                    <CalendarOutlined className="text-[30px] text-[#72C0F0]!" />
                  </div>

                  {/* INFO */}
                  <div className="min-w-0">
                    <h3 className="truncate text-[20px] leading-tight font-bold text-gray-900">
                      {item?.hotelName}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {/* STATUS */}
                      <div className="rounded-full border border-[#72C0F0] bg-[#edf7ff] px-3 py-[3px] text-[10px] font-medium text-[#72C0F0]">
                        {item?.status}
                      </div>

                      {/* STARS */}
                      <div className="flex items-center gap-1">
                        {[...Array(item?.rating)].map((_, i) => (
                          <StarFilled
                            key={i}
                            className="text-[14px] !text-[#ffb400]"
                          />
                        ))}
                      </div>

                      {/* ROOM */}
                      <span className="text-[15px] font-medium text-gray-700">
                        {item?.room}
                      </span>

                      {/* ID */}
                      <span className="text-[14px] text-gray-500">
                        ID:{" "}
                        <span className="font-medium text-gray-700">
                          {item?.bookingId}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* VIEW BUTTON */}
                <button className="h-[40px] w-[150px] rounded-lg bg-[#72C0F0] text-[15px] font-semibold text-white md:w-[120px] md:text-[14px] lg:w-[150px]">
                  View Booking
                </button>
              </div>

              {/* BOTTOM */}
              <div className="grid grid-cols-1 border-t border-gray-200 md:grid-cols-4">
                {/* CHECK IN */}
                <div className="border-b border-gray-200 p-5 md:border-r md:border-b-0">
                  <p className="mb-2 text-[14px] text-gray-500">Check-in</p>

                  <h4 className="text-[15px] font-bold text-gray-900">
                    {item?.checkIn}
                  </h4>

                  <p className="mt-2 text-[14px] text-gray-600">
                    From {item?.checkInTime}
                  </p>

                  <p className="mt-1 text-[14px] text-gray-700">{item?.city}</p>
                </div>

                {/* CHECK OUT */}
                <div className="border-b border-gray-200 p-5 md:border-r md:border-b-0">
                  <p className="mb-2 text-[14px] text-gray-500">Check-out</p>

                  <h4 className="text-[15px] font-bold text-gray-900">
                    {item?.checkOut}
                  </h4>

                  <p className="mt-2 text-[14px] text-gray-600">
                    By {item?.checkOutTime}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-gray-300 px-3 py-[3px] text-[13px] text-gray-700">
                    🌙 {item?.nights}
                  </div>
                </div>

                {/* CONFIRMATION */}
                <div className="border-b border-gray-200 p-5 md:border-r md:border-b-0">
                  <p className="mb-2 text-[14px] text-gray-500">
                    Confirmation No.
                  </p>

                  <h4 className="text-[15px] font-bold text-gray-900">
                    CNF {item?.confirmation}
                  </h4>
                </div>

                {/* DOWNLOAD */}
                <div className="flex items-center justify-center p-5">
                  <button className="flex h-[40px] min-w-[190px] items-center justify-center gap-2 rounded-lg border border-[#244734] px-4 text-[12px] font-medium text-[#244734]! transition-all hover:bg-[#244734] hover:text-white!">
                    <DownloadOutlined />
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* </div> */}
    </>
  );
}
