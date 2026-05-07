"use client";

import {
  CoffeeOutlined,
  HomeOutlined,
  SkinOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useState } from "react";
import RatingReviews from "./ReatinRoomoptions";
import Roomoptionslocation from "./Roomoptionslocation";


export default function RoomOptions() {
  const [open, setOpen] = useState(false);

  const packages = [
    {
      title: "Room with Breakfast",
      tag: "Super Package",
      features: [
        "Free stay for 1 children",
        "Complimentary INR 300 Hotel Credit",
        "10% off Airport Transfer",
        "15% off Laundry",
        "Free Breakfast",
        "Non-Refundable",
      ],
      price: "₹1,861",
      oldPrice: "₹7,749",
    },
    {
      title: "Room with Breakfast + Lunch/Dinner",
      features: [
        "Free stay for 1 children",
        "Breakfast included",
        "Lunch/Dinner included",
        "Non-Refundable",
      ],
      price: "₹1,861",
      oldPrice: "₹7,749",
    },
  ];

  return (
    <>
    <div className="bg-[#f6f8fb] p-4">

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-white border rounded-xl shadow-sm overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#e8d9b5] text-[#3a3a3a] font-semibold text-[18px] px-5 py-3">
          Enjoy Exclusive Benefits In A Super Package Deal
        </div>

        <div className="grid md:grid-cols-3">

          {/* LEFT */}
          <div className="p-5 border-r">

            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
              className="w-full h-[220px] object-cover rounded-lg"
            />

            <h2 className="text-[20px] font-bold mt-4 text-[#222]">
              Suite with Balcony
            </h2>

            <div className="mt-3 space-y-1 text-[14px] text-gray-600">
              <p>291 sq.ft (27 sq.mt)</p>
              <p>City View</p>
              <p>1 Double Bed</p>
              <p>1 Bathroom</p>
            </div>

            {/* ICON FEATURES */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-[13px] text-gray-700">
              <p><HomeOutlined /> Study Room</p>
              <p><SkinOutlined /> Laundry</p>
              <p><CoffeeOutlined /> Dining</p>
              <p><WifiOutlined /> Wi-Fi</p>
            </div>

            <p
              onClick={() => setOpen(true)}
              className="mt-4 text-[#0071c2] text-[14px] cursor-pointer border-b border-dotted w-fit"
            >
              More Details
            </p>
          </div>

          {/* RIGHT */}
          <div className="col-span-2 p-5">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between border-b py-5"
              >
                {/* DETAILS */}
                <div>
                  {pkg.tag && (
                    <span className="border border-[#f5a623] text-[#f5a623] text-[12px] px-3 py-1 rounded-md font-medium">
                      {pkg.tag}
                    </span>
                  )}

                  <h2 className="text-[20px] font-bold mt-2 text-[#222]">
                    {pkg.title}
                  </h2>

                  <ul className="mt-3 space-y-1 text-[14px] text-gray-600">
                    {pkg.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>

                  {/* SAME MODAL FOR ALL */}
                  <p
                    onClick={() => setOpen(true)}
                    className="mt-3 text-[#0071c2] text-[14px] cursor-pointer border-b border-dotted w-fit"
                  >
                    More Details
                  </p>
                </div>

                {/* PRICE */}
                <div className="text-right mt-4 md:mt-0 min-w-[180px]">

                  <p className="line-through text-[14px] text-gray-400">
                    {pkg.oldPrice}
                  </p>

                  <p className="text-[26px] font-bold text-[#222]">
                    {pkg.price}
                  </p>

                  <p className="text-[13px] text-gray-500">
                    + ₹576 taxes & fees / night
                  </p>

                  <Button
                    type="primary"
                    className="mt-4 !bg-[#5fa8d3] hover:!bg-[#4c94bf] !border-none !h-[40px] !px-6"
                  >
                    Select Package
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECOND CARD (FIXED SAME MODAL + SPACING) */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row mt-6">

        {/* LEFT */}
        <div className="md:w-1/3 p-5 border-r">
          <img
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
            className="w-full h-48 object-cover rounded-lg"
          />

          <h2 className="text-xl font-bold mt-3 text-[#222]">
            Suite with Balcony
          </h2>

          <div className="text-gray-600 text-sm mt-2 space-y-1">
            <p>291 sq.ft</p>
            <p>City View</p>
            <p>1 Double Bed</p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-[#0071c2] text-sm mt-3 border-b border-dotted"
          >
            More Details
          </button>
        </div>

        {/* RIGHT */}
        <div className="md:w-2/3 p-5">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between border-b py-4"
            >
              <div>
                <h3 className="text-lg font-bold text-[#222]">
                  {pkg.title}
                </h3>

                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  {pkg.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>

                <p
                  onClick={() => setOpen(true)}
                  className="mt-2 text-[#0071c2] text-sm border-b border-dotted cursor-pointer w-fit"
                >
                  More Details
                </p>
              </div>

              <div className="text-right mt-4 md:mt-0">
                <p className="text-gray-400 line-through text-sm">
                  {pkg.oldPrice}
                </p>

                <h2 className="text-2xl font-bold text-[#222]">
                  {pkg.price}
                </h2>

                <Button
                  type="primary"
                  className="mt-3 !bg-[#5fa8d3] hover:!bg-[#4c94bf]"
                >
                  Select Package
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL MODAL */}
      <Modal
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        title="Room Details"
      >
        <p className="text-[14px] text-gray-600">
          Detailed info about room, facilities, cancellation, etc.
        </p>
         
      </Modal>
      </div>
      <Roomoptionslocation/>
<RatingReviews/>
   
    </>
  );
}
