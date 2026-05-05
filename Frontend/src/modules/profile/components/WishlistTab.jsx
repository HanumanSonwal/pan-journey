"use client";

import { HeartFilled, ShareAltOutlined } from "@ant-design/icons";
import { Card, Divider } from "antd";
import ImageGallery from "./ImageGallery";

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
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "hhttps://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
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
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "hhttps://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    ],
    tags: ["Couple Friendly", "24 Hr. Room Service", "Free WiFi"],
    features: [
      "Free Cancellation",
      "Book @ ₹0 available",
      "Breakfast available at extra charges",
      "Cashback On First Booking",
    ],
  },
];

export default function WishlistTab() {
  return (
    <div className="rounded-xl text-gray-900 bg-white shadow-md p-6">
      <h2 className="text-[22px] font-semibold text-gray-900">Wishlist</h2>
      <Divider className="!my-4 !border-gray-300" />

      <div className="space-y-6">
        {dummyWishlist.map((item) => (
          <Card
            key={item.id}
            className="rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
            styles={{ body: { padding: 0 } }}
          >
            <div className="flex flex-col md:flex-row">
              {/* 🔵 LEFT (IMAGE) */}
              <div className="w-full md:w-[280px] shrink-0">
                <ImageGallery images={item.images} />
              </div>

              {/* 🟢 CENTER (CONTENT) */}
              <div className="flex-1 min-w-0 p-5 space-y-3">
                <div>
                  <h3 className="text-[18px] font-bold truncate">
                    {item.name}
                  </h3>

                  <p className="text-[14px] text-gray-600 mt-1 truncate">
                    <span className="text-blue-500">{item.location}</span> |{" "}
                    {item.description}
                  </p>
                </div>

                {/* TAGS */}
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[13px] border bg-gray-50 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* FEATURES */}
                <ul className="text-[14px] text-gray-700 space-y-1">
                  {item.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-[2px]">✔</span>
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🟣 RIGHT (PRICE + RATING) */}
              <div className="w-full md:w-[220px] shrink-0 border-t md:border-t-0 md:border-l border-gray-200 p-5 flex flex-col items-end gap-4">
                {/* ACTIONS */}
                <div className="flex gap-3 text-gray-500">
                  <HeartFilled className="text-blue-400 cursor-pointer" />
                  <ShareAltOutlined />
                </div>

                {/* RATING */}
                <div className="w-[162px] border border-blue-100 bg-blue-50 rounded-md px-2 py-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-semibold text-[#72C0F0] m-0">
                      Very Good
                    </p>

                    <p className="min-w-[30px] h-[20px] flex items-center justify-center text-[12px] font-bold text-white bg-[#72C0F0] rounded px-1.5 m-0">
                      {item.rating}
                    </p>
                  </div>
                  <div className="w-full border-t border-gray-200"></div>

                  <div className="w-[146px] flex flex-col items-end gap-[2px]">
                    <p className="text-[12px] text-[#3B3B3B] bg-white px-2 py-[2px] rounded m-0">
                      ({item.reviews} Ratings)
                    </p>
                  </div>
                </div>

                {/* PRICE */}
                <div className="w-[146px] flex flex-col items-end gap-[2px]">
                  <p className="text-gray-400 line-through text-[13px] leading-none m-0">
                    ₹ {item.oldPrice}
                  </p>

                  <p className="text-[22px] font-bold leading-none m-0">
                    ₹ {item.price}
                  </p>

                  <p className="text-[12px] text-gray-500 leading-none m-0">
                    + ₹97 taxes & fees
                  </p>

                  <p className="text-[11px] text-gray-400 leading-none m-0">
                    Per Night
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
