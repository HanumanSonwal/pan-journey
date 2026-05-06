"use client";

import { CheckOutlined, HeartFilled, ShareAltOutlined } from "@ant-design/icons";
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
    <div className="rounded-2xl text-gray-900 bg-white border border-gray-200 shadow-[1px_4px_4px_4px_#00000014] p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-bold text-gray-900">Wishlist</h2>

        <p className="text-[13px] text-gray-500">
          {dummyWishlist.length} Properties
        </p>
      </div>

      <Divider className="!my-5 !border-gray-200" />

      {/* LIST */}
     <div className="flex flex-col gap-5">
        {dummyWishlist.map((item) => (
          <Card
            key={item.id}
            className="!rounded-2xl overflow-hidden !border !border-gray-200 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[1px_6px_12px_4px_#0000001f] shadow-[1px_4px_4px_4px_#00000014]"
            styles={{
              body: {
                padding: 0,
              },
            }}
          >
            <div className="flex flex-col lg:flex-row gap-5">
              {/* IMAGE */}
              <div className="w-full lg:w-[320px] p-3">
                <ImageGallery images={item.images} />
              </div>

              {/* CENTER CONTENT */}
              <div className="flex-1 min-w-0 p-5 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-between">
                {/* TOP */}
                <div>
                  {/* TITLE */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-[21px] font-bold text-gray-900 truncate">
                        {item.name}
                      </h3>

                      <p className="text-[13px] text-gray-500 mt-1 truncate">
                        <span className="text-[#0077b6] font-medium">
                          {item.location}
                        </span>{" "}
                        • {item.description}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3 text-[18px] text-gray-400 shrink-0">
                      <button className="hover:text-red-500 transition-all">
                        <HeartFilled className="text-[#72C0F0]" />
                      </button>

                      <button className="hover:text-[#0077b6] transition-all">
                        <ShareAltOutlined />
                      </button>
                    </div>
                  </div>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium border border-gray-200 bg-gray-50 px-3 py-1 rounded-md text-gray-700"
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
              <div className="w-full lg:w-[240px] border-t lg:border-t-0 lg:border-l border-gray-100 p-5 flex flex-col justify-between">
                {/* RATING */}
                <div className="flex justify-end">
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

                    <div className="w-full flex justify-end">
                      <p className="text-[12px] text-[#3B3B3B] bg-white px-2 py-[2px] rounded m-0">
                        ({item.reviews} Ratings)
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRICE */}
                <div className="mt-6 flex flex-col items-end gap-[2px]">
                  <p className="text-gray-400 line-through text-[13px] leading-none m-0">
                    ₹ {item.oldPrice}
                  </p>

                  <p className="text-[30px] font-bold text-gray-900 leading-none m-0">
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
