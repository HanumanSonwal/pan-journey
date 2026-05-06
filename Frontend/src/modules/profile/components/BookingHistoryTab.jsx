"use client";

import {
  CalendarOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  SearchOutlined,
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
    status: "Upcoming",
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
    status: "Cancelled",
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

export default function BookingHistoryTab({
  setActiveTab,
}) {
  const [activeFilter, setActiveFilter] =
    useState("Completed");

  const [search, setSearch] =
    useState("");

  // FILTER + SEARCH
  const filteredBookings =
    useMemo(() => {
      return bookings.filter((item) => {
        const matchesFilter =
          item.status === activeFilter;

        const matchesSearch =
          item.hotelName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.bookingId
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        return (
          matchesFilter &&
          matchesSearch
        );
      });
    }, [activeFilter, search]);

  const tabs = [
    {
      label: "Upcoming",
      icon: (
        <ClockCircleOutlined />
      ),
    },
    {
      label: "Cancelled",
      icon: (
        <CloseCircleOutlined />
      ),
    },
    {
      label: "Completed",
      icon: (
        <CheckCircleFilled />
      ),
    },
  ];

  return (
    <div >

      {/* HEADER */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-200">

        <h2 className="text-[30px] font-bold text-gray-900 leading-none">
          Booking History
        </h2>
      </div>

      {/* FILTER BAR */}
<div className="px-6 py-4 border-b border-gray-200 bg-[#f8fbff] text-gray-900">

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

    {/* FILTERS */}
    <div className="flex items-center gap-6 flex-wrap">

      {tabs.map((tab) => {
        const active =
          activeFilter ===
          tab.label;

        return (
          <button
            key={tab.label}
            onClick={() =>
              setActiveFilter(
                tab.label
              )
            }
            className={`
              flex items-center gap-2
              text-[16px] font-medium
              transition-all

              ${
                active
                  ? "text-[#4A9BB5]"
                  : "text-gray-700 hover:text-[#4A9BB5]"
              }
            `}
          >
            <span className="text-[15px]">
              {tab.icon}
            </span>

            {tab.label}
          </button>
        );
      })}
    </div>

    {/* SEARCH */}
    <div className="w-full lg:w-[320px]">

      <Input
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="Search For Bookings"
        prefix={
          <SearchOutlined className="text-gray-400" />
        }
        variant="outlined"
        className="!h-[44px] !rounded-lg"
      />
    </div>
  </div>
</div>

      {/* LIST */}
      <div className="bg-[#edf7ff] p-4 flex flex-col gap-4">

        {filteredBookings.length ===
        0 ? (
          <div className="bg-white rounded-xl border border-gray-200 py-14 text-center">

            <p className="text-[18px] font-semibold text-gray-700">
              No Bookings Found
            </p>

            <p className="text-[14px] text-gray-500 mt-2">
              Try changing filters
              or search
            </p>
          </div>
        ) : (
          filteredBookings.map(
            (item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[1px_4px_4px_4px_#00000010]"
              >
                {/* TOP */}
                <div className="p-5 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                  {/* LEFT */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">

                    {/* ICON */}
                    <div className="w-[56px] h-[56px] rounded-xl bg-[#edf7ff] flex items-center justify-center shrink-0">

                      <CalendarOutlined className="text-[#72C0F0] text-[28px]" />
                    </div>

                    {/* INFO */}
                    <div className="min-w-0">

                      <h3 className="text-[30px] font-bold text-gray-900 leading-tight truncate">
                        {item.hotelName}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 mt-2">

                        {/* STATUS */}
                        <div className="px-3 py-[3px] rounded-full border border-[#72C0F0] bg-[#edf7ff] text-[#72C0F0] text-[13px] font-medium">
                          {item.status}
                        </div>

                        {/* STARS */}
                        <div className="flex items-center gap-1">

                          {[
                            ...Array(
                              item.rating
                            ),
                          ].map(
                            (_, i) => (
                              <StarFilled
                                key={
                                  i
                                }
                                className="!text-[#ffb400] text-[14px]"
                              />
                            )
                          )}
                        </div>

                        {/* ROOM */}
                        <span className="text-[15px] text-gray-700 font-medium">
                          {item.room}
                        </span>

                        {/* ID */}
                        <span className="text-[14px] text-gray-500">
                          ID:{" "}
                          <span className="text-gray-700 font-medium">
                            {
                              item.bookingId
                            }
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* VIEW BUTTON */}
                  <button
                    onClick={() =>
                      setActiveTab(
                        "booking-details"
                      )
                    }
                    className="min-w-[150px] h-[46px] rounded-lg bg-[#72C0F0] hover:bg-[#5ab3ea] transition-all text-white text-[15px] font-semibold px-5"
                  >
                    View Booking
                  </button>
                </div>

                {/* BOTTOM */}
                <div className="border-t border-gray-200 grid grid-cols-1 md:grid-cols-4">

                  {/* CHECK IN */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-gray-200">

                    <p className="text-[14px] text-gray-500 mb-2">
                      Check-in
                    </p>

                    <h4 className="text-[20px] font-bold text-gray-900">
                      {item.checkIn}
                    </h4>

                    <p className="text-[14px] text-gray-600 mt-2">
                      From{" "}
                      {
                        item.checkInTime
                      }
                    </p>

                    <p className="text-[14px] text-gray-700 mt-1">
                      {item.city}
                    </p>
                  </div>

                  {/* CHECK OUT */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-gray-200">

                    <p className="text-[14px] text-gray-500 mb-2">
                      Check-out
                    </p>

                    <h4 className="text-[20px] font-bold text-gray-900">
                      {item.checkOut}
                    </h4>

                    <p className="text-[14px] text-gray-600 mt-2">
                      By{" "}
                      {
                        item.checkOutTime
                      }
                    </p>

                    <div className="inline-flex items-center gap-1 mt-3 px-3 py-[3px] rounded-full border border-gray-300 text-[13px] text-gray-700">
                      🌙 {item.nights}
                    </div>
                  </div>

                  {/* CONFIRMATION */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-gray-200">

                    <p className="text-[14px] text-gray-500 mb-2">
                      Confirmation
                      No.
                    </p>

                    <h4 className="text-[22px] font-bold text-gray-900">
                      CNF{" "}
                      {
                        item.confirmation
                      }
                    </h4>
                  </div>

                  {/* DOWNLOAD */}
                  <div className="p-5 flex items-center justify-center">

                    <button className="min-w-[190px] h-[44px] rounded-lg border border-[#244734] text-[#244734] hover:bg-[#244734] hover:text-white transition-all text-[14px] font-medium flex items-center justify-center gap-2 px-4">
                      <DownloadOutlined />

                      Download Invoice
                    </button>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}