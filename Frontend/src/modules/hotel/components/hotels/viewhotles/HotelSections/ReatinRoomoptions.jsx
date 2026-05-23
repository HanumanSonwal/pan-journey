"use client";

import { Progress, Tag } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function RatingReviews() {
  const [activeTab, setActiveTab] = useState("Everyone");

  const [currentPage, setCurrentPage] = useState(1);

  const tabs = ["Everyone", "Group", "Couple", "Solo", "Business", "Family"];

  const reviewContent = {
    Everyone: {
      title: "Peaceful.. Surrounded by Serenity",
      location: "Basanth s.",
      rating: 4.3,
      description:
        "The Retreat's Location is in a Peaceful area surrounded by quite Appt complexes n loads of tropical plants trees n greenery.... Surrounded by Serenity. Its proximity to Candolim beach n the Shopping street is absolute blessing... Loads of eatery n cafes just around the corner makes it an ideal place to holiday.",

      images: ["/review1.jpg", "/review2.jpg", "/review3.jpg"],

      travelMonth: "Sep 2025",
      room: "Economy Room without Balcony",
    },

    Group: {
      title: "Excellent Stay for Groups",
      location: "Rahul K.",
      rating: 4.5,
      description:
        "Perfect hotel for group stay. Rooms were spacious and staff was really cooperative. Pool area was amazing and location was near market.",

      images: ["/review2.jpg", "/review3.jpg", "/review1.jpg"],

      travelMonth: "Aug 2025",
      room: "Luxury Suite",
    },

    Couple: {
      title: "Romantic & Peaceful Stay",
      location: "Anjali M.",
      rating: 4.7,
      description:
        "Beautiful property with amazing ambience. Couple friendly hotel and staff behavior was very polite. Food quality was also very good.",

      images: ["/review3.jpg", "/review1.jpg", "/review2.jpg"],

      travelMonth: "Jul 2025",
      room: "Premium Room",
    },

    Solo: {
      title: "Best Solo Experience",
      location: "Karan P.",
      rating: 4.1,
      description:
        "Safe location and clean rooms. Perfect for solo travelers. Staff guided properly and check-in process was smooth.",

      images: ["/review1.jpg", "/review3.jpg", "/review2.jpg"],

      travelMonth: "Jun 2025",
      room: "Single Deluxe Room",
    },

    Business: {
      title: "Perfect Business Hotel",
      location: "Amit S.",
      rating: 4.4,
      description:
        "Fast service, clean rooms and peaceful atmosphere. WiFi speed was excellent and food delivery was quick.",

      images: ["/review2.jpg", "/review1.jpg", "/review3.jpg"],

      travelMonth: "May 2025",
      room: "Executive Room",
    },

    Family: {
      title: "Wonderful Family Stay",
      location: "Neha T.",
      rating: 4.8,
      description:
        "Family friendly hotel with spacious rooms. Kids enjoyed the pool area and hotel staff was very supportive.",

      images: ["/review3.jpg", "/review2.jpg", "/review1.jpg"],

      travelMonth: "Apr 2025",
      room: "Family Suite",
    },
  };

  // ================= CURRENT REVIEW =================
  const currentReview = reviewContent[activeTab];

  return (
    <div className="w-full bg-white px-[22px] py-[20px]">
      {/* HEADING */}
      <h2 className="!mb-[36px] text-[22px] leading-[28px] font-[700] text-[#222]">
        User Rating & Reviews
      </h2>

      {/* TABS */}
      <div className="mb-[24px] flex items-center gap-[78px] overflow-x-auto border-[#ececec] pb-[18px]">
        {tabs.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(item);
              setCurrentPage(index + 1);
            }}
            className={`relative pb-[12px] text-[17px] font-[600] whitespace-nowrap transition-all duration-300 ${
              activeTab === item ? "!text-[#222]" : "!text-[#555]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 gap-[55px] lg:grid-cols-3">
        {/* LEFT */}
        <div>
          {/* OVERALL */}
          <div className="mb-[26px] flex items-center gap-[16px]">
            <div className="flex h-[38px] w-[68px] items-center justify-center rounded-[4px] bg-[#66b7f7] text-[25px] font-[700] text-white shadow-sm">
              4.5
            </div>

            <div>
              <h3 className="text-[18px] leading-[20px] font-[600] text-[#66b7f7]">
                Very Good
              </h3>

              <p className="mt-[4px] text-[11px] font-[400] text-[#666]">
                1233 Ratings, 732 Reviews
              </p>
            </div>
          </div>

          {/* RATING BARS */}
          <div className="s!pace-y-[2px]">
            {["Excellent", "very good", "Average", "Poor", "Bad"].map(
              (item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-[12px]"
                >
                  <p className="w-[68px] text-[14px] font-[400] text-[#444] capitalize">
                    {item}
                  </p>

                  <Progress
                    percent={43}
                    showInfo={false}
                    strokeColor="#66b7f7"
                    size={[180, 6]}
                    className="!mb-[-4px] flex-1"
                  />

                  <span className="text-[14px] text-[#666]">43%</span>
                </div>
              ),
            )}
          </div>

          {/* LAST RATINGS */}
          <div className="mt-[34px]">
            <h3 className="mb-[14px] text-[14px] font-[700] text-[#333]">
              Last 10 Customer Ratings{" "}
              <span className="font-[400] text-[#777]">(Latest First)</span>
            </h3>

            <div className="flex flex-wrap items-center gap-[6px]">
              {[5, 5, 5, 5, 5, 5, 5, 5, 5, 5].map((item, index) => (
                <div
                  key={index}
                  className="flex h-[22px] w-[22px] items-center justify-center rounded-[2px] border border-[#66b7f7] text-[14px] text-[#444]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div>
          <h3 className="!mt-[17px] text-[16px] font-[700] text-[#333]">
            Rating Categories
          </h3>

          <div className="space-y-[1px]">
            {[
              "Location",
              "Cleanliness",
              "Room",
              "Food",
              "Hospitality",
              "Value For Money",
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-[15px] text-[#444]">{item}</p>

                <div className="rounded-[3px] border border-[#66b7f7] px-[11px] py-[2px] text-[14px] text-[#333]">
                  4.3
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="overflow-hidden rounded-[6px] border border-gray-400">
          <div className="border-b border-gray-400 px-[24px] py-[18px]">
            <h3 className="text-[18px] font-[600] text-[#333]">
              What our guests say?
            </h3>
          </div>

          <div className="flex flex-wrap gap-[14px] p-[24px]">
            {[
              "cooperative staff",
              "good room",
              "good room",
              "cooperative staff",
              "cooperative staff",
              "cooperative staff",
            ].map((tag, index) => (
              <Tag
                key={index}
                color="black"
                className="!m-0 !rounded-[4px] !border-green-400 !bg-white !px-[14px] !py-[5px] !text-[12px]"
              >
                {tag} (783)
              </Tag>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEW CARD */}
      <div className="mt-[42px] rounded-[6px] border border-[#dddddd] p-[14px]">
        {/* TOP */}
        <div className="flex items-start gap-[12px]">
          <div className="flex h-[34px] min-w-[54px] items-center justify-center rounded-[3px] border border-[#66b7f7] text-[15px] font-[500] text-[#333]">
            {currentReview.rating}
          </div>

          <div>
            <h3 className="text-[17px] leading-[21px] font-[700] text-[#333]">
              {currentReview.title}
            </h3>

            <p className="mt-[2px] text-[15px] text-[#555]">
              {currentReview.location}
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-[18px] text-[14px] leading-[23px] text-[#444]">
          {currentReview.description}
        </p>

        {/* IMAGES */}
        <div className="mt-[18px] flex flex-wrap gap-[16px]">
          {currentReview.images.map((img, index) => (
            <div
              key={index}
              className="relative h-[134px] w-[210px] overflow-hidden rounded-[6px]"
            >
              <Image src={img} alt="review" fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-[14px]">
          <p className="text-[15px] leading-[30px] text-[#444]">
            <span className="font-[700] text-[#333]">Travel Month:</span>{" "}
            {currentReview.travelMonth}
          </p>

          <p className="text-[15px] leading-[30px] text-[#444]">
            <span className="font-[700] text-[#333]">Room:</span>{" "}
            {currentReview.room}
          </p>

          <button className="mt-[4px] text-[15px] font-[600] !text-[#66b7f7] duration-300 hover:text-[#2d9bf0]">
            Helpful 👍
          </button>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="mt-[34px] flex items-center justify-center gap-[8px]">
        {/* PREV */}
        <button
          onClick={() => {
            if (currentPage > 1) {
              const newPage = currentPage - 1;
              setCurrentPage(newPage);
              setActiveTab(tabs[newPage - 1]);
            }
          }}
          className="flex h-[44px] w-[44px] items-center justify-center rounded-[6px] border border-[#dddddd] text-[22px] text-[#999]"
        >
          ‹
        </button>

        {/* PAGES */}
        {tabs.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentPage(index + 1);
              setActiveTab(item);
            }}
            className={`h-[44px] w-[44px] rounded-[6px] text-[17px] font-[500] transition-all duration-300 ${
              currentPage === index + 1
                ? "bg-[#66b7f7] text-white"
                : "border border-[#dddddd] text-[#666]"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* NEXT */}
        <button
          onClick={() => {
            if (currentPage < tabs.length) {
              const newPage = currentPage + 1;
              setCurrentPage(newPage);
              setActiveTab(tabs[newPage - 1]);
            }
          }}
          className="flex h-[44px] w-[44px] items-center justify-center rounded-[6px] border border-[#dddddd] text-[22px] text-[#999]"
        >
          ›
        </button>
      </div>
    </div>
  );
}
