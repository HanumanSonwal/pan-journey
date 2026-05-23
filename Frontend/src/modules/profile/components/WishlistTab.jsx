"use client";

import {
  CheckOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card, message } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* HYDRATION ERROR FIX */
const ImageGallery = dynamic(() => import("./ImageGallery"), {
  ssr: false,
});

const dummyWishlist = [
  {
    id: 1,
    name: "Ginger Goa, Panjim",
    location: "Panjim",
    description: "About a minute walk to Arambol Beach",
    rating: 3.7,
    reviews: 66,
    price: 404,
    oldPrice: 760,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
    ],
    tags: ["Couple Friendly", "24 Hr. Room Service", "Free WiFi"],
    features: [
      "Free Cancellation",
      "Book @ ₹0 available",
      "Breakfast available at extra charges",
      "Cashback On First Booking",
    ],
  },

  {
    id: 2,
    name: "Radisson Blu Goa",
    location: "Goa",
    description: "2 min walk to Baga Beach",
    rating: 4.2,
    reviews: 120,
    price: 699,
    oldPrice: 1299,
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    tags: ["Swimming Pool", "Free Breakfast", "Free WiFi"],
    features: [
      "Free Cancellation",
      "Book @ ₹0 available",
      "Breakfast Included",
      "Special Discount Available",
    ],
  },

  {
    id: 3,
    name: "The Ocean Resort",
    location: "Panjim",
    description: "Near Candolim Beach",
    rating: 4.5,
    reviews: 210,
    price: 999,
    oldPrice: 1599,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    ],
    tags: ["Beach View", "Luxury Room", "Free WiFi"],
    features: [
      "Free Cancellation",
      "Book @ ₹0 available",
      "Breakfast Included",
      "Cashback On First Booking",
    ],
  },
];

export default function WishlistTab() {
  const [mounted, setMounted] = useState(false);

  /* HEART LIKE STATE ADD KRO */
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  /* WISHLIST FUNCTION CHANGE KRO */
  const handleWishlist = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (!likedItems[id]) {
      message.success("Added To Wishlist ❤️");
    } else {
      message.success("Removed From Wishlist");
    }
  };

  const handleShare = () => {
    message.success("Share Opened 🔗");
  };

  return (
    <div className="mt-[-17px] p-2 sm:p-3 md:p-4">
      {/* HEADER */}
      <div className="mb-3 flex flex-col gap-2  bg-white px-4 py-2 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h2 className="m-0 text-[20px] font-bold text-[#222] sm:text-[24px] md:text-[26px]">
          Wishlist
        </h2>

        <p className="m-0 text-[12px] text-gray-500 sm:text-[13px]">
          {dummyWishlist.length} Properties
        </p>
      </div>

      {/* CARDS */}
      <div className="flex flex-col gap-3 ">
        {dummyWishlist.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden !rounded-[16px] !border !border-[#E2E8F0] shadow-[0_2px_6px_rgba(0,0,0,0.05)] !pr-4"
            styles={{
              body: {
                padding: 0,
              },
            }}
          >
            <div className="flex flex-col xl:flex-row">
              {/* IMAGE */}
              <div className="w-full p-2 xl:w-[37%]">
                <ImageGallery images={item.images} />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col md:flex-row flex-1 border-t border-[#ECECEC] xl:border-t-0 xl:border-l">

                {/* CENTER */}
                <div className="flex flex-1 flex-col justify-between px-3 py-2">

                  {/* TITLE */}
                  <div>
                    <h2 className="truncate text-[17px] font-bold text-black sm:text-[18px]">
                      {item.name}
                    </h2>

                    {/* DESCRIPTION KO UPAR LE AAYA */}
                    <p className="mt-[2px] text-[13px] leading-[17px] font-semibold text-[#3B3B3B] sm:text-[14px]">
                      <span className="font-semibold text-[#58AEE5]">
                        {item.location}
                      </span>{" "}
                      | {item.description}
                    </p>
                  </div>

                  {/* TAGS */}
                  <div className="mt-1 flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-[#D9D9D9] px-2 py-[2px] !text-[13px] font-semibold text-[#3B3B3B] sm:text-[12px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* FEATURES */}
                  <div className="mt-7 grid gap-[2px]">
                    {item.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1"
                      >
                        <CheckOutlined className="mt-[-15px] text-[17px] !text-green-500" />

                        <p className="!mt-[-6px] text-[11px] leading-[15px] text-gray-600 sm:text-[14px] font-semibold">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-between border-t border-[#ECECEC] px-2 py-2 md:w-[220px] md:border-t-0 md:border-l">

                  {/* ICONS + RATING */}
                  <div className="flex items-center justify-between gap-5 md:flex-col md:items-end">

                    {/* ICONS */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleWishlist(item.id)}
                        className={`flex h-[34px] w-[34px] items-center justify-center rounded-full border transition-all duration-300 ${likedItems[item.id]
                          ? "border-[#72C0F0] bg-[#72C0F0]"
                          : "border-[#D9EFFF] bg-[#EAF7FF]"
                          }`}
                      >
                        {likedItems[item.id] ? (
                          <HeartFilled className="text-[15px] text-white " />
                        ) : (
                          <HeartOutlined className="text-[15px] text-[#72C0F0]" />
                        )}
                      </button>

                      <button
                        onClick={handleShare}
                        className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#EAF7FF] transition-all duration-300 hover:bg-[#72C0F0]"
                      >
                        <ShareAltOutlined className="text-[15px] text-[#72C0F0] hover:text-white" />
                      </button>
                    </div>

                    {/* RATING */}
                    <div className="w-[145px] rounded-[8px] border border-[#72C0F0] bg-[#F8FDFF] px-2 py-1  ">
                      <div className="flex items-center justify-between">
                        <p className="!m-0 text-[11px] font-semibold text-[#72C0F0]">
                          Very Good
                        </p>

                        <div className="flex h-[20px] min-w-[28px] items-center justify-center rounded bg-[#72C0F0] px-1 text-[10px] font-bold text-white">
                          {item.rating}
                        </div>
                      </div>

                      <p className="mt-[2px] text-center text-[10px] !text-[#444]">
                        ({item.reviews} Ratings)
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className=" flex flex-col items-end  ">
                    <p className="!text-[13px] text-[#A0A0A0] line-through sm:text-[11px] ">
                      ₹ {item.oldPrice}
                    </p>

                    <h1 className="text-[24px] font-bold leading-none text-[#333] sm:text-[28px] !mt-[-13px] ">
                      ₹ {item.price}
                    </h1>

                    <p className=" text-[13px] !text-[#666] !mt-[-13px]">
                      + ₹97 taxes & fees
                    </p>

                    <p className="!text-[13px]  !text-[#888] !mt-[-13px]">
                      Per Night
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
