"use client";

import { useToggleWishlist } from "@/modules/wishlist/hooks/useToggleWishlist";
import { useWishlistCity } from "@/modules/wishlist/hooks/useWishlistCity";
import { slugify } from "@/utils/slug/slugify";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, message, Tag } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import WishlistSkeleton from "./lodding/WishlistSkeleton";

export default function WishlistDetailTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [removingHotelId, setRemovingHotelId] = useState(null);

  const { mutateAsync } = useToggleWishlist();
  const cityId = searchParams.get("cityId");
  const { data, isLoading } = useWishlistCity(cityId);
  const hotels = data?.data || [];
  
  useEffect(() => {
    if (!isLoading && hotels.length === 0) {
      router.replace("/profile?tab=wishlist");
    }
  }, [hotels.length, isLoading, router]);
  const handleRemoveHotel = async (hotel) => {
    try {
      setRemovingHotelId(hotel.hotelId);
      await mutateAsync({
        hotelId: hotel.hotelId,
      });

      message.success("Hotel removed from wishlist");
    } catch (error) {
      console.log(error);
      message.error("Failed to remove hotel");
    } finally {
      setRemovingHotelId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-[-17px] p-2 sm:p-3 md:p-4">
        <div className="mb-2 bg-white px-4 py-2 shadow-sm">
          <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        <WishlistSkeleton />
      </div>
    );
  }

  if (!hotels.length) {
    return (
      <div className="rounded bg-white p-10 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="max-w-md p-8 text-center">
            <Empty
              description="No destinations saved yet"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />

            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Your Wishlist is Empty
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Save your favourite hotels and destinations to quickly access them
              later.
            </p>

            <button
              onClick={() => router.push("/")}
              className="rounded-lg bg-[#72C0F0] px-6 py-3 font-semibold text-white! transition hover:bg-[#58AEE5]"
            >
              Explore Hotels
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* HEADER */}

      <div className="font-roboto! flex items-center justify-between border-b border-gray-200 bg-white px-4! py-4! text-gray-900">
        <h2 className="font-roboto mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
          WishList Details
        </h2>
        <button
          onClick={() => router.push("/profile?tab=wishlist")}
          className="flex items-center gap-2 text-[15px] font-semibold text-[#72C0F0]!"
        >
          <ArrowLeftOutlined /> Back to Wishlist
        </button>
      </div>
      <div className="flex justify-between rounded bg-white p-3 shadow-sm">
        <h2 className="font-roboto! mb-0! text-[20px] leading-[100%] font-semibold tracking-[0] text-gray-900">
          {hotels?.[0]?.cityName}
        </h2>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-md border border-[#72C0F0] px-2 py-1 text-xs text-[#72C0F0]">
            {hotels.length} Saved Hotel
            {hotels.length > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* HOTELS */}
      <div className="space-y-2!">
        {hotels.map((hotel) => (
          <Card
            key={hotel.hotelId}
            className="overflow-hidden rounded-2xl"
            styles={{
              body: {
                padding: 20,
              },
            }}
          >
            <div className="flex flex-col gap-5 lg:flex-row">
              {/* IMAGE */}
              <div className="h-[160px] w-full overflow-hidden rounded lg:w-[200px]">
                <img
                  src={hotel.hotelImage}
                  alt={hotel.hotelName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 justify-between gap-5">
                {/* LEFT */}
                <div className="flex-1">
                  <h2 className="font-roboto text-[20px] font-bold text-gray-900">
                    {hotel.hotelName}
                  </h2>

                  <div className="font-roboto flex items-start gap-2 font-semibold text-gray-500">
                    <EnvironmentOutlined className="mt-1" />

                    <span>{hotel.address || hotel.cityName}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Tag color="blue">⭐ {hotel.starRating || 0} Star</Tag>

                    {hotel.freeCancellation && (
                      <Tag color="green">Free Cancellation</Tag>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="font-roboto flex items-center gap-2">
                      <CheckCircleOutlined className="text-green-500" />

                      <span className="text-sm text-gray-600">
                        Saved in your wishlist
                      </span>
                    </div>

                    <div className="font-roboto flex items-center gap-2">
                      <CheckCircleOutlined className="text-green-500" />

                      <span className="text-sm text-gray-600">
                        Quick access anytime
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex min-w-[180px] flex-col items-end justify-between">
                  <div className="text-right">
                    <p className="font-jost mb-0! text-[22px] font-bold text-gray-900">
                      ₹ {Math.round(hotel.savedPrice || 0)}
                    </p>

                    <p className="font-jost text-[12px] text-gray-900">
                      + ₹ {Math.round(hotel.savedTax || 0)} taxes
                    </p>
                  </div>
                  <div className="flex items-end gap-3">
                    <Button
                      className="rounded-lg! bg-[#72C0F0]! px-5! py-2! text-sm! font-semibold! text-white!"
                      onClick={() =>
                        router.push(
                          `/hotel-details/${slugify(
                            hotel.cityName.split(",")[0],
                          )}/${hotel.hotelSlug}?hid=${hotel.hotelId}`,
                        )
                      }
                    >
                      View Hotel
                    </Button>

                    <Button
                      danger
                      ghost
                      loading={removingHotelId === hotel.hotelId}
                      onClick={() => handleRemoveHotel(hotel)}
                    >
                      Remove
                    </Button>
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
