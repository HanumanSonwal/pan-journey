"use client";

import { HeartFilled } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Empty, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToggleWishlist } from "../hooks/useToggleWishlist";
import { useWishlistCity } from "../hooks/useWishlistCity";
import { slugify } from "@/utils/slug/slugify";

export default function WishlistCityPage() {
  const { cityId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync } = useToggleWishlist();
  const { data, isLoading } = useWishlistCity(cityId);

  const { mutateAsync: removeHotel } = useToggleWishlist();
  const { mutateAsync: removeCity } = useToggleWishlist();

  const hotels = data?.data || [];
  useEffect(() => {
    if (!isLoading && hotels.length === 0) {
      router.replace("/wishlist");
    }
  }, [hotels.length, isLoading, router]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-60 rounded bg-gray-200" />
          <div className="h-40 rounded-2xl bg-gray-200" />
          <div className="h-40 rounded-2xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!hotels.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Empty
          description="No saved hotels found"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  const cityName = hotels?.[0]?.cityName || "Saved Hotels";
  const handleRemoveHotel = async (hotel) => {
    try {
      await mutateAsync({
        hotelId: hotel.hotelId,
        hotelName: hotel.hotelName,
        hotelImage: hotel.hotelImage,
        cityId: hotel.cityId,
        cityName: hotel.cityName,
        countryName: hotel.countryName,
      });

      message.success("Hotel removed from wishlist");
      queryClient.invalidateQueries({
        queryKey: ["wishlist-city", cityId],
      });
    } catch (error) {
      console.log(error);
      message.error("Failed to remove hotel");
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-cyan-600 to-sky-500 p-8 text-white">
        <h1 className="text-3xl font-bold md:text-4xl">{cityName}</h1>

        <p className="mt-2 text-white/90">
          {hotels.length} Saved Hotel{hotels.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Hotels */}
      <div className="space-y-5">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative md:w-[320px]">
                <img
                  src={hotel.hotelImage}
                  alt={hotel.hotelName}
                  className="h-[240px] w-full object-cover md:h-full"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {hotel.hotelName}
                    </h2>
                    <HeartFilled className="text-xl text-red-500" />
                  </div>
                  <p className="mt-2 text-gray-500">{hotel.cityName}</p>
                  <p className="mt-4 text-sm text-gray-400">
                    Added on {new Date(hotel.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    type="primary"
                    size="large"
                    className="!bg-cyan-600"
                    onClick={() => {
                      const citySlug = slugify(
                        hotel.cityName?.split(",")[0] || "hotel",
                      );

                      const hotelSlug = slugify(hotel.hotelName || "hotel");

                      router.push(
                        `/hotel-details/${citySlug}/${hotelSlug}?hid=${hotel.hotelId}`,
                      );
                    }}
                  >
                    View Hotel
                  </Button>

                  <Button
                    danger
                    size="large"
                    onClick={() => handleRemoveHotel(hotel)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
