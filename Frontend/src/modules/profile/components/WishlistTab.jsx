"use client";

import {
  CheckOutlined,
  HeartFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
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
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between bg-white px-6 py-4 text-gray-900">
        <h2 className="mb-0! text-[24px] font-bold text-gray-900">Wishlist</h2>

        <p className="mb-0! text-[13px] text-gray-500">
          {dummyWishlist.length} Properties
        </p>
      </div>

      {/* LIST */}
      <div className="my-5! flex flex-col gap-5">
        {dummyWishlist.map((item) => (
          <Card
            key={item.id}
            className="overflow-hidden !rounded-2xl !border !border-gray-200 shadow-[1px_4px_4px_4px_#00000014] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[1px_6px_12px_4px_#0000001f]"
            styles={{
              body: {
                padding: 0,
              },
            }}
          >
            <div className="flex flex-col gap-3 p-5 lg:flex-row">
              {/* IMAGE */}

              <div className="w-full lg:w-[25%]">
                <ImageGallery images={item.images} />
              </div>

              {/* CENTER CONTENT */}
              <div className="flex w-full min-w-0 flex-1 flex-col justify-between gap-5 border-t border-gray-200 p-5 lg:w-[50%] lg:border-t-0 lg:border-l">
                {/* TOP */}
                <div>
                  {/* TITLE */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-[21px] font-bold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 truncate text-[13px] text-gray-500">
                        <span className="font-medium text-[#0077b6]">
                          {item.location}
                        </span>{" "}
                        • {item.description}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex shrink-0 items-center gap-3 text-[18px] text-gray-400">
                      <button className="transition-all hover:text-red-500">
                        <HeartFilled className="text-[#72C0F0]" />
                      </button>

                      <button className="transition-all hover:text-[#0077b6]">
                        <ShareAltOutlined />
                      </button>
                    </div>
                  </div>

                  {/* TAGS */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* FEATURES */}
                  <div className="mt-5 space-y-2">
                    {item.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[13px]"
                      >
                        <CheckOutlined className="text-green-500" />

                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SECTION */}
              <div className="flex w-full flex-col justify-between border-t border-gray-200 p-5 lg:w-[25%] lg:border-t-0 lg:border-l">
                {/* RATING */}
                <div className="flex justify-end">
                  <div className="flex w-[162px] flex-col gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-2">
                    <div className="flex items-center justify-between">
                      <p className="m-0 text-[14px] font-semibold text-[#72C0F0]">
                        Very Good
                      </p>

                      <p className="m-0 flex h-[20px] min-w-[30px] items-center justify-center rounded bg-[#72C0F0] px-1.5 text-[12px] font-bold text-white">
                        {item.rating}
                      </p>
                    </div>

                    <div className="w-full border-t border-gray-200"></div>

                    <div className="flex w-full justify-end">
                      <p className="m-0 rounded bg-white px-2 py-[2px] text-[12px] text-[#3B3B3B]">
                        ({item.reviews} Ratings)
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-6 flex flex-col items-end gap-[2px]">
                  <p className="m-0 text-[13px] leading-none text-gray-400 line-through">
                    ₹ {item.oldPrice}
                  </p>

                  <p className="m-0 text-[30px] leading-none font-bold text-gray-900">
                    ₹ {item.price}
                  </p>

                  <p className="m-0 text-[12px] leading-none text-gray-500">
                    + ₹97 taxes & fees
                  </p>

                  <p className="m-0 text-[11px] leading-none text-gray-400">
                    Per Night
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
